import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  CmsContentStore, 
  CmsDataSource, 
  LiveGigItem, 
  IncomeStream, 
  SiteConfig,
  MatrixAdItem,
  MasterBlueprintPhase,
  GoldenRuleTip
} from '../types';
import { 
  getCachedContent, 
  fetchRemoteContent, 
  addLiveGigToStore, 
  updateIncomeStreamInStore, 
  updateSiteConfigInStore, 
  addMatrixAdToStore,
  updateMatrixAdInStore,
  toggleMatrixAdInStore,
  updateMasterBlueprintPhaseInStore,
  updateGoldenRuleInStore,
  exportStoreAsJson, 
  importStoreFromJson, 
  resetStoreToDefaults,
  BROADCAST_CHANNEL_NAME
} from '../services/contentService';
import { updateDynamicSeo } from '../utils/seoHelper';

interface ContentContextType {
  content: CmsContentStore;
  dataSource: CmsDataSource;
  isSyncing: boolean;
  addLiveGig: (gig: Omit<LiveGigItem, 'id' | 'timeAgo'>) => Promise<boolean>;
  updateIncomeStream: (id: string, updates: Partial<IncomeStream>) => Promise<boolean>;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  updateMasterBlueprintPhase: (phaseId: string, updates: Partial<MasterBlueprintPhase>) => boolean;
  updateGoldenRule: (ruleId: string, updates: Partial<GoldenRuleTip>) => boolean;
  addMatrixAd: (ad: Omit<MatrixAdItem, 'id' | 'impressions' | 'clicks'>) => boolean;
  updateMatrixAd: (id: string, updates: Partial<MatrixAdItem>) => boolean;
  toggleMatrixAd: (id: string) => boolean;
  importJson: (jsonString: string) => { success: boolean; error?: string };
  exportJson: () => string;
  resetDefaults: () => void;
  refreshFromRemote: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize with cached content for instantaneous, zero-delay rendering
  const [content, setContent] = useState<CmsContentStore>(() => getCachedContent());
  const [dataSource, setDataSource] = useState<CmsDataSource>('local_storage');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // 2. Perform Stale-While-Revalidate background sync on mount
  const refreshFromRemote = useCallback(async () => {
    setIsSyncing(true);
    try {
      const result = await fetchRemoteContent();
      setContent(result.data);
      setDataSource(result.source);
    } catch (err) {
      console.warn('Background sync failed, using cached store:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    refreshFromRemote();
  }, [refreshFromRemote]);

  // 3. Cross-Tab & Multi-Window Real-Time Broadcast Synchronization
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channel.onmessage = (event) => {
          if (event.data?.type === 'CMS_UPDATE' && event.data?.data) {
            setContent(event.data.data);
          }
        };
      } catch {
        // fall back to storage event
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cms_content_store_v2' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && parsed.incomeStreams) {
            setContent(parsed);
          }
        } catch {
          // ignore parse errors
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      channel?.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // 4. Keep SEO tags and Structured Data synchronized
  useEffect(() => {
    if (content) {
      updateDynamicSeo(content.siteConfig, content.incomeStreams, content.faqData);
    }
  }, [content]);

  // 5. CMS Mutation Actions
  const addLiveGig = useCallback(async (gigData: Omit<LiveGigItem, 'id' | 'timeAgo'>) => {
    const { updatedStore, success } = await addLiveGigToStore(content, gigData);
    if (success) {
      setContent(updatedStore);
    }
    return success;
  }, [content]);

  const updateIncomeStream = useCallback(async (id: string, updates: Partial<IncomeStream>) => {
    const { updatedStore, success } = await updateIncomeStreamInStore(content, id, updates);
    if (success) {
      setContent(updatedStore);
    }
    return success;
  }, [content]);

  const updateSiteConfig = useCallback((config: Partial<SiteConfig>) => {
    const updated = updateSiteConfigInStore(content, config);
    setContent(updated);
  }, [content]);

  const updateMasterBlueprintPhase = useCallback((phaseId: string, updates: Partial<MasterBlueprintPhase>) => {
    const { updatedStore, success } = updateMasterBlueprintPhaseInStore(content, phaseId, updates);
    if (success) {
      setContent(updatedStore);
    }
    return success;
  }, [content]);

  const updateGoldenRule = useCallback((ruleId: string, updates: Partial<GoldenRuleTip>) => {
    const { updatedStore, success } = updateGoldenRuleInStore(content, ruleId, updates);
    if (success) {
      setContent(updatedStore);
    }
    return success;
  }, [content]);

  const addMatrixAd = useCallback((adData: Omit<MatrixAdItem, 'id' | 'impressions' | 'clicks'>) => {
    const { updatedStore, success } = addMatrixAdToStore(content, adData);
    if (success) {
      setContent(updatedStore);
    }
    return success;
  }, [content]);

  const updateMatrixAd = useCallback((id: string, updates: Partial<MatrixAdItem>) => {
    const { updatedStore, success } = updateMatrixAdInStore(content, id, updates);
    if (success) {
      setContent(updatedStore);
    }
    return success;
  }, [content]);

  const toggleMatrixAd = useCallback((id: string) => {
    const { updatedStore, success } = toggleMatrixAdInStore(content, id);
    if (success) {
      setContent(updatedStore);
    }
    return success;
  }, [content]);

  const importJson = useCallback((jsonString: string) => {
    const { store, error } = importStoreFromJson(jsonString);
    if (store) {
      setContent(store);
      return { success: true };
    }
    return { success: false, error };
  }, []);

  const exportJson = useCallback(() => {
    return exportStoreAsJson(content);
  }, [content]);

  const resetDefaults = useCallback(() => {
    const defaults = resetStoreToDefaults();
    setContent(defaults);
    setDataSource('bundled_fallback');
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        dataSource,
        isSyncing,
        addLiveGig,
        updateIncomeStream,
        updateSiteConfig,
        updateMasterBlueprintPhase,
        updateGoldenRule,
        addMatrixAd,
        updateMatrixAd,
        toggleMatrixAd,
        importJson,
        exportJson,
        resetDefaults,
        refreshFromRemote,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useCmsContent = (): ContentContextType => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useCmsContent must be used within a ContentProvider');
  }
  return ctx;
};
