import React, { useState } from 'react';
import { 
  Layout, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Eye, 
  Sparkles, 
  CheckCircle2,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { STRATEGIC_AD_SLOTS } from '../data/incomeStreams';

export const AdSenseArchitectGuide: React.FC = () => {
  const [activeSlotId, setActiveSlotId] = useState<string>('in-article-contextual');

  const selectedSlot = STRATEGIC_AD_SLOTS.find(s => s.id === activeSlotId) || STRATEGIC_AD_SLOTS[0];

  return (
    <section id="ad-monetization-guide" className="my-16 scroll-mt-24">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-950 to-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  تحسين العائد لكل ألف ظهور (RPM & High-CPC Engine)
                </div>
                <h2 className="text-xl sm:text-2xl font-black">
                  الهندسة الاستراتيجية لمواضع إعلانات AdSense لتعظيم الأرباح
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  كيف تم توزيع الوحدات الإعلانية بذكاء لرفع مدة الجلسة ونسبة النقر الشرعية بدون إزعاج تجربة المستخدم
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 border border-amber-500/40 px-3.5 py-1.5 rounded-xl text-xs text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>متوافق 100% مع سياسات Google AdSense 2025</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {/* Slot Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {STRATEGIC_AD_SLOTS.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setActiveSlotId(slot.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeSlotId === slot.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'bg-slate-800 hover:bg-slate-750 text-slate-300'
                }`}
              >
                {slot.placementName}
              </button>
            ))}
          </div>

          {/* Slot Deep Dive Analysis */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 sm:p-6 mb-8">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <span className="text-xs font-bold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-md mb-2 inline-block border border-amber-800/60">
                  تحليل العائد والموضع
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {selectedSlot.placementName}
                </h3>
              </div>

              <div className="text-right bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">تقدير سعر النقرة (CPC):</span>
                <strong className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                  {selectedSlot.cpcEstimate}
                </strong>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              {selectedSlot.notes}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">الأبعاد ومعدل الاستجابة:</span>
                <strong className="text-white font-bold block">{selectedSlot.dimensions}</strong>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">معدل النقر المستهدف (CTR):</span>
                <strong className="text-emerald-400 font-bold block">{selectedSlot.ctrTarget}</strong>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[11px] mb-1">المعلنون المستهدفون:</span>
                <strong className="text-amber-300 font-bold block">{selectedSlot.bestFitSponsor}</strong>
              </div>
            </div>
          </div>

          {/* Core Growth Hacker Secrets for High-CPC */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center mb-2.5 border border-emerald-800/60">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-white mb-1">
                1. استهداف النيش المالي والاستضافات
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                يصل سعر النقرة للشركات السحابية والبنوك الرقمية إلى 8$ - 12$، ولذلك يتم تأطير المقالات حول أدوات استلام الأرباح والعمل.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 flex items-center justify-center mb-2.5 border border-blue-800/60">
                <Eye className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-white mb-1">
                2. إطالة مدة بقاء الزائر (Session Duration)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                استخدام الحاسبة التفاعلية ومحدد المسار يرفع مدة الجلسة لأكثر من 3 دقائق، مما يضاعف تقييم الصفحة وجودتها لدى خوارزميات جوجل.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center mb-2.5 border border-amber-800/60">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-white mb-1">
                3. التوافق التام مع سياسات AdSense
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                فصل الإعلانات بوضوح تحت وسم (Sponsored / إعلان ممول) يمنع حظر الحساب ويحقق نقرات طوعية حقيقية ذات نية شراء عالية.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
