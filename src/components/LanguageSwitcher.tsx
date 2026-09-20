import React from 'react';
import { motion } from 'motion/react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer' | 'pill';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { language, setLanguage, toggleLanguage, isRTL } = useLanguage();

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs ${className}`}>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            language === 'ar'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-emerald-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          English
        </button>
      </div>
    );
  }

  return (
    <motion.button
      id="language-switcher-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer shadow-sm ${
        language === 'en'
          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
          : 'bg-slate-900 border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white'
      } ${className}`}
      title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
      aria-label="تبديل لغة الموقع | Switch Language"
    >
      <Globe className="w-3.5 h-3.5 text-emerald-400" />
      <span className="font-sans">
        {language === 'ar' ? 'EN' : 'عربي'}
      </span>
      <span className="text-[10px] text-slate-400 hidden sm:inline">
        {language === 'ar' ? '(English)' : '(العربية)'}
      </span>
    </motion.button>
  );
};
