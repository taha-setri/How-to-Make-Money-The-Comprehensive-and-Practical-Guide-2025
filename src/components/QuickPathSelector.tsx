import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Clock, 
  Wallet, 
  Target, 
  Sparkles, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Zap, 
  ExternalLink,
  ChevronLeft,
  CreditCard,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INCOME_STREAMS } from '../data/incomeStreams';
import { IncomeStream } from '../types';
import { SkillBadgeCardModal } from './SkillBadgeCardModal';

interface QuickPathSelectorProps {
  onSelectStream: (streamId: string) => void;
  onPathCompleted?: () => void;
  streams?: IncomeStream[];
}

export const QuickPathSelector: React.FC<QuickPathSelectorProps> = ({
  onSelectStream,
  onPathCompleted,
  streams,
}) => {
  const availableStreams = streams && streams.length > 0 ? streams : INCOME_STREAMS;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [timeAvailable, setTimeAvailable] = useState<string>('2-3');
  const [capitalAvailable, setCapitalAvailable] = useState<string>('zero');
  const [urgencyGoal, setUrgencyGoal] = useState<string>('fast');
  const [skillPref, setSkillPref] = useState<string>('ai_data');
  const [matchedStreams, setMatchedStreams] = useState<IncomeStream[] | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState<boolean>(false);

  const handleCalculateMatch = () => {
    let filtered = [...availableStreams];

    if (capitalAvailable === 'zero') {
      filtered = filtered.filter(s => s.capitalLevel === 'zero');
    }

    if (urgencyGoal === 'instant') {
      filtered = filtered.sort((a, b) => {
        if (a.speedLevel === 'instant' || a.speedLevel === 'fast') return -1;
        return 1;
      });
    } else if (urgencyGoal === 'passive') {
      filtered = filtered.sort((a, b) => {
        if (a.category === 'content-monetization') return -1;
        return 1;
      });
    } else {
      filtered = filtered.sort((a, b) => {
        if (a.category === 'digital-skills') return -1;
        return 1;
      });
    }

    if (skillPref === 'ai_data') {
      const top = filtered.find(s => s.id === 'ai-data-annotation' || s.id === 'audio-transcription');
      if (top) {
        filtered = [top, ...filtered.filter(s => s.id !== top.id)];
      }
    } else if (skillPref === 'design') {
      const top = filtered.find(s => s.id === 'canva-design-templates' || s.id === 'faceless-youtube');
      if (top) {
        filtered = [top, ...filtered.filter(s => s.id !== top.id)];
      }
    } else if (skillPref === 'writing') {
      const top = filtered.find(s => s.id === 'ai-copywriting' || s.id === 'notion-digital-products');
      if (top) {
        filtered = [top, ...filtered.filter(s => s.id !== top.id)];
      }
    } else {
      const top = filtered.find(s => s.id === 'drop-servicing' || s.id === 'affiliate-micro-reviews');
      if (top) {
        filtered = [top, ...filtered.filter(s => s.id !== top.id)];
      }
    }

    setMatchedStreams(filtered);
    setCurrentStep(5);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (onPathCompleted) {
      onPathCompleted();
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setMatchedStreams(null);
  };

  return (
    <div id="quick-selector" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-14 scroll-mt-24">
      <div className="bg-slate-900 rounded-3xl border border-emerald-500/30 shadow-2xl overflow-hidden glow-luxury-emerald">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/90 text-white p-6 sm:p-8 border-b border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-luxury-pulse" />
          <div className="flex items-center justify-between gap-4 flex-wrap relative z-10">
            <div className="flex items-center gap-3.5">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0], y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-950 to-slate-900 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-md glow-luxury-emerald"
              >
                <Compass className="w-6 h-6" />
              </motion.div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  <span className="text-luxury-gradient">محدد المسار السريع</span> (The Fast Income Path Selector)
                </h2>
                <p className="text-sm text-slate-400 font-medium mt-0.5">
                  أجب عن 4 أسئلة بسيطة وسيقوم النظام بتحديد الطريقة الشرعية الأنسب لظروفك فوراً
                </p>
              </div>
            </div>

            {currentStep < 5 && (
              <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>الخطوة {currentStep} من 4</span>
              </div>
            )}
          </div>

          {/* Progress dots with animated indicators */}
          {currentStep < 5 && (
            <div className="mt-6 flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    currentStep >= step ? 'bg-emerald-400' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Wizard Content Body with Smooth Transitions */}
        <div className="p-6 sm:p-8 bg-slate-950/60">
          <AnimatePresence mode="wait">
            {/* STEP 1: Time Commitment */}
            {currentStep === 1 && (
              <motion.div 
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>السؤال الأول: كم من الوقت تستطيع تخصيصه يومياً للعمل عبر الإنترنت؟</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: '1-2', label: '1 - 2 ساعة يومياً', desc: 'مناسب للطلاب أو الموظفين كدخل إضافي مسائي', badge: 'مهام خفيفة' },
                    { id: '2-3', label: '3 - 4 ساعات يومياً', desc: 'المعدل الذهبي لتعلم وتطبيق مهارة عالية الدخل', badge: 'المعدل المثالي' },
                    { id: '5+', label: '5+ ساعات (تفرغ كامل)', desc: 'لبناء وكالة مصغرة أو تحقيق استقلال مالي سريع', badge: 'أقصى تسارع' },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setTimeAvailable(item.id)}
                      className={`text-right p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                        timeAvailable === item.id 
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-lg ring-1 ring-emerald-500/50' 
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/60">
                            {item.badge}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            timeAvailable === item.id ? 'border-emerald-400 bg-emerald-500' : 'border-slate-700'
                          }`}>
                            {timeAvailable === item.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                          </div>
                        </div>
                        <div className="font-bold text-white text-base mb-1">{item.label}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                  >
                    <span>التالي: تحديد رأس المال</span>
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Initial Capital */}
            {currentStep === 2 && (
              <motion.div 
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Wallet className="w-4 h-4" />
                  <span>السؤال الثاني: ما هو رأس المال الحالي المتوفر للبدء؟</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { 
                      id: 'zero', 
                      label: '0$ (لا أملك أي رأس مال إطلاقاً)', 
                      desc: 'أبحث فقط عن مسارات مجانية 100% تعتمد على وقتي وجهدي فقط دون أي تكلفة',
                      badge: 'مسار مجاني 100%' 
                    },
                    { 
                      id: 'low', 
                      label: 'مبلغ رمزي (أقل من 50$)', 
                      desc: 'يمكنني استثمار مبالغ بسيطة لشراء دومين أو اشتراك أداة ذكاء اصطناعي لتسريع النتائج',
                      badge: 'تسريع إضافي' 
                    },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCapitalAvailable(item.id)}
                      className={`text-right p-5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                        capitalAvailable === item.id 
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-lg ring-1 ring-emerald-500/50' 
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/60">
                            {item.badge}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            capitalAvailable === item.id ? 'border-emerald-400 bg-emerald-500' : 'border-slate-700'
                          }`}>
                            {capitalAvailable === item.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                          </div>
                        </div>
                        <div className="font-bold text-white text-base mb-1">{item.label}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-slate-400 hover:text-white text-xs sm:text-sm font-semibold px-4 py-2 cursor-pointer"
                  >
                    العودة للخطوة السابقة
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                  >
                    <span>التالي: تحديد الهدف والأولوية</span>
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Goal & Urgency */}
            {currentStep === 3 && (
              <motion.div 
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>السؤال الثالث: ما هي أولويتك القصوى والهدف المالي الأساسي؟</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { 
                      id: 'instant', 
                      label: 'دخل فوري وعاجل (خلال أيام)', 
                      desc: 'أحتاج لأموال سريعة في أقرب وقت لتغطية مصاريف حالية من مهام خفيفة',
                      badge: 'سرعة قصوى' 
                    },
                    { 
                      id: 'growth', 
                      label: 'بناء دخل شهري مستمر (500$ - 1500$)', 
                      desc: 'مستعد لتعلم مهارة مطلوبة لمدة أسبوع والعمل مع عملاء بعقود منتظمة',
                      badge: 'الأكثر أماناً واستقراراً' 
                    },
                    { 
                      id: 'passive', 
                      label: 'دخل تراكمي وأصول رقمية سلبية', 
                      desc: 'صناعة محتوى أو بيع منتجات رقمية تجلب المال حتى أثناء نومك مستقبلاً',
                      badge: 'استثمار طويل الأجل' 
                    },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUrgencyGoal(item.id)}
                      className={`text-right p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                        urgencyGoal === item.id 
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-lg ring-1 ring-emerald-500/50' 
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/60">
                            {item.badge}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            urgencyGoal === item.id ? 'border-emerald-400 bg-emerald-500' : 'border-slate-700'
                          }`}>
                            {urgencyGoal === item.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                          </div>
                        </div>
                        <div className="font-bold text-white text-base mb-1">{item.label}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-slate-400 hover:text-white text-xs sm:text-sm font-semibold px-4 py-2 cursor-pointer"
                  >
                    العودة للخطوة السابقة
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCurrentStep(4)}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                  >
                    <span>التالي: تحديد الميول والمهارة</span>
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Skill & Interest */}
            {currentStep === 4 && (
              <motion.div 
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>السؤال الرابع والأخير: أي من هذه المجالات تشعر أنها أقرب لقدراتك؟</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { 
                      id: 'ai_data', 
                      label: 'تدقيق نصوص، مهام ذكاء اصطناعي، وتفريغ صوتي', 
                      desc: 'دقة الملاحظة، فهم اللغة العربية السليمة، والعمل المنظم على الحاسوب',
                      tag: 'بدون خبرة سابقة' 
                    },
                    { 
                      id: 'design', 
                      label: 'التصميم البصري، كانفا، ومونتاج مقاطع تيك توك وريلز', 
                      desc: 'حس بصري خفيف واستخدام أدوات سهلة مثل Canva أو CapCut',
                      tag: 'طلب هائل حالياً' 
                    },
                    { 
                      id: 'writing', 
                      label: 'الكتابة التسويقية وصياغة الإعلانات المقنعة', 
                      desc: 'حب الإقناع وفهم نفسية المستهلك لمساعدة المتاجر في بيع منتجاتها',
                      tag: 'الأعلى عائداً في الساعة' 
                    },
                    { 
                      id: 'business', 
                      label: 'وساطة الخدمات والتسويق بالعمولة وإدارة الصفقات', 
                      desc: 'التواصل الفعال وإيجاد عملاء والربط بين صاحب العمل والمستقل المحترف',
                      tag: 'نموذج وكالة مصغرة' 
                    },
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSkillPref(item.id)}
                      className={`text-right p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                        skillPref === item.id 
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-lg ring-1 ring-emerald-500/50' 
                          : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/60">
                            {item.tag}
                          </span>
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            skillPref === item.id ? 'border-emerald-400 bg-emerald-500' : 'border-slate-700'
                          }`}>
                            {skillPref === item.id && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                          </div>
                        </div>
                        <div className="font-bold text-white text-base mb-1">{item.label}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-slate-400 hover:text-white text-xs sm:text-sm font-semibold px-4 py-2 cursor-pointer"
                  >
                    العودة للخطوة السابقة
                  </button>
                  <motion.button
                    id="submit-path-selector-btn"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCalculateMatch}
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    <span>استخراج المسار الأنسب لحالتي الآن</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* RESULTS VIEW with Repeating Subtle Aura */}
            {currentStep === 5 && matchedStreams && (
              <motion.div 
                key="step-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-emerald-950/60 border border-emerald-500/40 p-5 rounded-2xl flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-emerald-300 font-extrabold text-lg mb-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>تم تحليل إجاباتك بنجاح! إليك مسارك الموصى به:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">
                      بناءً على تخصيص {timeAvailable} ساعات يومياً وبرأس مال {capitalAvailable === 'zero' ? '0$' : 'محدود'}، هذه أفضل فرصة تحقق لك نتيجة ملموسة:
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setIsBadgeModalOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 px-3 py-1.5 rounded-lg border border-emerald-500/50 transition-all font-bold cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>توليد بطاقة المهارة الرقمية</span>
                    </motion.button>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة التقييم</span>
                    </button>
                  </div>
                </div>

                {/* Primary Recommended Match Card with Continuous Pulse Glow */}
                {matchedStreams[0] && (
                  <motion.div 
                    animate={{ 
                      boxShadow: [
                        '0 0 15px rgba(16,185,129,0.15)', 
                        '0 0 30px rgba(16,185,129,0.3)', 
                        '0 0 15px rgba(16,185,129,0.15)'
                      ] 
                    }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                    className="bg-slate-900 p-6 rounded-2xl border border-emerald-500 shadow-xl"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                      <div>
                        <div className="inline-block bg-emerald-500 text-slate-950 text-xs font-black px-2.5 py-1 rounded-full mb-2">
                          المسار رقم 1 (توافق 97%)
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">
                          {matchedStreams[0].title}
                        </h3>
                        <div className="text-xs text-slate-400 mt-1">
                          {matchedStreams[0].categoryLabel} • {matchedStreams[0].payoutSpeed}
                        </div>
                      </div>

                      <div className="text-right bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400 font-semibold">الدخل المتوقع:</div>
                        <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
                          {matchedStreams[0].incomePotential}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed mb-5">
                      {matchedStreams[0].description}
                    </p>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-5">
                      <div className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span>خطوتك الأولى الفورية اليوم:</span>
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed font-medium">
                        {matchedStreams[0].actionSteps[0]}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>المنصة المقترحة للبدء:</span>
                        <a 
                          href={matchedStreams[0].recommendedPlatforms[0].url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-bold text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          {matchedStreams[0].recommendedPlatforms[0].name}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setIsBadgeModalOpen(true)}
                          className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-750 text-emerald-300 hover:text-white text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl border border-emerald-500/40 shadow-xs transition-all cursor-pointer"
                          title="إنشاء بطاقة رقمية ببياناتك ومجالك المستخرج"
                        >
                          <CreditCard className="w-4 h-4 text-emerald-400" />
                          <span>توليد بطاقة مهارة</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => onSelectStream(matchedStreams[0].id)}
                          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-black px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                        >
                          <span>عرض تفاصيل المسار الكاملة</span>
                          <ArrowLeft className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Secondary Alternatives */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedStreams.slice(1, 3).map((stream, idx) => (
                    <motion.div 
                      key={stream.id} 
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-right"
                    >
                      <div className="text-[11px] font-bold text-slate-400 mb-1">
                        بديل مقترح {idx + 2} (توافق 89%)
                      </div>
                      <div className="font-bold text-white text-base mb-1">
                        {stream.title}
                      </div>
                      <div className="text-xs text-emerald-400 font-semibold mb-2 font-mono">
                        {stream.incomePotential}
                      </div>
                      <button
                        onClick={() => onSelectStream(stream.id)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>استكشاف البديل</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Skill Badge Card Modal */}
      {matchedStreams && matchedStreams[0] && (
        <SkillBadgeCardModal
          isOpen={isBadgeModalOpen}
          onClose={() => setIsBadgeModalOpen(false)}
          matchedStream={matchedStreams[0]}
          timeCommitment={
            timeAvailable === '1-2' 
              ? '1 - 2 ساعة/يوم' 
              : timeAvailable === '2-3' 
              ? '3 - 4 ساعات/يوم' 
              : '5+ ساعات تفرغ'
          }
          capitalLevel={capitalAvailable === 'zero' ? '0$ (مجاني 100%)' : 'أقل من 50$'}
        />
      )}
    </div>
  );
};
