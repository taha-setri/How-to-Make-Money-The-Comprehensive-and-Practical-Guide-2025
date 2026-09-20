import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  forceLang?: 'ar' | 'en';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  forceLang,
}) => {
  const { language } = useLanguage();
  const currentLang = forceLang || language;
  const isAr = currentLang === 'ar';

  // Size configurations
  const dimensions = {
    sm: { icon: 'w-8 h-8', mainText: 'text-base', subText: 'text-[9px]' },
    md: { icon: 'w-10 h-10', mainText: 'text-lg sm:text-xl', subText: 'text-[11px]' },
    lg: { icon: 'w-14 h-14', mainText: 'text-2xl sm:text-3xl', subText: 'text-xs sm:text-sm' },
  }[size];

  // Shield Emblem Icon
  const emblem = (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 3 }}
      whileTap={{ scale: 0.96 }}
      className={`relative ${dimensions.icon} rounded-xl bg-gradient-to-br from-emerald-900 via-slate-950 to-emerald-950 p-1 border border-emerald-500/50 shadow-lg shadow-emerald-950/60 flex items-center justify-center shrink-0 overflow-hidden group cursor-pointer`}
      title={isAr ? 'شعار منصة مسار المال' : 'MoneyPath Platform Logo'}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-emerald-400/20 to-transparent pointer-events-none" />

      {/* SVG Shield & Rising Trajectory */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="logoGreen" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Outer Hex Shield Outline */}
        <polygon
          points="50,6 88,28 88,72 50,94 12,72 12,28"
          fill="#022c22"
          stroke="url(#logoGold)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Growth Arrow Curve */}
        <path
          d="M22,68 Q40,70 50,46 T78,28"
          fill="none"
          stroke="url(#logoGreen)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <polygon points="76,20 84,28 74,34" fill="#34d399" />

        {/* Center Golden Coin with stylized 'M' */}
        <circle cx="50" cy="54" r="16" fill="#064e3b" stroke="url(#logoGold)" strokeWidth="2.5" />
        <path
          d="M42,62 L42,46 L50,56 L58,46 L58,62"
          fill="none"
          stroke="url(#logoGold)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Micro Sparkle */}
        <polygon points="76,46 78,42 82,44 79,48" fill="#fef08a" />
      </svg>

      {/* Shimmer light bar across icon */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    </motion.div>
  );

  if (variant === 'icon') {
    return <div className={`inline-block ${className}`}>{emblem}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-md ${className}`}>
        {emblem}
        <div className="text-right">
          <span className="text-xs font-black text-white">
            {isAr ? 'مسار المال' : 'MoneyPath'}
          </span>
          <span className="text-[9px] text-emerald-400 font-bold block">
            {isAr ? 'الدليل الموثوق' : 'Verified Guide'}
          </span>
        </div>
      </div>
    );
  }

  // Full / Compact Variant with prominent written Platform Name
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {emblem}

      <div className={isAr ? 'text-right' : 'text-left'}>
        <div className={`font-black ${dimensions.mainText} leading-none flex items-center gap-1.5`}>
          {isAr ? (
            <>
              <span className="text-white">مسار</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent drop-shadow-sm font-black">
                المال
              </span>
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                (كيف تجني المال)
              </span>
            </>
          ) : (
            <>
              <span className="text-white">Money</span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent drop-shadow-sm font-black">
                Path
              </span>
              <span className="text-xs font-normal text-slate-400 hidden sm:inline">
                .org
              </span>
            </>
          )}
        </div>

        {variant === 'full' && (
          <div className={`${dimensions.subText} text-slate-400 font-semibold mt-1 flex items-center gap-1.5`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isAr
                ? 'الدليل العملي الموثوق للدخل الرقمي'
                : 'The Practical Blueprint to Online Income'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
