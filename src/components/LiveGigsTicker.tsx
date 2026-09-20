import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Flame, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  Users, 
  ShieldCheck, 
  Filter,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { LIVE_GIGS_DATA } from '../data/liveGigsData';
import { LiveGigItem } from '../types';

interface LiveGigsTickerProps {
  onSelectGigProposal?: (proposal: string, gigTitle: string) => void;
  gigs?: LiveGigItem[];
}

export const LiveGigsTicker: React.FC<LiveGigsTickerProps> = ({ onSelectGigProposal, gigs }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedGigId, setCopiedGigId] = useState<string | null>(null);
  const [activeProposalModal, setActiveProposalModal] = useState<LiveGigItem | null>(null);
  const [pulseCounter, setPulseCounter] = useState<number>(14);

  // Use dynamic gigs if provided, fallback to bundled data
  const currentGigs = gigs && gigs.length > 0 ? gigs : LIVE_GIGS_DATA;

  // Periodic subtle pulse effect to simulate live streaming jobs
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCounter(prev => (prev >= 25 ? 12 : prev + 1));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyProposal = (gig: LiveGigItem) => {
    navigator.clipboard.writeText(gig.proposalPitchTemplate);
    setCopiedGigId(gig.id);
    setTimeout(() => {
      setCopiedGigId(null);
    }, 2500);

    if (onSelectGigProposal) {
      onSelectGigProposal(gig.proposalPitchTemplate, gig.title);
    }
  };

  const filteredGigs = selectedCategory === 'all' 
    ? currentGigs 
    : currentGigs.filter(g => g.category === selectedCategory);

  return (
    <section id="live-gigs-feed" className="my-16 scroll-mt-24 overflow-hidden">
      {/* 1. Continuous Repeating Live Marquee Ticker */}
      <div className="bg-slate-900 border-y border-emerald-500/40 py-3 overflow-hidden shadow-inner relative">
        <div className="flex items-center gap-3 px-4 mb-2 max-w-7xl mx-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>بث حي للطلبات العاجلة</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
              +{pulseCounter} وظيفة شاغرة الآن
            </span>
          </span>
        </div>

        {/* Continuous Looping Infinite Ticker Animation */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: 'linear',
            }}
            className="flex items-center gap-6 text-xs text-slate-300 font-medium shrink-0"
          >
            {[...currentGigs, ...currentGigs].map((gig, idx) => (
              <div 
                key={`${gig.id}-${idx}`}
                className="inline-flex items-center gap-2 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-bold">{gig.title}</span>
                <span className="text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded text-[11px]">
                  {gig.payout}
                </span>
                <span className="text-slate-400 text-[11px]">({gig.platform})</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <motion.div 
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>طلبات فورية ومشاريع شاغرة اليوم 2025</span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              شريط الفرص العاجلة والخدمات المصغرة الحية
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              مشاريع تتطلب التنفيذ السريع وتمنحك عائداً مباشراً. انسخ نموذج التقديم المقترح وقدم عرضك فوراً.
            </p>
          </div>

          {/* Filter Pills with Interactive States */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'كافة الفرص' },
              { id: 'micro-services', label: 'تفريغ وتدقيق' },
              { id: 'ai-training', label: 'ذكاء اصطناعي' },
              { id: 'design', label: 'تصميم كانفا' },
              { id: 'copywriting', label: 'كتابة محتوى' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Gigs Cards Grid with Interactive Motion and Hover Elevations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredGigs.map((gig) => {
              const isCopied = copiedGigId === gig.id;

              return (
                <motion.div
                  key={gig.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-colors group relative overflow-hidden"
                >
                  {/* Glowing Repeating Background Accent */}
                  <motion.div 
                    animate={{ opacity: [0.05, 0.12, 0.05] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-0 right-0 w-36 h-36 bg-emerald-500 rounded-full blur-2xl pointer-events-none" 
                  />

                  <div>
                    {/* Top Bar: Urgency badge & Time ago */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <motion.span 
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-md"
                      >
                        <Clock className="w-3 h-3 text-amber-400" />
                        {gig.urgentBadge}
                      </motion.span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {gig.timeAgo}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-2">
                      {gig.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {gig.description}
                    </p>

                    {/* Key Metrics Strip */}
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 mb-4 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">العائد المتوقع:</span>
                        <motion.span 
                          animate={{ color: ['#34d399', '#10b981', '#34d399'] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="font-black text-emerald-400 text-sm font-mono block"
                        >
                          {gig.payout}
                        </motion.span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] mb-0.5 font-medium">المنصة:</span>
                        <span className="font-bold text-slate-200 truncate block">{gig.platform}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {gig.tags.map((t, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                      <span className="bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800/50">
                        {gig.capitalRequired}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions with Interactive Feedback */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    {/* One-Click Copy Proposal Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleCopyProposal(gig)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60'
                      }`}
                      title="نسخ صيغة العرض المخصص لهذه الفرصة فوراً"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>تم نسخ العرض بنجاح!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>نسخ صيغة التقديم الجاهزة</span>
                        </>
                      )}
                    </motion.button>

                    {/* View Details / Modal Button */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setActiveProposalModal(gig)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                      title="معاينة نموذج العرض وتفاصيل المهمة"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick Pitch Preview Modal */}
        <AnimatePresence>
          {activeProposalModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto text-right text-white shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                      نموذج التقديم السريع (Ready Proposal Pitch)
                    </span>
                    <h4 className="text-lg font-black text-white mt-1">
                      {activeProposalModal.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveProposalModal(null)}
                    className="text-slate-400 hover:text-white p-1 text-lg font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <p className="text-slate-300 leading-relaxed">
                    هذا النموذج مصاغ بعناية ليحل مشكلة العميل ويبرز سرعتك واحترافيتك دون مقدمات مملة:
                  </p>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-slate-200 text-xs whitespace-pre-wrap leading-relaxed">
                    {activeProposalModal.proposalPitchTemplate}
                  </div>

                  <div className="bg-emerald-950/50 border border-emerald-800/60 p-3 rounded-xl text-emerald-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>نصيحة الفوز بالصفقة:</strong> أرسل هذا العرض خلال أول 15 دقيقة من طرح المشروع لزيادة احتمالية القراءة بنسبة 80%.
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      handleCopyProposal(activeProposalModal);
                      setActiveProposalModal(null);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ العرض وإغلاق</span>
                  </motion.button>
                  <button
                    onClick={() => setActiveProposalModal(null)}
                    className="text-slate-400 hover:text-white text-xs px-3 py-2 cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
