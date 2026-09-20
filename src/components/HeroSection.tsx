import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Zap, 
  Search, 
  Star, 
  Users, 
  Compass, 
  AlertTriangle,
  Flame,
  Radio,
  Sparkles,
  TrendingUp,
  Coins,
  Award
} from 'lucide-react';
import { ABTestVariant } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  variant: ABTestVariant;
  onActionClick: () => void;
  onQuickSearchJump: (term: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  variant,
  onActionClick,
  onQuickSearchJump,
}) => {
  const { t, isRTL, language } = useLanguage();
  const { currentTheme, currentThemeId } = useTheme();
  const isEn = language === 'en';

  const headlineGradient = currentTheme?.textGradientClass || 'text-multi-gradient';

  const trustBullets = isEn ? [
    { text: '$0 Starting Cost for 80%+ of Streams', icon: CheckCircle2 },
    { text: '100% Legal & Ethical (No MLM or Roulette)', icon: CheckCircle2 },
    { text: 'Direct Payouts to Arab/Global Banks, Payoneer & PayPal', icon: CheckCircle2 },
  ] : [
    { text: '0$ تكلفة مبدئية لـ 80% من المسارات', icon: CheckCircle2 },
    { text: 'شرعية وقانونية 100% (بدون هرمي أو روليت)', icon: CheckCircle2 },
    { text: 'استلام الأرباح عبر البنوك العربية، بايونير، أو PayPal', icon: CheckCircle2 },
  ];

  const quickTags = isEn ? [
    { label: 'Instant AI Training', query: 'ai', color: 'hover:border-purple-400 hover:text-purple-300 hover:bg-purple-950/40 text-purple-200/90 border-purple-500/30 bg-purple-950/20' },
    { label: 'Audio Transcription $0', query: 'audio', color: 'hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 text-emerald-200/90 border-emerald-500/30 bg-emerald-950/20' },
    { label: 'Canva Design', query: 'canva', color: 'hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 text-cyan-200/90 border-cyan-500/30 bg-cyan-950/20' },
    { label: 'Copywriting', query: 'copywriting', color: 'hover:border-amber-400 hover:text-amber-300 hover:bg-amber-950/40 text-amber-200/90 border-amber-500/30 bg-amber-950/20' },
    { label: 'Affiliate Marketing', query: 'affiliate', color: 'hover:border-rose-400 hover:text-rose-300 hover:bg-rose-950/40 text-rose-200/90 border-rose-500/30 bg-rose-950/20' },
    { label: 'Faceless YouTube', query: 'youtube', color: 'hover:border-red-400 hover:text-red-300 hover:bg-red-950/40 text-red-200/90 border-red-500/30 bg-red-950/20' }
  ] : [
    { label: 'ذكاء اصطناعي فوري', query: 'ذكاء اصطناعي', color: 'hover:border-purple-400 hover:text-purple-300 hover:bg-purple-950/40 text-purple-200/90 border-purple-500/30 bg-purple-950/20' },
    { label: 'تفريغ صوتي 0$', query: 'تفريغ', color: 'hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 text-emerald-200/90 border-emerald-500/30 bg-emerald-950/20' },
    { label: 'تصاميم كانفا', query: 'كانفا', color: 'hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 text-cyan-200/90 border-cyan-500/30 bg-cyan-950/20' },
    { label: 'كتابة إعلانات', query: 'كتابة', color: 'hover:border-amber-400 hover:text-amber-300 hover:bg-amber-950/40 text-amber-200/90 border-amber-500/30 bg-amber-950/20' },
    { label: 'تسويق بالعمولة', query: 'عمولة', color: 'hover:border-rose-400 hover:text-rose-300 hover:bg-rose-950/40 text-rose-200/90 border-rose-500/30 bg-rose-950/20' },
    { label: 'يوتيوب بدون ظهور', query: 'يوتيوب', color: 'hover:border-red-400 hover:text-red-300 hover:bg-red-950/40 text-red-200/90 border-red-500/30 bg-red-950/20' }
  ];

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Dynamic Repeating Animated Background Elements with Luxury Ambience */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.15, 0.28, 0.15],
          rotate: [0, 45, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 12, 
          ease: "easeInOut" 
        }}
        className="absolute top-0 right-1/2 translate-x-1/2 -z-10 w-[650px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-emerald-500/25 via-teal-500/20 to-amber-400/15 blur-3xl rounded-full pointer-events-none" 
      />

      <motion.div 
        animate={{ 
          x: [0, 35, -25, 0],
          y: [0, -30, 20, 0],
          opacity: [0.1, 0.22, 0.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 16, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 left-10 -z-10 w-80 h-80 bg-gradient-to-br from-amber-500/15 to-emerald-500/20 blur-3xl rounded-full pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Left Floating FinTech Badge with Repeating Smooth Float */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-1, 1, -1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="hidden xl:flex absolute top-24 -left-12 z-20 items-center gap-3 bg-slate-900/90 border border-emerald-500/40 p-3 rounded-2xl shadow-2xl backdrop-blur-md glow-luxury-emerald max-w-[230px] text-right cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
            <TrendingUp className="w-5 h-5 text-slate-950 font-black" />
          </div>
          <div>
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isEn ? 'Verified Payout' : 'سحب مؤكد للتو'}</span>
            </div>
            <div className="text-sm font-black text-white">+$340.00 USD</div>
            <div className="text-[10px] text-slate-400">{isEn ? 'Canva & Social Media' : 'تصاميم كانفا وشبكات'}</div>
          </div>
        </motion.div>

        {/* Right Floating FinTech Badge with Repeating Smooth Float */}
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [1, -1, 1] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="hidden xl:flex absolute top-32 -right-12 z-20 items-center gap-3 bg-slate-900/90 border border-amber-500/40 p-3 rounded-2xl shadow-2xl backdrop-blur-md glow-luxury-gold max-w-[230px] text-right cursor-default"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
            <Sparkles className="w-5 h-5 text-slate-950 font-black" />
          </div>
          <div>
            <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>{isEn ? 'Active Earners' : 'أعضاء يطبقون الآن'}</span>
            </div>
            <div className="text-sm font-black text-white">18,940+ {isEn ? 'Live' : 'متصل'}</div>
            <div className="text-[10px] text-slate-400">{isEn ? '0$ Starting Capital' : 'برأس مال 0$ تماماً'}</div>
          </div>
        </motion.div>

        {/* Anti-Scam Verification Badge with Luxury Floating Jewel & Gold Sparkle */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-950/95 via-slate-900/90 to-emerald-950/95 border border-emerald-500/40 text-emerald-300 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold mb-6 shadow-2xl glow-luxury-emerald"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
          </motion.div>
          <span className="text-luxury-gradient">
            {isEn ? '100% Free • Verified Online Income Methods' : variant.trustFactor}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
        </motion.div>

        {/* The Magnetic Headline with Luxury Shimmering Typography & Floating Breath */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6"
        >
          <motion.h1 
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white leading-[1.3] tracking-tight"
          >
            {isEn ? (
              <>
                {t.heroHeadlineMain}{' '}
                <span className={`${headlineGradient} drop-shadow-[0_4px_24px_rgba(52,211,153,0.35)] inline-block mx-1`}>
                  {t.heroHeadlineHighlight}
                </span>{' '}
                {t.heroHeadlineEnd}
              </>
            ) : variant.headline.includes('كيف الحصول على المال') ? (
              <>
                {variant.headline.split('كيف الحصول على المال')[0]}
                <span className={`${headlineGradient} drop-shadow-[0_4px_24px_rgba(52,211,153,0.35)] inline-block mx-1`}>
                  كيف الحصول على المال
                </span>
                {variant.headline.split('كيف الحصول على المال')[1]}
              </>
            ) : (
              <span className={headlineGradient}>{variant.headline}</span>
            )}
          </motion.h1>
        </motion.div>

        {/* Subheadline addressing user pain points without scam tone */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8"
        >
          {isEn ? t.heroSubheadline : variant.subheadline}
        </motion.p>

        {/* Trust bullet points grid with Interactive Hover Lift and Gentle Stagger */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-bold text-slate-300 mb-10">
          {trustBullets.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04, y: -2 }}
              animate={{ y: [0, index % 2 === 0 ? -3 : 3, 0] }}
              transition={{ 
                y: { repeat: Infinity, duration: 4 + index, ease: "easeInOut" }
              }}
              className="flex items-center gap-1.5 bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800 shadow-md hover:border-emerald-500/40 hover:bg-slate-850 cursor-default transition-colors"
            >
              <item.icon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Primary Call to Action Box with Luxury Royal Glass & Sheen */}
        <div className="max-w-xl mx-auto bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 p-3.5 sm:p-4 rounded-2xl border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 glow-luxury-emerald flex flex-col sm:flex-row items-center gap-3 relative overflow-hidden">
          {/* Animated Gold & Emerald Luxury Sheen traversing the box */}
          <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent skew-x-12 pointer-events-none animate-luxury-sheen" />

          <motion.button
            id="hero-primary-cta-btn"
            onClick={onActionClick}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-base sm:text-lg py-3.5 px-6 rounded-xl shadow-xl shadow-emerald-500/30 transition-all overflow-hidden group cursor-pointer"
          >
            {/* Animated repeating spin on icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              <Compass className="w-5 h-5 text-slate-950" />
            </motion.div>
            <span className="tracking-wide">{isEn ? t.heroCtaExplore : variant.primaryCtaText}</span>
            <motion.div
              animate={{ x: isRTL ? [0, -5, 0] : [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </motion.div>
          </motion.button>
          
          <motion.a
            href="#live-gigs-feed"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-100 font-bold text-sm py-3.5 px-5 rounded-xl border border-slate-700 hover:border-emerald-400/60 transition-all shadow-md"
          >
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-bold">{isEn ? 'Live Gigs Today' : 'الطلبات الحية اليوم'}</span>
          </motion.a>
        </div>

        <div className="mt-3 text-xs text-slate-400 font-medium">
          {isEn ? 'Step-by-step guidance • Instant profit calculator • Direct verified links' : variant.primaryCtaSubtext}
        </div>

        {/* Quick Search Shortcut Tags with Interactive Hover Scale */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-2xl mx-auto">
          <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center justify-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEn ? 'Top beginner keywords:' : 'الكلمات الأكثر بحثاً للمبتدئين:'}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickTags.map((tag, idx) => (
              <motion.button
                key={tag.label}
                onClick={() => onQuickSearchJump(tag.query)}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, (idx % 2 === 0 ? -2 : 2), 0] }}
                transition={{ 
                  y: { repeat: Infinity, duration: 3 + (idx * 0.5), ease: "easeInOut" }
                }}
                className={`text-xs px-3.5 py-1.5 rounded-full border shadow-sm transition-all font-medium cursor-pointer ${tag.color}`}
              >
                #{tag.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Social Proof & Trust Strip with Floating Elements */}
        <motion.div 
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="mt-10 inline-flex flex-wrap items-center justify-center gap-4 bg-slate-900/80 border border-slate-800 px-5 py-2.5 rounded-xl text-xs text-slate-400 shadow-md"
        >
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="font-bold text-white mr-1">4.9/5</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>
              {isEn ? (
                <>Over <strong className="text-white">18,500</strong> people applied this blueprint this month</>
              ) : (
                <>أكثر من <strong className="text-white">18,500</strong> شخص طبقوا خطط هذا الدليل هذا الشهر</>
              )}
            </span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isEn ? 'Zero False Promises & Zero Pyramid Schemes' : 'خالٍ تماماً من الاحتيال ومنصات الرهان الوهمية'}</span>
          </div>
        </motion.div>

        {/* Ultra-Modern Global Live Transaction Ticker with Continuous Repeating Loop */}
        <div className="mt-10 max-w-4xl mx-auto rounded-2xl bg-slate-900/70 border border-emerald-500/20 p-2 overflow-hidden shadow-inner backdrop-blur-sm">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-1.5 shrink-0 px-2 text-[11px] font-black text-emerald-400 bg-emerald-500/10 py-1 rounded-lg border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{isEn ? 'LIVE FEED' : 'تحديثات حية'}</span>
            </div>

            <div className="overflow-hidden relative w-full whitespace-nowrap">
              <motion.div
                animate={{ x: isRTL ? ['0%', '50%'] : ['0%', '-50%'] }}
                transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                className="inline-flex items-center gap-8 text-[11px] text-slate-300 font-medium"
              >
                {[
                  { user: isEn ? 'Kareem M.' : 'كريم م.', country: '🇸🇦', action: isEn ? 'Withdrew $185 via PayPal' : 'سحب 185$ عبر PayPal', stream: isEn ? 'Transcription' : 'تفريغ صوتي' },
                  { user: isEn ? 'Amina S.' : 'أمينة س.', country: '🇪🇬', action: isEn ? 'Earned $320 via Upwork' : 'حققت 320$ عبر Upwork', stream: isEn ? 'Canva Design' : 'تصميم كانفا' },
                  { user: isEn ? 'Tariq B.' : 'طارق ب.', country: '🇦🇪', action: isEn ? 'Closed $450 direct contract' : 'أغلق عقد 450$ لعميل', stream: isEn ? 'Copywriting' : 'كتابة محتوى' },
                  { user: isEn ? 'Nour H.' : 'نور ح.', country: '🇲🇦', action: isEn ? 'Withdrew $95 via Payoneer' : 'سحبت 95$ عبر بايونير', stream: isEn ? 'AI Prompts' : 'هندسة أوامر' },
                  { user: isEn ? 'Fahad K.' : 'فهد ك.', country: '🇰🇼', action: isEn ? 'Received $240 bank transfer' : 'استلم 240$ تحويل بنكي', stream: isEn ? 'Affiliate Sales' : 'تسويق بالعمولة' },
                  { user: isEn ? 'Kareem M.' : 'كريم م.', country: '🇸🇦', action: isEn ? 'Withdrew $185 via PayPal' : 'سحب 185$ عبر PayPal', stream: isEn ? 'Transcription' : 'تفريغ صوتي' },
                  { user: isEn ? 'Amina S.' : 'أمينة س.', country: '🇪🇬', action: isEn ? 'Earned $320 via Upwork' : 'حققت 320$ عبر Upwork', stream: isEn ? 'Canva Design' : 'تصميم كانفا' },
                  { user: isEn ? 'Tariq B.' : 'طارق ب.', country: '🇦🇪', action: isEn ? 'Closed $450 direct contract' : 'أغلق عقد 450$ لعميل', stream: isEn ? 'Copywriting' : 'كتابة محتوى' },
                ].map((item, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 shrink-0">
                    <span className="text-sm">{item.country}</span>
                    <span className="font-bold text-white">{item.user}:</span>
                    <span className="text-emerald-300 font-semibold">{item.action}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
                      {item.stream}
                    </span>
                    <span className="text-slate-600">•</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
