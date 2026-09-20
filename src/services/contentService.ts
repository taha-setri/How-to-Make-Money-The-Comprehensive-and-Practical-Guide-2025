import { 
  CmsContentStore, 
  LiveGigItem, 
  IncomeStream, 
  SiteConfig, 
  CmsDataSource, 
  MatrixAdItem,
  MasterBlueprintPhase,
  GoldenRuleTip
} from '../types';
import { DEFAULT_CMS_CONTENT } from '../data/defaultContent';
import { DEFAULT_MATRIX_ADS } from '../data/matrixData';

const STORAGE_KEY = 'cms_content_store_v2';
const SUPABASE_CONFIG_KEY = 'cms_supabase_config';
export const BROADCAST_CHANNEL_NAME = 'matrix_wall_sync_channel_v1';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  enabled: boolean;
}

export interface ContentFetchResult {
  data: CmsContentStore;
  source: CmsDataSource;
  error?: string;
}

/**
 * Broadcasts store changes to all open tabs and windows in real time
 */
export const broadcastStoreUpdate = (store: CmsContentStore): void => {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      channel.postMessage({ type: 'CMS_UPDATE', data: store, timestamp: Date.now() });
      channel.close();
    } catch {
      // BroadcastChannel fallback silently handled
    }
  }
};

/**
 * Retrieves the current Supabase integration settings from environment or local storage
 */
export const getSupabaseConfig = (): SupabaseConfig => {
  try {
    const saved = localStorage.getItem(SUPABASE_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore storage parse error
  }

  // Check Vite environment variables (if configured)
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  return {
    url: envUrl,
    anonKey: envKey,
    enabled: Boolean(envUrl && envKey),
  };
};

/**
 * Saves Supabase credentials locally for admin live syncing
 */
export const saveSupabaseConfig = (config: SupabaseConfig): void => {
  try {
    localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Supabase config to localStorage', e);
  }
};

/**
 * Loads content from local cache immediately (0ms initial render)
 */
export const getCachedContent = (): CmsContentStore => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate minimal structure
      if (parsed && parsed.incomeStreams && parsed.liveGigs) {
        if (!parsed.matrixAds || !Array.isArray(parsed.matrixAds)) {
          parsed.matrixAds = DEFAULT_MATRIX_ADS;
        }
        if (!parsed.masterBlueprint || !Array.isArray(parsed.masterBlueprint)) {
          parsed.masterBlueprint = DEFAULT_CMS_CONTENT.masterBlueprint;
        }
        if (!parsed.goldenRules || !Array.isArray(parsed.goldenRules)) {
          parsed.goldenRules = DEFAULT_CMS_CONTENT.goldenRules;
        }
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading cached CMS content:', e);
  }
  return DEFAULT_CMS_CONTENT;
};

/**
 * Saves content to localStorage and broadcasts to all other windows/tabs
 */
