import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileCheck, 
  AlertOctagon,
  CheckCircle2
} from 'lucide-react';

export const SecurityPrivacyNotice: React.FC = () => {
  return (
    <section className="my-16 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black">
              الأمان والخصوصية والتشفير التام للبيانات (Privacy & Security Guarantee)
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              تصفح آمن 100% مع التزام كامل بحماية خصوصيتك وعدم تتبع أي معلومات حساسة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">
              تشفير محلي End-to-End للخطط
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              يتم حفظ تقدمك في خطة الـ 7 أيام وحسابات الأرباح على جهازك الشخصي باستخدام تشفير محلي آمن دون إرسالها لخوادم خارجية.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <EyeOff className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">
              صفر بيع للبيانات أو الاتصالات
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              نحن نكره رسائل السبام تماماً كما تكرهها. لا نطلب رقم هاتفك ولن يتم بيع بريدك لأي جهات ترويجية خارجية نهائياً.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1">
              فلترة صارمة ضد مواقع النصب
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              نستبعد فوراً أي منصة تطلب دفع أموال مقدماً لتبدأ العمل أو تروج لعوائد استثمارية خيالية غير منطقية.
            </p>
          </div>
        </div>

        {/* Anti-Scam Golden Rules Banner */}
        <div className="bg-emerald-950/60 border border-emerald-800/80 p-5 rounded-2xl">
          <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>القواعد الذهبية الثلاث للحماية من النصب الإلكتروني:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300 pr-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>القاعدة 1:</strong> إذا طلب منك أي موقع دفع رسوم تسجيل أو اشتراك للبدء في وظيفة، فهو احتيال بنسبة 99.9%.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>القاعدة 2:</strong> لا توجد طريقة في العالم تمنحك 500$ بمجرد النقر على روابط أو مشاهدة فيديوهات قصيرة.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>القاعدة 3:</strong> المال هو نتيجة حل مشكلة لشخص أو شركة؛ طوّر مهارة حقيقية تضمن لك تدفقاً مستمراً.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
