import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  ShieldAlert, 
  Lightbulb, 
  Zap, 
  Check, 
  ArrowLeft,
  Clock,
  DollarSign,
  Tag
} from 'lucide-react';
import { IncomeStream } from '../types';

interface IncomeStreamsGridProps {
  streams: IncomeStream[];
  onSelectStreamForPlan: (stream: IncomeStream) => void;
}

const getCategoryColors = (category: string) => {
  switch (category) {
    case 'micro-services':
      return {
        badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
        cardBorderExpanded: 'border-cyan-500 ring-1 ring-cyan-500/40 glow-luxury-sapphire',
        cardHoverBorder: 'hover:border-cyan-500/50',
        sheenGrad: 'from-transparent via-cyan-400/10 to-transparent',
        potentialColor: 'text-cyan-400',
        checkBg: 'bg-cyan-950 text-cyan-400 border-cyan-800/50',
        stepBadge: 'bg-cyan-950 text-cyan-300 border-cyan-700/50',
        actionBtn: 'bg-cyan-500/20 hover:bg-cyan-600 text-cyan-300 hover:text-slate-950 border-cyan-500/30',
        toggleHover: 'hover:text-cyan-300',
        platformHover: 'hover:border-cyan-500/40 group-hover:text-cyan-300',
      };
    case 'digital-skills':
      return {
        badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
        cardBorderExpanded: 'border-purple-500 ring-1 ring-purple-500/40 glow-luxury-violet',
        cardHoverBorder: 'hover:border-purple-500/50',
        sheenGrad: 'from-transparent via-purple-400/10 to-transparent',
        potentialColor: 'text-purple-400',
        checkBg: 'bg-purple-950 text-purple-400 border-purple-800/50',
        stepBadge: 'bg-purple-950 text-purple-300 border-purple-700/50',
        actionBtn: 'bg-purple-500/20 hover:bg-purple-600 text-purple-300 hover:text-slate-950 border-purple-500/30',
        toggleHover: 'hover:text-purple-300',
        platformHover: 'hover:border-purple-500/40 group-hover:text-purple-300',
      };
    case 'content-monetization':
      return {
        badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
        cardBorderExpanded: 'border-amber-500 ring-1 ring-amber-500/40 glow-luxury-amber',
        cardHoverBorder: 'hover:border-amber-500/50',
        sheenGrad: 'from-transparent via-amber-400/10 to-transparent',
        potentialColor: 'text-amber-400',
        checkBg: 'bg-amber-950 text-amber-400 border-amber-800/50',
        stepBadge: 'bg-amber-950 text-amber-300 border-amber-700/50',
        actionBtn: 'bg-amber-500/20 hover:bg-amber-600 text-amber-300 hover:text-slate-950 border-amber-500/30',
        toggleHover: 'hover:text-amber-300',
        platformHover: 'hover:border-amber-500/40 group-hover:text-amber-300',
      };
    case 'fast-execution':
    default:
      return {
        badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
        cardBorderExpanded: 'border-emerald-500 ring-1 ring-emerald-500/40 glow-luxury-emerald',
        cardHoverBorder: 'hover:border-emerald-500/50',
        sheenGrad: 'from-transparent via-emerald-400/10 to-transparent',
        potentialColor: 'text-emerald-400',
        checkBg: 'bg-emerald-950 text-emerald-400 border-emerald-800/50',
        stepBadge: 'bg-emerald-950 text-emerald-300 border-emerald-700/50',
        actionBtn: 'bg-emerald-500/20 hover:bg-emerald-600 text-emerald-300 hover:text-slate-950 border-emerald-500/30',
        toggleHover: 'hover:text-emerald-300',
        platformHover: 'hover:border-emerald-500/40 group-hover:text-emerald-300',
      };
  }
};

