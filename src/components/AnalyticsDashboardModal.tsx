import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Clock, 
  TrendingUp, 
  Users, 
  Target, 
  Activity, 
  Eye, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  Compass,
  DollarSign
} from 'lucide-react';

interface AnalyticsDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionSeconds: number;
  scrollDepth: number;
  calculatorUsed: boolean;
  pathCompleted: boolean;
  tasksCompletedCount: number;
  adClicksCount: number;
}

export const AnalyticsDashboardModal: React.FC<AnalyticsDashboardModalProps> = ({
  isOpen,
  onClose,
  sessionSeconds,
  scrollDepth,
  calculatorUsed,
  pathCompleted,
  tasksCompletedCount,
  adClicksCount,
}) => {
  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins} دقيقة و ${s} ثانية`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                لوحة تحليلات النمو ومقاييس التفاعل (Growth & Retention Analytics)
              </h3>
              <p className="text-xs text-slate-500">
                متابعة تفاعل الزوار، مدة الجلسة، عمق التمرير، ومعدلات النقر على الإعلانات عالية الـ CPC
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time Current Session Telemetry */}
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>مقاييس جلستك الحالية (Live Session Telemetry):</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>مدة الجلسة:</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono">
                {formatTime(sessionSeconds)}
              </div>
              <div className="text-[10px] text-emerald-600 mt-0.5">
                {sessionSeconds > 120 ? 'تفاعل عالي (> 2 دقيقة)' : 'جلسة نشطة'}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1">
                <Eye className="w-3 h-3 text-emerald-600" />
                <span>عمق التمرير (Scroll Depth):</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono">
                {scrollDepth}%
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                تغطية محتوى الصفحة
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1">
                <Compass className="w-3 h-3 text-emerald-600" />
                <span>محدد المسار:</span>
              </div>
              <div className={`text-base font-black ${pathCompleted ? 'text-emerald-600' : 'text-slate-400'}`}>
                {pathCompleted ? 'مكتمل بنجاح' : 'قيد الاستكشاف'}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                تحديد التوافق الشخصي
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>مهام خطة 7 أيام:</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono">
                {tasksCompletedCount} / 7
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                جاهزية التنفيذ
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keyword & Traffic Intelligence */}
        <div className="mb-6 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-900">
              أداء الكلمة المفتاحية المستهدفة: "كيف الحصول على المال"
            </span>
            <span className="text-[10px] bg-emerald-200 text-emerald-800 font-black px-2 py-0.5 rounded-full">
              المرتبة الأولى (Top 3)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 text-slate-700">
            <div>
              <span className="text-slate-500 block text-[11px]">حجم البحث الشهري:</span>
              <strong className="text-slate-900 font-bold">110,000+ بحث شهرياً في الوطن العربي</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">متوسط سعر النقرة (CPC):</span>
              <strong className="text-emerald-700 font-bold">4.20$ - 9.80$ للمعلنين الماليين</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">معدل الارتداد المقدر (Bounce):</span>
              <strong className="text-emerald-700 font-bold">29.4% (منخفض جداً بفضل التفاعلية)</strong>
            </div>
          </div>
        </div>

        {/* Global Conversion Funnel Simulator */}
        <div className="space-y-3 mb-6">
          <div className="text-xs font-bold text-slate-800">
            مراحل قمع التحويل (Conversion Funnel Performance):
          </div>

          {[
            { step: 'الوصول للصفحة والتفاعل الأولي (Hero Impression)', pct: 100, count: '14,820 زائر' },
            { step: 'استخدام محدد المسارات أو حاسبة الأرباح (Active Engagement)', pct: 68, count: '10,077 مستخدم' },
            { step: 'تصفح تفاصيل المسارات والمنصات المعتمدة (Dwell Time > 2m)', pct: 44, count: '6,520 قراءة معمقة' },
            { step: 'البدء في قائمة مهام الـ 7 أيام أو ترقية الحقيبة (Conversion)', pct: 15.6, count: '2,311 تحويل ناجح' },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">{item.step}</span>
                <span className="font-bold text-emerald-700 font-mono">{item.pct}% ({item.count})</span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Close */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            إغلاق لوحة التحليلات
          </button>
        </div>
      </div>
    </div>
  );
};