export const saveContentLocally = (content: CmsContentStore): void => {
  try {
    content.lastUpdated = new Date().toISOString();
    if (!content.matrixAds) {
      content.matrixAds = DEFAULT_MATRIX_ADS;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    broadcastStoreUpdate(content);
  } catch (e) {
    console.error('Failed to cache CMS content:', e);
  }
};

/**
 * Stale-While-Revalidate fetch pattern:
 * 1. Checks Supabase if enabled
 * 2. Or fetches /data/cms-content.json from public directory
 * 3. Falls back smoothly to cached or bundled data
 */
export const fetchRemoteContent = async (): Promise<ContentFetchResult> => {
  const supabase = getSupabaseConfig();

  // 1. Try Supabase if enabled and configured
  if (supabase.enabled && supabase.url && supabase.anonKey) {
    try {
      const cleanUrl = supabase.url.replace(/\/$/, '');
      const response = await fetch(`${cleanUrl}/rest/v1/cms_store?select=*&limit=1`, {
        method: 'GET',
        headers: {
          'apikey': supabase.anonKey,
          'Authorization': `Bearer ${supabase.anonKey}`,
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const rows = await response.json();
        if (rows && rows.length > 0 && rows[0].content) {
          const remoteData: CmsContentStore = rows[0].content;
          saveContentLocally(remoteData);
          return { data: remoteData, source: 'supabase' };
        }
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to static JSON:', err);
    }
  }

  // 2. Try fetching static decoupled JSON from /data/cms-content.json
  try {
    const res = await fetch('/data/cms-content.json', {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });

    if (res.ok) {
      const json: CmsContentStore = await res.json();
      if (json && json.incomeStreams && json.liveGigs) {
        // Compare with local storage; if local storage is newer (admin edits), preserve local edits
        const cached = getCachedContent();
        const cachedDate = new Date(cached.lastUpdated || 0).getTime();
        const remoteDate = new Date(json.lastUpdated || 0).getTime();

        if (cachedDate > remoteDate) {
          return { data: cached, source: 'local_storage' };
        }

        saveContentLocally(json);
        return { data: json, source: 'remote_json' };
      }
    }
  } catch (err) {
    console.warn('Static JSON fetch failed, using cached/bundled fallback:', err);
  }

  // 3. Fallback to cached or bundled
  const cached = getCachedContent();
  return { 
    data: cached, 
    source: localStorage.getItem(STORAGE_KEY) ? 'local_storage' : 'bundled_fallback' 
  };
};

/**
 * Adds a new live gig (Admin action)
 */
export const addLiveGigToStore = async (
  currentStore: CmsContentStore,
  newGigData: Omit<LiveGigItem, 'id' | 'timeAgo'>
): Promise<{ updatedStore: CmsContentStore; success: boolean }> => {
  const newGig: LiveGigItem = {
    ...newGigData,
    id: `gig-${Date.now()}`,
    timeAgo: 'الآن (محدث)',
  };

  const updatedStore: CmsContentStore = {
    ...currentStore,
    liveGigs: [newGig, ...currentStore.liveGigs],
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);

  // Sync to Supabase if available
  const supabase = getSupabaseConfig();
  if (supabase.enabled && supabase.url && supabase.anonKey) {
    try {
      const cleanUrl = supabase.url.replace(/\/$/, '');
      await fetch(`${cleanUrl}/rest/v1/live_gigs`, {
        method: 'POST',
        headers: {
          'apikey': supabase.anonKey,
          'Authorization': `Bearer ${supabase.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(newGig),
      });
    } catch (e) {
      console.warn('Could not sync gig to Supabase directly:', e);
    }
  }

  return { updatedStore, success: true };
};

/**
 * Updates an income stream's properties (Admin action)
 */
export const updateIncomeStreamInStore = async (
  currentStore: CmsContentStore,
  streamId: string,
  updates: Partial<IncomeStream>
): Promise<{ updatedStore: CmsContentStore; success: boolean }> => {
  const updatedStreams = currentStore.incomeStreams.map(stream => {
    if (stream.id === streamId) {
      return { ...stream, ...updates };
    }
    return stream;
  });

  const updatedStore: CmsContentStore = {
    ...currentStore,
    incomeStreams: updatedStreams,
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);

  return { updatedStore, success: true };
};

/**
 * Updates site configuration & SEO metadata (Admin action)
 */
export const updateSiteConfigInStore = (
  currentStore: CmsContentStore,
  newConfig: Partial<SiteConfig>
): CmsContentStore => {
  const updatedStore: CmsContentStore = {
    ...currentStore,
    siteConfig: {
      ...currentStore.siteConfig,
      ...newConfig,
    },
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);
  return updatedStore;
};

/**
 * Updates a master blueprint phase (CMS / Founder action)
 */
export const updateMasterBlueprintPhaseInStore = (
  currentStore: CmsContentStore,
  phaseId: string,
  updates: Partial<MasterBlueprintPhase>
): { updatedStore: CmsContentStore; success: boolean } => {
  const updatedPhases = (currentStore.masterBlueprint || DEFAULT_CMS_CONTENT.masterBlueprint).map(p => {
    if (p.id === phaseId) {
      return { ...p, ...updates };
    }
    return p;
  });

  const updatedStore: CmsContentStore = {
    ...currentStore,
    masterBlueprint: updatedPhases,
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);
  return { updatedStore, success: true };
};

/**
 * Updates or adds a golden rule tip (CMS / Founder action)
 */
export const updateGoldenRuleInStore = (
  currentStore: CmsContentStore,
  ruleId: string,
  updates: Partial<GoldenRuleTip>
): { updatedStore: CmsContentStore; success: boolean } => {
  const currentRules = currentStore.goldenRules || DEFAULT_CMS_CONTENT.goldenRules;
  const exists = currentRules.some(r => r.id === ruleId);
  const updatedRules = exists
    ? currentRules.map(r => (r.id === ruleId ? { ...r, ...updates } : r))
    : [...currentRules, { id: ruleId, ...updates } as GoldenRuleTip];

  const updatedStore: CmsContentStore = {
    ...currentStore,
    goldenRules: updatedRules,
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);
  return { updatedStore, success: true };
};

/**
 * Exports current store as a pretty-printed JSON string
 */
export const exportStoreAsJson = (store: CmsContentStore): string => {
  return JSON.stringify(store, null, 2);
};

/**
 * Imports and validates an external JSON string
 */
export const importStoreFromJson = (jsonString: string): { store: CmsContentStore | null; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.incomeStreams || !Array.isArray(parsed.incomeStreams)) {
      return { store: null, error: 'الملف لا يحتوي على قائمة مسارات الدخل (incomeStreams)' };
    }
    if (!parsed.liveGigs || !Array.isArray(parsed.liveGigs)) {
      return { store: null, error: 'الملف لا يحتوي على قائمة الطلبات الحية (liveGigs)' };
    }

    const fullStore: CmsContentStore = {
      ...DEFAULT_CMS_CONTENT,
      ...parsed,
      lastUpdated: new Date().toISOString(),
    };

    saveContentLocally(fullStore);
    return { store: fullStore };
  } catch (err: any) {
    return { store: null, error: err?.message || 'صيغة JSON غير صالحة' };
  }
};

/**
 * Adds or replaces a high-CPC matrix ad (Founder action)
 */
export const addMatrixAdToStore = (
  currentStore: CmsContentStore,
  adData: Omit<MatrixAdItem, 'id' | 'impressions' | 'clicks'>
): { updatedStore: CmsContentStore; success: boolean } => {
  const newAd: MatrixAdItem = {
    ...adData,
    id: `mad-${Date.now()}`,
    impressions: 1,
    clicks: 0,
  };

  const updatedStore: CmsContentStore = {
    ...currentStore,
    matrixAds: [newAd, ...(currentStore.matrixAds || [])],
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);
  return { updatedStore, success: true };
};

/**
 * Updates a matrix ad's properties (Founder action)
 */
export const updateMatrixAdInStore = (
  currentStore: CmsContentStore,
  adId: string,
  updates: Partial<MatrixAdItem>
): { updatedStore: CmsContentStore; success: boolean } => {
  const updatedAds = (currentStore.matrixAds || []).map(ad => {
    if (ad.id === adId) {
      return { ...ad, ...updates };
    }
    return ad;
  });

  const updatedStore: CmsContentStore = {
    ...currentStore,
    matrixAds: updatedAds,
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);
  return { updatedStore, success: true };
};

/**
 * Toggles a matrix ad's active status (Founder action)
 */
export const toggleMatrixAdInStore = (
  currentStore: CmsContentStore,
  adId: string
): { updatedStore: CmsContentStore; success: boolean } => {
  const updatedAds = (currentStore.matrixAds || []).map(ad => {
    if (ad.id === adId) {
      return { ...ad, active: !ad.active };
    }
    return ad;
  });

  const updatedStore: CmsContentStore = {
    ...currentStore,
    matrixAds: updatedAds,
    lastUpdated: new Date().toISOString(),
  };

  saveContentLocally(updatedStore);
  return { updatedStore, success: true };
};

/**
 * Resets local store back to bundled defaults
 */
export const resetStoreToDefaults = (): CmsContentStore => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
  return DEFAULT_CMS_CONTENT;
};
