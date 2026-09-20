import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'multi' | 'emerald' | 'sapphire' | 'violet' | 'amber' | 'ruby';

export interface ThemeOption {
  id: ThemeId;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  previewColors: string[]; // 3-4 hex/color strings for preview dots
  primaryColor: string;
  accentColor: string;
  gradientClass: string;
  textGradientClass: string;
  badgeClass: string;
  glowClass: string;
  borderClass: string;
  activeRingClass: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'multi',
    nameAr: 'طيف الألوان الشامل (متعدد)',
    nameEn: 'Vibrant Multi-Spectrum',
    descAr: 'مزيج حيوي ومتعدد الألوان يتنقل بين البنفسجي، السيان، الزمرد، والذهبي',
    descEn: 'Dynamic vibrant spectrum blending violet, electric cyan, emerald, and solar gold',
    previewColors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
    primaryColor: '#8b5cf6',
    accentColor: '#06b6d4',
    gradientClass: 'from-violet-500 via-cyan-400 to-amber-400',
    textGradientClass: 'text-multi-gradient',
    badgeClass: 'bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-amber-500/20 text-cyan-300 border-cyan-500/40',
    glowClass: 'glow-luxury-multi',
    borderClass: 'border-cyan-500/40',
    activeRingClass: 'ring-cyan-400',
  },
  {
    id: 'emerald',
    nameAr: 'الزمرد والأخضر الذهبي',
    nameEn: 'Emerald & Royal Gold',
    descAr: 'رمز الرخاء والثروة والتجارة والاستقرار المالي الكلاسيكي',
    descEn: 'Classic prosperity and financial growth in emerald green and regal gold',
    previewColors: ['#10b981', '#34d399', '#f59e0b', '#047857'],
    primaryColor: '#10b981',
    accentColor: '#f59e0b',
    gradientClass: 'from-emerald-400 via-teal-300 to-amber-300',
    textGradientClass: 'text-emerald-luxury',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    glowClass: 'glow-luxury-emerald',
    borderClass: 'border-emerald-500/40',
    activeRingClass: 'ring-emerald-400',
  },
  {
    id: 'sapphire',
    nameAr: 'الياقوت والسيان المحيطي',
    nameEn: 'Ocean Sapphire & Cyan',
    descAr: 'درجات الأزرق التقني والسيان الكهربائي عالي الوضوح والاحترافية',
    descEn: 'High-tech electric cyan and deep sapphire blue for modern fintech clarity',
    previewColors: ['#0ea5e9', '#06b6d4', '#3b82f6', '#38bdf8'],
    primaryColor: '#0ea5e9',
    accentColor: '#38bdf8',
    gradientClass: 'from-sky-400 via-cyan-300 to-blue-400',
    textGradientClass: 'text-sapphire-luxury',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    glowClass: 'glow-luxury-sapphire',
    borderClass: 'border-cyan-500/40',
    activeRingClass: 'ring-cyan-400',
  },
  {
    id: 'violet',
    nameAr: 'الأرجواني والنيون السيبراني',
    nameEn: 'Cyber Violet & Fuchsia',
    descAr: 'طابع الذكاء الاصطناعي المستقبلي والتقنيات الحديثة الفاخرة',
    descEn: 'Futuristic AI neon aesthetic featuring electric violet, purple, and magenta',
    previewColors: ['#8b5cf6', '#a855f7', '#ec4899', '#c084fc'],
    primaryColor: '#a855f7',
    accentColor: '#ec4899',
    gradientClass: 'from-violet-400 via-purple-300 to-pink-400',
    textGradientClass: 'text-violet-luxury',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    glowClass: 'glow-luxury-violet',
    borderClass: 'border-purple-500/40',
    activeRingClass: 'ring-purple-400',
  },
  {
    id: 'amber',
    nameAr: 'شروق الشمس والعنبر الناري',
    nameEn: 'Sunset Amber & Warm Tangerine',
    descAr: 'دفء الذهب الخالص وطاقة الإنجاز والنشاط المتقد',
    descEn: 'Energetic warmth of pure gold, molten amber, and solar motivation',
    previewColors: ['#f59e0b', '#fbbf24', '#f97316', '#ea580c'],
    primaryColor: '#f59e0b',
    accentColor: '#f97316',
    gradientClass: 'from-amber-400 via-yellow-300 to-orange-400',
    textGradientClass: 'text-amber-luxury',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    glowClass: 'glow-luxury-amber',
    borderClass: 'border-amber-500/40',
    activeRingClass: 'ring-amber-400',
  },
  {
    id: 'ruby',
    nameAr: 'الياقوتي القرمزي والوردي',
    nameEn: 'Ruby Crimson & Rose Gold',
    descAr: 'فخامة حصرية جريئة تفيض بالحيوية والتميز الرقمي',
    descEn: 'Bold, exclusive luxury radiating passion, ruby crimson, and warm rose',
    previewColors: ['#f43f5e', '#fb7185', '#e11d48', '#fda4af'],
    primaryColor: '#f43f5e',
    accentColor: '#fb7185',
    gradientClass: 'from-rose-400 via-pink-300 to-red-400',
    textGradientClass: 'text-ruby-luxury',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    glowClass: 'glow-luxury-ruby',
    borderClass: 'border-rose-500/40',
    activeRingClass: 'ring-rose-400',
  }
];

interface ThemeContextType {
  currentThemeId: ThemeId;
  currentTheme: ThemeOption;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
  isAutoChanging: boolean;
  setIsAutoChanging: (active: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem('site_preferred_theme');
      if (saved && THEME_OPTIONS.some(t => t.id === saved)) {
        return saved as ThemeId;
      }
      return 'multi'; // Default to vibrant multi-spectrum!
    } catch {
      return 'multi';
    }
  });

  // Automatically cycle through themes on a smooth timer
  const [isAutoChanging, setIsAutoChanging] = useState<boolean>(true);

  const currentTheme = THEME_OPTIONS.find(t => t.id === currentThemeId) || THEME_OPTIONS[0];

  const setTheme = (id: ThemeId) => {
    setCurrentThemeId(id);
    try {
      localStorage.setItem('site_preferred_theme', id);
    } catch {
      // ignore
    }
  };

  const cycleTheme = () => {
    const currentIndex = THEME_OPTIONS.findIndex(t => t.id === currentThemeId);
    const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
    setTheme(THEME_OPTIONS[nextIndex].id);
  };

  // Automatic Smooth Theme Change Cycle (transitions automatically every 6 seconds)
  useEffect(() => {
    if (!isAutoChanging) return;

    const interval = setInterval(() => {
      setCurrentThemeId((prevId) => {
        const currentIndex = THEME_OPTIONS.findIndex((t) => t.id === prevId);
        const nextIndex = (currentIndex + 1) % THEME_OPTIONS.length;
        return THEME_OPTIONS[nextIndex].id;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoChanging]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      // Remove previous theme classes
      THEME_OPTIONS.forEach(t => {
        root.classList.remove(`theme-${t.id}`);
      });
      // Add current theme class
      root.classList.add(`theme-${currentThemeId}`);
      root.setAttribute('data-theme', currentThemeId);
    }
  }, [currentThemeId]);

  return (
    <ThemeContext.Provider value={{ currentThemeId, currentTheme, setTheme, cycleTheme, isAutoChanging, setIsAutoChanging }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