export const IncomeStreamsGrid: React.FC<IncomeStreamsGridProps> = ({
  streams,
  onSelectStreamForPlan,
}) => {
  const [expandedStreamId, setExpandedStreamId] = useState<string | null>(streams[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedStreamId(prev => prev === id ? null : id);
  };

  if (streams.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
        <div className="text-slate-300 text-base font-semibold mb-2">
          لم يتم العثور على مسارات تطابق بحثك الحالي
        </div>
        <p className="text-xs text-slate-500">
          يرجى تجربة كلمات بحث أخرى أو إعادة ضبط خيارات التصفية لتصفح كافة الفرص
        </p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const,
      } 
    },
  };

  return (
    <div id="income-streams" className="space-y-6 scroll-mt-24">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {streams.map((stream) => {
          const isExpanded = expandedStreamId === stream.id;
          const catColor = getCategoryColors(stream.category);

          return (
            <motion.div
              key={stream.id}
              id={`stream-card-${stream.id}`}
              layout
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl border flex flex-col justify-between overflow-hidden shadow-xl relative transition-all duration-300 ${
                isExpanded 
                  ? `bg-slate-900/95 ${catColor.cardBorderExpanded}` 
                  : `bg-slate-900/85 backdrop-blur-md border-slate-800 ${catColor.cardHoverBorder} hover:bg-slate-900`
              }`}
            >
              {/* Optional Subtle Sheen Sweep for top badged streams */}
              {Boolean(stream.badge) && (
                <div className={`absolute inset-0 w-1/3 bg-gradient-to-r ${catColor.sheenGrad} skew-x-12 pointer-events-none animate-luxury-sheen`} />
              )}

              {/* Card Header Top */}
              <div className="p-5 sm:p-6 pb-4 relative z-10">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${catColor.badgeBg}`}>
                    {stream.categoryLabel}
                  </span>

                  {stream.badge && (
                    <motion.span 
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border shadow-sm ${catColor.badgeBg}`}
                    >
                      <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
                      <span>{stream.badge}</span>
                    </motion.span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-white leading-snug mb-2">
                  {stream.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {stream.description}
                </p>

                {/* Key Metrics Quick Ribbon with Repeating Subtle Pulse */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">العائد المتوقع:</span>
                    <motion.strong 
                      animate={{ opacity: [0.9, 1, 0.9] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className={`${catColor.potentialColor} font-black text-sm block font-mono`}
                    >
                      {stream.incomePotential}
                    </motion.strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">رأس المال المطلوب:</span>
                    <strong className="text-slate-200 font-bold block">
                      {stream.initialCapital}
                    </strong>
                  </div>
                </div>

                {/* Bullet Highlights */}
                <div className="space-y-2 mb-4">
                  {stream.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${catColor.checkBg}`}>
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Section Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-800 bg-slate-950/60 space-y-4 overflow-hidden"
                  >
                    {/* Step by Step Action Plan */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${catColor.potentialColor}`} />
                        <span>كيف تبدأ في هذا المسار اليوم (3 خطوات عملية):</span>
                      </div>
                      <ol className="space-y-2 text-xs text-slate-300 pr-2">
                        {stream.actionSteps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className={`w-4 h-4 rounded-full font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border ${catColor.stepBadge}`}>
                              {sIdx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Recommended Safe Platforms */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-white mb-2.5 flex items-center gap-1.5">
                        <ExternalLink className={`w-3.5 h-3.5 ${catColor.potentialColor}`} />
                        <span>المنصات الرسمية المعتمدة لاستلام هذا العمل:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {stream.recommendedPlatforms.map((plat, pIdx) => (
                          <a
                            key={pIdx}
                            href={plat.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 ${catColor.platformHover} rounded-lg text-right transition-all group`}
                          >
                            <div className="font-bold text-xs text-white group-hover:text-emerald-300 flex items-center justify-between">
                              <span>{plat.name}</span>
                              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400" />
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                              {plat.note}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Pro Tip & Anti-Scam warning */}
                    <div className="grid grid-cols-1 gap-2.5 text-xs">
                      <div className="bg-emerald-950/40 border border-emerald-800/50 p-3 rounded-xl flex items-start gap-2 text-emerald-300">
                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[11px] text-emerald-200">نصيحة تسريع النتائج:</strong>
                          <span>{stream.proTip}</span>
                        </div>
                      </div>

                      <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-xl flex items-start gap-2 text-amber-300">
                        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[11px] text-amber-200">تحذير نزاهة وأمان:</strong>
                          <span>{stream.warningNote}</span>
                        </div>
                      </div>
                    </div>

                    {/* SEO Tag */}
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                      <Tag className="w-3 h-3 text-slate-500" />
                      <span>فئة العمل المرتبطة: <strong className="text-slate-400">{stream.highCpcTopic}</strong></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Card Actions */}
              <div className="p-4 sm:p-5 pt-3 border-t border-slate-800 flex items-center justify-between gap-3 bg-slate-900">
                <button
                  onClick={() => toggleExpand(stream.id)}
                  className={`inline-flex items-center gap-1 text-xs font-bold text-slate-400 ${catColor.toggleHover} py-2 px-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer`}
                >
                  <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض خطوات البدء والمنصات'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelectStreamForPlan(stream)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold py-2 px-3.5 rounded-xl border transition-all shadow-xs cursor-pointer ${catColor.actionBtn}`}
                >
                  <span>اعتمد هذا المسار</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
