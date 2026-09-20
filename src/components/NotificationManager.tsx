import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  X, 
  Flame, 
  Zap, 
  Sparkles, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';

interface NotificationManagerProps {
  isOpen: boolean;
  onClose: () => void;
  isEnabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  onTriggerSimulatedPush: (title: string, body: string) => void;
}

export const NotificationManager: React.FC<NotificationManagerProps> = ({
  isOpen,
  onClose,
  isEnabled,
  onToggleEnabled,
  onTriggerSimulatedPush,
}) => {
  const [notificationFrequency, setNotificationFrequency] = useState<'instant' | 'daily' | 'weekly'>('daily');

  if (!isOpen) return null;

  const mockOpportunities = [
    {
      id: 'opp-1',
      title: 'فرصة فورية: مطلوب 5 مقيمي نصوص عربية لنماذج الذكاء الاصطناعي',
      payout: '18$ / الساعة',
      platform: 'Outlier AI',
      time: 'منذ 15 دقيقة'
    },
    {
      id: 'opp-2',
      title: 'طلب عاجل: مونتاج 10 مقاطع ريلز لبودكاست أعمال خليجي',
      payout: '350$ / المشروع',
      platform: 'مستقل (Mostaql)',
      time: 'منذ ساعة واحدة'
    },
    {
      id: 'opp-3',
      title: 'خدمة تفريغ صوتي لمؤتمر طبي مدته ساعتان',
      payout: '60$ فوري',
      platform: 'خمسات (Khamsat)',
      time: 'منذ ساعتين'
    }
  ];

  const handleEnableAndTest = () => {
    onToggleEnabled(true);
    onTriggerSimulatedPush(
      'فرصة دخل عاجلة لمتحدثي العربية ⚡',
      'تم إدراج 3 مشاريع جديدة في تقييم الذكاء الاصطناعي والتفريغ بدون اشتراط خبرة مسبقة.'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-right">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                تنبيهات الفرص العاجلة (Push Notification System)
              </h3>
              <p className="text-xs text-slate-500">
                كن أول من يتقدم للفرص عالية الأجر ومشاريع العمل الحر فور طرحها في السوق
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

        {/* Status Toggle Box */}
        <div className={`p-5 rounded-2xl border-2 transition-all mb-6 ${
          isEnabled 
            ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950' 
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-extrabold text-sm sm:text-base flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                <span>حالة التنبيهات: {isEnabled ? 'مفعلة وتصلك مباشرة' : 'متوقفة حالياً'}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isEnabled 
                  ? 'ستتلقى إشعاراً سطح مكتب فوري عند نزول وظيفة مصغرة شاغرة في تخصصك.' 
                  : 'فعل الإشعارات لضمان عدم تفويت المشاريع السريعة محدودة المقاعد.'}
              </p>
            </div>

            <button
              onClick={() => {
                if (!isEnabled) {
                  handleEnableAndTest();
                } else {
                  onToggleEnabled(false);
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isEnabled
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isEnabled ? 'إلغاء التفعيل' : 'تفعيل الآن'}
            </button>
          </div>
        </div>

        {/* Live Opportunity Stream Sample */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              أحدث التنبيهات المرسلة للمشتركين اليوم:
            </span>
            <span className="text-emerald-700 text-[11px]">مباشر من المنصات</span>
          </div>

          <div className="space-y-2">
            {mockOpportunities.map((opp) => (
              <div key={opp.id} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-extrabold text-slate-900 leading-snug">{opp.title}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md shrink-0">
                    {opp.payout}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                  <span>المنصة: <strong>{opp.platform}</strong></span>
                  <span>{opp.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequency selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            تكرار إرسال التنبيهات:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'instant', label: 'فوري (لكل فرصة)' },
              { id: 'daily', label: 'ملخص يومي صباحي' },
              { id: 'weekly', label: 'أفضل فرص الأسبوع' },
            ].map((freq) => (
              <button
                key={freq.id}
                type="button"
                onClick={() => setNotificationFrequency(freq.id as any)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  notificationFrequency === freq.id
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {freq.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trigger Test Push Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onTriggerSimulatedPush('تنبيه تجريبي من مسار المال 🔔', 'الإشعارات تعمل بنجاح! ستصلك الفرص العاجلة فور إدراجها.')}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
          >
            <Send className="w-3.5 h-3.5" />
            <span>إرسال إشعار تجريبي الآن</span>
          </button>

          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            تم وحفظ الإعدادات
          </button>
        </div>
      </div>
    </div>
  );
};
