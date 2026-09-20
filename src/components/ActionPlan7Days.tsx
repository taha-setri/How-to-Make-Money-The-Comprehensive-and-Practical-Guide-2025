import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CalendarCheck2, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  Share2, 
  Printer, 
  Lock,
  Flame,
  Award,
  Copy,
  Zap,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEVEN_DAY_BLUEPRINT } from '../data/incomeStreams';
import { ChecklistItem } from '../types';
import { ActionPlanRoadmap } from './ActionPlanRoadmap';
import { downloadActionPlanPDF } from '../utils/pdfGenerator';

interface ActionPlan7DaysProps {
  onPlanCompleted?: () => void;
  onOpenVIPModal?: () => void;
  steps?: ChecklistItem[];
}

export const ActionPlan7Days: React.FC<ActionPlan7DaysProps> = ({
  onPlanCompleted,
  steps,
}) => {
  const initialSteps = steps && steps.length > 0 ? steps : SEVEN_DAY_BLUEPRINT;
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_7day_blueprint');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialSteps;
  });

  const [copiedTaskId, setCopiedTaskId] = useState<string | null>(null);
  
  // Find the first non-completed step or default to day-1
  const [activeStepId, setActiveStepId] = useState<string>(() => {
    const firstIncomplete = checklist.find(s => !s.completed);
    return firstIncomplete ? firstIncomplete.id : checklist[0]?.id || 'day-1';
  });

  const completedCount = checklist.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const triggerCompletionCelebration = () => {
    try {
      // First burst: center gold/emerald explosion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8', '#fbbf24']
      });

      // Second burst: left side shower
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: ['#10b981', '#6ee7b7', '#f59e0b']
        });
      }, 250);

      // Third burst: right side shower
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: ['#10b981', '#38bdf8', '#fbbf24']
        });
      }, 450);
    } catch {
      // ignore
    }
  };

  const toggleTask = (id: string) => {
    const updated = checklist.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setChecklist(updated);
    try {
      localStorage.setItem('user_7day_blueprint', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (updated.every(i => i.completed)) {
      triggerCompletionCelebration();
      if (onPlanCompleted) onPlanCompleted();
    }
  };

  const handleCopyPitch = (e: React.MouseEvent, taskId: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedTaskId(taskId);
    setTimeout(() => {
      setCopiedTaskId(null);
    }, 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const taskTemplates: Record<string, string> = {
    'day-5': `مرحباً بك أخي الكريم،
قرأت تفاصيل مشروعك بخصوص [اسم المهمة]، وألفت نظري رغبتك في [نقطة ذكرها العميل].
خطة عملي تتضمن إنجاز العمل وفق المعايير المطلوبة مع مراجعة دقيقة وتسليم قبل الموعد.
رابط عينة سريعة تشبه ما تطلبه تماماً: [رابط نموذج العمل التجريبي].
يسعدني البدء فوراً ومناقشة أي استفسار لديك.`,
    'day-7': `أهلاً بك أستاذي الكريم،
سعدت بالعمل معك في هذا المشروع! تم تسليم كافة الملفات بجودتها الكاملة.
حرصت على إضافة [قيمة إضافية مجانية] كتقدير لتعاملك الراقي.
إذا نال العمل رضاك، يسعدني تقييمك الإيجابي في المنصة، كما يسعدني تقديم باقة أسبوعية/شهرية مخفضة للاهتمام بمهامك القادمة.`
  };

  return (
    <div id="blueprint-7days" className="my-16 scroll-mt-24">
      <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 border-b border-slate-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400"
              >
                <CalendarCheck2 className="w-6 h-6" />
              </motion.div>
              <div>
                <motion.div 
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full mb-1"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  خارطة التنفيذ الميداني
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-black">
                  خطة الـ 7 أيام للانطلاق الفعلي واستقبال أول أرباح
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  مهام يومية مركزة قابلة للقياس مع قوالب جاهزة للنسخ بنقرة واحدة لتحويل بحثك إلى نتائج ملموسة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => downloadActionPlanPDF(checklist)}
                className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                title="تنزيل ملخص خطة الـ 7 أيام بصيغة PDF للقراءة أوفلاين"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل ملخص (PDF)</span>
              </motion.button>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 transition-all text-white cursor-pointer"
                title="طباعة الخطة أو حفظها بصيغة PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة</span>
              </button>
            </div>
          </div>

          {/* Progress Bar Container with Looping Shimmer */}
          <div className="mt-6 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-2">
              <span>نسبة الإنجاز الميداني:</span>
              <span className="text-emerald-400 font-mono text-sm">{progressPercent}% ({completedCount} من 7 أيام)</span>
            </div>
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-emerald-500 rounded-full relative"
                style={{ width: `${progressPercent}%` }}
                initial={false}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              >
                {/* Continuous Shimmer Light on Progress Bar */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Interactive Progress Roadmap Component */}
        <div className="p-6 sm:p-8 pb-0">
          <ActionPlanRoadmap
            steps={checklist}
            activeStepId={activeStepId}
            onSelectStep={(stepId) => setActiveStepId(stepId)}
            onToggleStep={(stepId) => toggleTask(stepId)}
          />
        </div>

        {/* Days Checklist List with Interactive Hover and Toggles */}
        <div className="p-6 sm:p-8 divide-y divide-slate-800/80 space-y-4">
          {checklist.map((item) => {
            const hasTemplate = Boolean(taskTemplates[item.id]);
            const isTemplateCopied = copiedTaskId === item.id;

            const isActive = activeStepId === item.id;

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                onClick={() => {
                  toggleTask(item.id);
                  setActiveStepId(item.id);
                }}
                className={`pt-4 first:pt-0 cursor-pointer group transition-all duration-300 rounded-xl p-4 ${
                  isActive
                    ? 'ring-2 ring-emerald-400/80 bg-slate-850/90 border border-emerald-500/50 shadow-lg glow-luxury-emerald'
                    : item.completed 
                    ? 'bg-emerald-950/30 border border-emerald-800/50' 
                    : 'hover:bg-slate-850/60 border border-transparent'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    className="mt-0.5 shrink-0 text-slate-500 group-hover:text-emerald-400 transition-colors cursor-pointer"
                    aria-label={item.completed ? 'إلغاء التحديد' : 'تحديد كمكتمل'}
                  >
                    {item.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-950" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600" />
                    )}
                  </motion.button>

                  <div className="flex-1 text-right">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-300 bg-emerald-950/90 px-2.5 py-0.5 rounded-md border border-emerald-800/60">
                          اليوم {item.day}
                        </span>
                        <h4 className={`text-base font-extrabold transition-colors ${
                          item.completed ? 'line-through text-slate-500' : 'text-white group-hover:text-emerald-300'
                        }`}>
                          {item.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-semibold bg-slate-950 px-2.5 py-0.5 rounded-md border border-slate-800">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.timeEstimate}</span>
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      item.completed ? 'text-slate-500' : 'text-slate-300'
                    }`}>
                      {item.task}
                    </p>

                    <div className="mt-2 text-[11px] bg-slate-950 border border-slate-800 p-2.5 rounded-lg text-slate-300 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                      <span><strong className="text-white">توجيه عملي:</strong> {item.resourceTip}</span>
                    </div>

                    {/* Integrated One-Click Copy Template */}
                    {hasTemplate && (
                      <div className="mt-3 bg-slate-950/90 border border-emerald-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="text-xs text-emerald-300 font-mono flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>قالب مراسلة جاهز لهذا اليوم (جاهز للإرسال الفوري)</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={(e) => handleCopyPitch(e, item.id, taskTemplates[item.id])}
                          className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isTemplateCopied
                              ? 'bg-emerald-600 text-white shadow-md'
                              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {isTemplateCopied ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              <span>تم النسخ بنجاح!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-emerald-400" />
                              <span>نسخ القالب بنقرة واحدة</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Action Card with 100% Free Guidance */}
        <div className="bg-slate-950 p-6 sm:p-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-extrabold text-sm sm:text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>هل أكملت الخطوات وتريد نماذج جاهزة لمراسلة العملاء؟</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              جميع صيغ ونصوص التواصل، نماذج إغلاق الصفقات، وقوالب العمل متاحة مجاناً 100% دون أي رسوم أو اشتراكات.
            </p>
          </div>

          <motion.a
            href="#templates-vault"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all shrink-0"
          >
            <span>تصفح بنك القوالب مجاناً</span>
            <ArrowLeft className="w-4 h-4" />
          </motion.a>
        </div>

      </div>
    </div>
  );
};
