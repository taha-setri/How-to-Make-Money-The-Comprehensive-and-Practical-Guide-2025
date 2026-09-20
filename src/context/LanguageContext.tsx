import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, TRANSLATIONS } from '../translations/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('site_preferred_language');
      if (saved === 'ar' || saved === 'en') return saved;
      // Default to Arabic if browser is Arabic, otherwise Arabic as primary
      return 'ar';
    } catch {
      return 'ar';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('site_preferred_language', lang);
    } catch {
      // Storage error fallback
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  const t = TRANSLATIONS[language];

  useEffect(() => {
    // Synchronize HTML attributes with current language
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = dir;

      // Update page title and description appropriately
      if (language === 'en') {
        document.title = 'MoneyPath | The Practical & Verified Guide to Making Money Online 2025';
      } else {
        document.title = 'كيف الحصول على المال من الإنترنت | الدليل العملي الموثوق 2025';
      }
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
