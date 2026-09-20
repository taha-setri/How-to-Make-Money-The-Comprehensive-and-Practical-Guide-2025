import React from 'react';
import { 
  Sliders, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  X, 
  RefreshCw,
  BarChart2,
  Percent
} from 'lucide-react';
import { ABTestVariant } from '../types';

interface ABTestingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  variants: ABTestVariant[];
  currentVariantId: string;
  onSelectVariant: (id: 'variantA' | 'variantB' | 'variantC') => void;
}

export const ABTestingPanel: React.FC<ABTestingPanelProps> = ({
  isOpen,
  onClose,
  variants,
  currentVariantId,
  onSelectVariant,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                لوحة التحكم في اختبارات A/B الحية (A/B Testing Engine)
              </h3>
              <p className="text-xs text-slate-500">
                مراقبة وتحسين معدل التحويل (CRO) في الوقت الفعلي لاختيار أكثر زوايا الإقناع فعالية
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

        {/* Experiment Overview Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 bg-purple-50/50 p-4 rounded-2xl border border-purple-100 text-center">
          <div>
            <div className="text-[11px] text-purple-700 font-bold mb-1">الزيارات المختبرة:</div>
            <div className="text-lg sm:text-xl font-black text-purple-900">13,610</div>
          </div>
          <div>
            <div className="text-[11px] text-purple-700 font-bold mb-1">متوسط التحويل:</div>
            <div className="text-lg sm:text-xl font-black text-purple-900">15.1%</div>
          </div>
          <div>
            <div className="text-[11px] text-purple-700 font-bold mb-1">مستوى الثقة الإحصائي:</div>
            <div className="text-lg sm:text-xl font-black text-emerald-600">97.8%</div>
          </div>
        </div>

        {/* Variants List */}
        <div className="space-y-4">
          {variants.map((v) => {
            const isSelected = currentVariantId === v.id;

            return (
              <div
                key={v.id}
                onClick={() => onSelectVariant(v.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-1 ring-purple-600/20' 
                    : 'border-slate-200 hover:border-purple-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-900 text-xs font-black flex items-center justify-center">
                      {v.id === 'variantA' ? 'A' : v.id === 'variantB' ? 'B' : 'C'}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-slate-900">
                      {v.label}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="bg-purple-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      المفعلة حالياً
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  <strong>زاوية الإقناع:</strong> {v.angle}
                </p>

                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs mb-3">
                  <div className="text-slate-500 text-[11px] mb-0.5 font-bold">العنوان الرئيسي الموجه:</div>
                  <div className="font-extrabold text-slate-900 leading-snug">{v.headline}</div>
                </div>

                {/* Conversion Performance Metrics */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span>المشاهدات: <strong>{v.totalImpressions.toLocaleString()}</strong></span>
                    <span>التحويلات: <strong>{v.conversionsCount.toLocaleString()}</strong></span>
                  </div>

                  <div className="flex items-center gap-1 text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>معدل التحويل: {v.conversionRate}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>البيانات محدثة مباشرة من تفاعلات الزوار</span>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl transition-colors"
          >
            تطبيق والإغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
