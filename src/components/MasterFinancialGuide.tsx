import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Target, 
  FolderGit2, 
  Trophy, 
  ShieldAlert, 
  TrendingUp, 
  Wallet, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  Zap, 
  Award, 
  ArrowLeft, 
  Compass, 
  ShieldCheck, 
  Layers,
  FileText,
  BadgeCheck,
  Send,
  Download,
  CalendarCheck2
} from 'lucide-react';
import { MasterBlueprintPhase, GoldenRuleTip, GoldenRuleCategory, ChecklistItem } from '../types';
import { SEVEN_DAY_BLUEPRINT } from '../data/incomeStreams';
import { downloadActionPlanPDF } from '../utils/pdfGenerator';

interface MasterFinancialGuideProps {
  phases: MasterBlueprintPhase[];
  goldenRules: GoldenRuleTip[];
  actionPlanSteps?: ChecklistItem[];
  onNotify?: (title: string, body: string) => void;
}

export const MasterFinancialGuide: React.FC<MasterFinancialGuideProps> = ({
  phases,
  goldenRules,
  actionPlanSteps,
  onNotify,
}) => {
  // Main view tab: 'blueprint' | 'golden_rules'
  const [activeMainTab, setActiveMainTab] = useState<'blueprint' | 'golden_rules'>('blueprint');

  // Blueprint active phase
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(0);
  const activePhase = phases[selectedPhaseIndex] || phases[0];

  // Completed steps tracker (persisted in localStorage for active user engagement)
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('user_master_blueprint_progress');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  // Copied template state
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  // Golden Rules state
  const [selectedRuleCategory, setSelectedRuleCategory] = useState<GoldenRuleCategory | 'all'>('all');
  const [expandedRuleIds, setExpandedRuleIds] = useState<Record<string, boolean>>({
    'rule-scam-shield': true,
    'rule-high-ticket-scaling': true,
  });

  const toggleStepCompleted = (stepKey: string) => {
    setCompletedSteps(prev => {
      const next = { ...prev, [stepKey]: !prev[stepKey] };
      try {
        localStorage.setItem('user_master_blueprint_progress', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleCopy = (text: string, templateKey: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateId(templateKey);
    if (onNotify) {
      onNotify('تم نسخ النموذج إلى الحافظة', `تم نسخ "${title}" بنجاح، يمكنك استخدامه مباشرة.`);
    }
    setTimeout(() => {
      setCopiedTemplateId(null);
    }, 2500);
  };

  const toggleRuleExpand = (ruleId: string) => {
    setExpandedRuleIds(prev => ({
      ...prev,
      [ruleId]: !prev[ruleId]
    }));
  };

  const handleDownloadPlanPDF = () => {
    let activeSteps = actionPlanSteps && actionPlanSteps.length > 0 ? actionPlanSteps : SEVEN_DAY_BLUEPRINT;
    try {
      const saved = localStorage.getItem('user_7day_blueprint');
      if (saved) {
        activeSteps = JSON.parse(saved);
      }
    } catch {
      // ignore
    }

    downloadActionPlanPDF(
      activeSteps,
      'ملخص خطة الـ 7 أيام للعمل الحر واستقبال أول أرباح رقمية'
    );

    if (onNotify) {
      onNotify('تم تجهيز ملخص الخطة (PDF)', 'تم فتح معاينة الطباعة وحفظ الـ PDF لخطتك التنفيذية للقراءة أوفلاين.');
    }
  };

  const filteredRules = selectedRuleCategory === 'all' 
    ? goldenRules 
    : goldenRules.filter(r => r.category === selectedRuleCategory);

  const getPhaseIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-emerald-400" />;
      case 'Target': return <Target className="w-5 h-5 text-teal-400" />;
      case 'FolderGit2': return <FolderGit2 className="w-5 h-5 text-cyan-400" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getImpactBadge = (level: string) => {
    switch (level) {
      case 'critical':
        return <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">حرج وحاسم <AlertTriangle className="w-3 h-3" /></span>;
      case 'transformative':
        return <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">قفزة استثنائية <TrendingUp className="w-3 h-3" /></span>;
      default:
        return <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">أولوية عليا <BadgeCheck className="w-3 h-3" /></span>;
    }
  };

  // Calculate total blueprint completion
  const totalBlueprintStepsCount = phases.reduce((acc, p) => acc + p.steps.length, 0);
  const completedBlueprintStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const blueprintProgressPct = Math.min(100, Math.round((completedBlueprintStepsCount / Math.max(1, totalBlueprintStepsCount)) * 100));

  return (
    <section id="master-blueprint-section" className="py-16 relative z-10 scroll-mt-24">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black mb-4 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>خارطة الطريق الكاملة من الصفر (0$ رأس مال)</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            الدليل التنفيذي الشامل: كيف تبدأ رحلة كسب المال <br className="hidden sm:inline" />
            <span className="text-luxury-gradient">من الصفر حتى أول عميل موثق</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            خطة عمل استراتيجية واقعية ومجردة من الوعود الزائفة. مقسمة إلى مراحل يومية واضحة، مع تدابير الأمان المالي، كشف فخاخ النصب، ونماذج تواصل جاهزة للنسخ والاستخدام الفوري.
          </p>
        </div>

        {/* Master Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 max-w-xl mx-auto">
          <button
            id="tab-master-blueprint"
            onClick={() => setActiveMainTab('blueprint')}
            className={`w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-black text-sm transition-all cursor-pointer border ${
              activeMainTab === 'blueprint'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-102'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-emerald-500/40 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>خارطة الطريق (من الصفر للقمة)</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeMainTab === 'blueprint' ? 'bg-slate-950/20 text-slate-950' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              4 مراحل
            </span>
          </button>

          <button
            id="tab-golden-rules"
            onClick={() => setActiveMainTab('golden_rules')}
            className={`w-full sm:w-1/2 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl font-black text-sm transition-all cursor-pointer border ${
              activeMainTab === 'golden_rules'
                ? 'bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-102'
                : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>النصائح الذهبية والأمان المالي</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              activeMainTab === 'golden_rules' ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-500/20 text-amber-300'
            }`}>
              دروع الحماية
            </span>
          </button>
        </div>

        {/* Tab 1 Content: The Zero-to-Hero Execution Blueprint */}
        {activeMainTab === 'blueprint' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Overall Progress Tracker Bar */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-emerald-500/30 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Zap className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm sm:text-base">
                      معدل إنجاز خارطة الطريق التنفيذية
                    </h4>
                    <p className="text-slate-400 text-xs">
                      أنجزت {completedBlueprintStepsCount} من أصل {totalBlueprintStepsCount} خطوة عملية
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-end sm:self-center">
                  <span className="text-emerald-400 font-black text-lg sm:text-xl font-mono ml-1">
                    {blueprintProgressPct}%
                  </span>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleDownloadPlanPDF}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                    title="توليد وتنزيل ملخص أنيق لخطة الـ 7 أيام بصيغة PDF للقراءة أوفلاين"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل ملخص الـ 7 أيام (PDF)</span>
                  </motion.button>

                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
                    title="طباعة أو حفظ خارطة الطريق كـ PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>طباعة</span>
                  </button>
                </div>
              </div>

              {/* Progress bar line */}
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${blueprintProgressPct}%` }}
                />
              </div>
            </div>

            {/* 4 Phases Selector Carousel / Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {phases.map((phase, idx) => {
                const isSelected = selectedPhaseIndex === idx;
                const phaseStepKeys = phase.steps.map(s => `phase-${phase.phaseNumber}-step-${s.stepNumber}`);
                const phaseCompletedCount = phaseStepKeys.filter(k => completedSteps[k]).length;
                const isPhaseAllDone = phaseCompletedCount === phase.steps.length;

                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhaseIndex(idx)}
                    className={`text-right p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-b from-slate-800 to-slate-900/95 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    {isPhaseAllDone && (
                      <div className="absolute top-2 left-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full p-1">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                          isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {phase.dayRange}
                        </span>
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                          {getPhaseIcon(phase.iconName)}
                        </div>
                      </div>

                      <h4 className={`text-sm font-black mb-1 line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {phase.title}
                      </h4>
                      <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                        {phase.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        {phase.timeCommitment}
                      </span>
                      <span className="font-bold text-emerald-400">
                        {phaseCompletedCount}/{phase.steps.length} خطوات
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Deep Dive Detail Card */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Active Phase Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3 py-1 rounded-full">
                      {activePhase.dayRange}
                    </span>
                    <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold px-3 py-1 rounded-full">
                      {activePhase.badge}
                    </span>
                    <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                      {activePhase.capitalRequired}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight">
                    {activePhase.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                    {activePhase.objective}
                  </p>
                </div>

                <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2 p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">الالتزام اليومي المطلوب:</span>
                  <span className="text-sm font-black text-emerald-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {activePhase.timeCommitment}
                  </span>
                </div>
              </div>

              {/* Step by Step Breakdown */}
              <div className="space-y-6 mb-8">
                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <span>الخطوات التنفيذية الملزمة لهذه المرحلة (خطوة بخطوة):</span>
                </h4>

                <div className="space-y-4">
                  {activePhase.steps.map((step) => {
                    const stepKey = `phase-${activePhase.phaseNumber}-step-${step.stepNumber}`;
                    const isDone = Boolean(completedSteps[stepKey]);

                    return (
                      <div
                        key={step.stepNumber}
                        className={`p-5 rounded-2xl border transition-all ${
                          isDone
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Interactive Toggle Checkbox */}
                          <button
                            onClick={() => toggleStepCompleted(stepKey)}
                            className="mt-1 cursor-pointer flex-shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                            title={isDone ? 'إلغاء وضع علامة تم' : 'وضع علامة تم على هذه الخطوة'}
                          >
                            {isDone ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <Circle className="w-6 h-6 text-slate-600 hover:text-emerald-400" />
                            )}
                          </button>

                          {/* Step Content */}
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <h5 className={`font-black text-base ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                                الخطوة {step.stepNumber}: {step.title}
                              </h5>
                              <span className="text-xs text-slate-400 font-mono flex items-center gap-1 self-start sm:self-auto">
                                <Clock className="w-3 h-3 text-emerald-400" />
                                {step.timeEstimate}
                              </span>
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed">
                              {step.description}
                            </p>

                            {/* Practical Badges & Notes */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2">
                              {/* Tool used */}
                              <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800/80 flex items-start gap-2">
                                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                <div className="text-xs">
                                  <span className="block text-slate-400 font-medium">الأداة الموصى بها:</span>
                                  <span className="text-slate-200 font-bold">{step.actionTool}</span>
                                </div>
                              </div>

                              {/* Pitfall to avoid */}
                              <div className="bg-rose-950/20 rounded-xl p-2.5 border border-rose-500/30 flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                                <div className="text-xs">
                                  <span className="block text-rose-300 font-medium">فخ يجب تجنبه:</span>
                                  <span className="text-rose-200">{step.pitfallToAvoid}</span>
                                </div>
                              </div>

                              {/* Deliverable */}
                              <div className="bg-emerald-950/20 rounded-xl p-2.5 border border-emerald-500/30 flex items-start gap-2">
                                <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div className="text-xs">
                                  <span className="block text-emerald-300 font-medium">المُخرج العملي المطلوب:</span>
                                  <span className="text-emerald-200 font-bold">{step.deliverable}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ready-to-Copy Actionable Pro Template */}
              {activePhase.proTemplate && (
                <div className="bg-gradient-to-r from-slate-950 to-emerald-950/30 rounded-2xl p-5 sm:p-6 border border-emerald-500/40 relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wide">
                          {activePhase.proTemplate.label}
                        </span>
                        <h5 className="text-white font-black text-sm sm:text-base">
                          {activePhase.proTemplate.title}
                        </h5>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(
                        activePhase.proTemplate!.body, 
                        `template-phase-${activePhase.phaseNumber}`,
                        activePhase.proTemplate!.title
                      )}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md shadow-emerald-500/20 self-start sm:self-auto"
                    >
                      {copiedTemplateId === `template-phase-${activePhase.phaseNumber}` ? (
                        <>
                          <Check className="w-4 h-4 text-slate-950" />
                          <span>تم النسخ بنجاح!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-950" />
                          <span>نسخ النموذج بنقرة واحدة</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    💡 {activePhase.proTemplate.instructions}
                  </p>

                  <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 text-slate-300 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed select-all">
                    {activePhase.proTemplate.body}
                  </div>
                </div>
              )}

              {/* Navigation between phases */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  disabled={selectedPhaseIndex === 0}
                  onClick={() => setSelectedPhaseIndex(i => Math.max(0, i - 1))}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedPhaseIndex === 0
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-white cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                  <span>المرحلة السابقة</span>
                </button>

                <button
                  disabled={selectedPhaseIndex === phases.length - 1}
                  onClick={() => setSelectedPhaseIndex(i => Math.min(phases.length - 1, i + 1))}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                    selectedPhaseIndex === phases.length - 1
                      ? 'opacity-40 cursor-not-allowed text-slate-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 cursor-pointer shadow-md'
                  }`}
                >
                  <span>المرحلة التالية</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2 Content: Pro Tips & Golden Rules */}
        {activeMainTab === 'golden_rules' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {[
                { id: 'all', label: 'جميع النصائح والأدلة' },
                { id: 'scam_prevention', label: '🛡️ درع الحماية من النصب' },
                { id: 'high_ticket_scaling', label: '🚀 مضاعفة الصفقات الكبرى' },
                { id: 'payment_gateways', label: '💳 بوابات الدفع الدولية' },
                { id: 'extreme_productivity', label: '⚡ الإنتاجية والعمل العميق' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedRuleCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    selectedRuleCategory === cat.id
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm'
                      : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Golden Rules Accordions */}
            <div className="space-y-4">
              {filteredRules.map((rule) => {
                const isExpanded = Boolean(expandedRuleIds[rule.id]);

                return (
                  <div
                    key={rule.id}
                    className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 hover:border-amber-500/40 transition-all shadow-lg overflow-hidden"
                  >
                    {/* Header bar */}
                    <div
                      onClick={() => toggleRuleExpand(rule.id)}
                      className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                            {rule.categoryLabel}
                          </span>
                          {getImpactBadge(rule.impactLevel)}
                          <span className="bg-amber-500/10 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
                            {rule.badge}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg lg:text-xl font-black text-white leading-snug">
                          {rule.title}
                        </h4>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {rule.summary}
                        </p>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 flex-shrink-0 mt-1">
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>

                    {/* Expandable Deep Breakdown */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-slate-800/80 bg-slate-950/60 p-5 sm:p-6 space-y-6"
                        >
                          {/* Detailed Breakdown Points */}
                          <div>
                            <h5 className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <Layers className="w-4 h-4" />
                              <span>التشريح التفصيلي والقواعد الإجرائية:</span>
                            </h5>
                            <div className="space-y-2.5">
                              {rule.detailedBreakdown.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Practical Real-World Example Box */}
                          <div className="bg-slate-900/90 rounded-xl p-4 border border-amber-500/30">
                            <h5 className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4" />
                              <span>سيناريو ومثال تطبيقي واقعي من السوق:</span>
                            </h5>
                            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                              {rule.practicalExample}
                            </p>
                          </div>

                          {/* Golden Rule Highlight Quote */}
                          <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-emerald-950/30 rounded-xl p-4 border-r-4 border-r-amber-400 border border-slate-800 text-center sm:text-right">
                            <span className="text-[11px] font-bold text-amber-300 block mb-1">
                              القاعدة الذهبية الصارمة:
                            </span>
                            <blockquote className="text-sm sm:text-base font-black text-white italic">
                              "{rule.goldenRuleQuote}"
                            </blockquote>
                          </div>

                          {/* Action Checklist */}
                          <div>
                            <h5 className="text-xs font-black text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>قائمة الإجراءات الفورية لحمايتك ومضاعفة نتائجك:</span>
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {rule.actionChecklist.map((act, i) => (
                                <div key={i} className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                  <span>{act}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Bottom Strategic Action Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 rounded-2xl p-6 border border-emerald-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right">
            <h4 className="text-white font-black text-base sm:text-lg">
              هل ترغب في العثور على المسار العملي المناسب لوقتك ومعدل أجر ساعتك؟
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              استخدم محدد المسار التفاعلي لحساب أرباحك وتحديد المهارة في أقل من دقيقة.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="#quick-selector"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20"
            >
              <Compass className="w-4 h-4" />
              <span>محدد المسار السريع</span>
            </a>

            <a
              href="#templates-vault"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm transition-all border border-slate-700"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>نماذج العروض</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
