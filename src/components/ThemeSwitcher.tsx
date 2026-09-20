import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme, THEME_OPTIONS, ThemeId } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeSwitcherProps {
  variant?: 'compact' | 'dropdown' | 'bar';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ variant = 'dropdown' }) => {
  const { currentThemeId, currentTheme, setTheme } = useTheme();
  const { language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isAr = language === 'ar';

  if (variant === 'bar') {
    return (
      <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-full px-2 py-0.5 shadow-sm">
        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
          <Palette className="w-3 h-3 text-cyan-400" />
          <span className="hidden sm:inline">{isAr ? 'اللون:' : 'Color:'}</span>
        </span>
        <div className="flex items-center gap-1">
          {THEME_OPTIONS.map((t) => {
            const isActive = t.id === currentThemeId;
            return (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={isAr ? t.nameAr : t.nameEn}
                className={`relative w-4 h-4 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${
                  isActive 
                    ? 'ring-2 ring-white scale-110 shadow-sm' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                style={{
                  background: t.id === 'multi' 
                    ? 'conic-gradient(from 0deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ec4899, #8b5cf6)' 
                    : `linear-gradient(135deg, ${t.previewColors[0]}, ${t.previewColors[1] || t.previewColors[0]})`
                }}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        id="theme-palette-switcher-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-850 hover:border-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm group"
        title={isAr ? 'تغيير ألوان المنصة' : 'Change Platform Colors'}
      >
        <div className="flex items-center -space-x-1 rtl:space-x-reverse">
          {currentTheme.previewColors.slice(0, 3).map((color, idx) => (
            <span
              key={idx}
              className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-950 inline-block"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <Palette className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform" />
        
        <span className="hidden sm:inline font-semibold">
          {isAr ? currentTheme.nameAr.split(' ')[0] : currentTheme.nameEn.split(' ')[0]}
        </span>

        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} w-72 sm:w-80 bg-slate-900/98 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50 text-slate-200`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/80 mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? 'ألوان وسمات الواجهة' : 'Theme Color Palette'}</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
                  {THEME_OPTIONS.length} {isAr ? 'سمات' : 'Themes'}
                </span>
              </div>

              {/* Theme Options List */}
              <div className="space-y-1.5">
                {THEME_OPTIONS.map((t) => {
                  const isActive = t.id === currentThemeId;

                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-right cursor-pointer group ${
                        isActive
                          ? 'bg-slate-800/90 border border-slate-700 shadow-sm'
                          : 'hover:bg-slate-800/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Swatch Preview Circle */}
                        <div 
                          className={`w-7 h-7 rounded-full flex items-center justify-center p-0.5 shrink-0 shadow-sm border ${
                            isActive ? 'border-white ring-2 ring-slate-700' : 'border-slate-700/60'
                          }`}
                          style={{
                            background: t.id === 'multi'
                              ? 'conic-gradient(from 0deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #ec4899, #8b5cf6)'
                              : `linear-gradient(135deg, ${t.previewColors[0]}, ${t.previewColors[1] || t.previewColors[0]})`
                          }}
                        >
                          {isActive && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
                        </div>

                        {/* Theme Name & Description */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                              {isAr ? t.nameAr : t.nameEn}
                            </span>
                            {t.id === 'multi' && (
                              <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-bold">
                                {isAr ? 'شامل' : 'Full'}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {isAr ? t.descAr : t.descEn}
                          </p>
                        </div>
                      </div>

                      {/* Color Preview Dots */}
                      <div className="flex items-center gap-0.5 shrink-0 pr-1">
                        {t.previewColors.map((c, idx) => (
                          <span
                            key={idx}
                            className="w-2 h-2 rounded-full border border-slate-900 inline-block"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Footer Tip */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{isAr ? 'يتم حفظ اللون المختار تلقائياً' : 'Selection auto-saved'}</span>
                </span>
                <span className="text-slate-500 font-mono">2026 Edition</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
