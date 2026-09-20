import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Target, 
  Flame, 
  ShieldCheck, 
  Award, 
  Layers, 
  Clock, 
  Compass, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { ChecklistItem } from '../types';

export interface ActionPlanRoadmapProps {
  steps: ChecklistItem[];
  activeStepId: string;
  onSelectStep: (stepId: string) => void;
  onToggleStep: (stepId: string) => void;
}

interface PhaseMeta {
  phaseNumber: number;
  title: string;
  tagline: string;
  dayRange: string;
  colorClass: string;
  bgGlow: string;
}

export const ActionPlanRoadmap: React.FC<ActionPlanRoadmapProps> = ({
  steps,
  activeStepId,
  onSelectStep,
  onToggleStep,
}) => {
  // 3 Strategic Progression Phases grouping the 7 days:
  // Phase 1 (Days 1-2): التأسيس والبنية التحتية (Foundation & Payout Ready)
  // Phase 2 (Days 3-4): الإثبات والتموضع الرقمي (Portfolio & Positioning)
  // Phase 3 (Days 5-7): الهجوم وجني أول أرباح (Outreach, Execution & Retention)
  
  const activeStep = steps.find(s => s.id === activeStepId) || steps[0];
  const activeIndex = steps.findIndex(s => s.id === activeStep.id);
  const completedCount = steps.filter(s => s.completed).length;
  const progressRatio = (completedCount / steps.length) * 100;

  // Determine current active phase
  const getPhaseForDay = (day: number): PhaseMeta => {
    if (day <= 2) {
      return {
        phaseNumber: 1,
        title: 'مرحلة التأسيس والبنية التحتية',
        tagline: 'تحديد المسار وتجهيز قنوات استلام الأرباح',
        dayRange: 'اليوم 1 - اليوم 2',
        colorClass: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60',
        bgGlow: 'from-emerald-500/20 via-emerald-950/40 to-slate-950'
      };
    } else if (day <= 4) {
      return {
        phaseNumber: 2,
        title: 'مرحلة التموضع وبناء الإثبات',
        tagline: 'معرض أعمال مقنع وحسابات رسمية جاذبة للعملاء',
        dayRange: 'اليوم 3 - اليوم 4',
        colorClass: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60',
        bgGlow: 'from-cyan-500/20 via-cyan-950/40 to-slate-950'
      };
    } else {
      return {
        phaseNumber: 3,
        title: 'مرحلة الاقتناص وجني أول دولار',
        tagline: 'إرسال العروض، الإتقان الفائق، وتأمين العقود المستمرة',
        dayRange: 'اليوم 5 - اليوم 7',
        colorClass: 'text-amber-400 border-amber-500/40 bg-amber-950/60',
        bgGlow: 'from-amber-500/20 via-amber-950/40 to-slate-950'
      };
    }
  };

  const currentPhase = getPhaseForDay(activeStep.day);

  // Quick navigation
  const handlePrev = () => {
    if (activeIndex > 0) {
      onSelectStep(steps[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < steps.length - 1) {
      onSelectStep(steps[activeIndex + 1].id);
    }
  };

  return (
    <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-5 sm:p-7 shadow-2xl relative overflow-hidden mb-8 transition-colors duration-500">
      {/* Background ambient lighting matching current phase */}
      <div 
        className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-20 ${
          currentPhase.phaseNumber === 1 ? 'bg-emerald-500' : currentPhase.phaseNumber === 2 ? 'bg-cyan-500' : 'bg-amber-500'
        }`} 
      />

      {/* Header bar of the roadmap */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold px-3 py-0.5 rounded-full border bg-slate-900 border-slate-700 text-slate-300">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>خارطة الطريق التفاعلية للـ 7 أيام</span>
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border transition-all duration-500 ${currentPhase.colorClass}`}>
              المرحلة {currentPhase.phaseNumber}: {currentPhase.dayRange}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>{currentPhase.title}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentPhase.tagline}
          </p>
        </div>

        {/* Milestone status indicator */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 px-3 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
          <span className="text-slate-400 font-medium">المحطة الحالية:</span>
          <span className="font-extrabold text-emerald-400 font-mono text-sm">
            اليوم {activeStep.day} من 7
          </span>
        </div>
      </div>

      {/* Visual Roadmap Stepper Nodes with Smooth Transition Lines */}
      <div className="relative mb-8 pt-2">
        {/* Horizontal background track */}
        <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-slate-800/90 rounded-full z-0" />
        
        {/* Active progress fill line */}
        <div 
          className="absolute top-1/2 right-4 -translate-y-1/2 h-1 bg-gradient-to-l from-emerald-500 via-teal-400 to-cyan-500 rounded-full z-0 transition-all duration-500 ease-out"
          style={{ 
            width: `calc(${(activeIndex / (steps.length - 1)) * 100}% - 16px)` 
          }}
        />

        {/* Stepper Nodes */}
        <div className="relative z-10 flex items-center justify-between">
          {steps.map((step, idx) => {
            const isCurrent = step.id === activeStep.id;
            const isDone = step.completed;
            const isPast = idx < activeIndex;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onSelectStep(step.id)}
                  aria-label={`الانتقال إلى اليوم ${step.day}: ${step.title}`}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-mono font-black text-xs sm:text-sm transition-all duration-300 transform cursor-pointer relative ${
                    isCurrent
                      ? 'scale-115 ring-4 ring-emerald-500/40 bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 font-black shadow-lg glow-luxury-emerald z-20'
                      : isDone
                      ? 'bg-emerald-950 border-2 border-emerald-500 text-emerald-300 hover:scale-105'
                      : isPast
                      ? 'bg-slate-900 border border-emerald-700/60 text-emerald-400 hover:bg-slate-850'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isCurrent ? 'text-slate-950' : 'text-emerald-400'}`} />
                  ) : (
                    <span>{step.day}</span>
                  )}

                  {/* Active Pinpoint indicator */}
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
                  )}
                </button>

                {/* Day label underneath */}
                <span className={`text-[10px] sm:text-xs font-bold mt-2 transition-colors duration-300 ${
                  isCurrent ? 'text-emerald-300 font-black' : isDone ? 'text-emerald-400/80' : 'text-slate-400'
                }`}>
                  يوم {step.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Phase & Day Detailed Showcase Card (with Smooth CSS Transitions) */}
      <div 
        className="rounded-2xl p-5 sm:p-6 border transition-all duration-500 relative overflow-hidden bg-gradient-to-b from-slate-900/90 to-slate-950 border-slate-800"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            {/* Phase Tag & Status */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-black px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all duration-300 ${
                activeStep.completed 
                  ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-200'
              }`}>
                {activeStep.completed ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم إنجاز هذا اليوم بنجاح</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>مهمة اليوم قيد التنفيذ</span>
                  </>
                )}
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>الوقت التقديري: {activeStep.timeEstimate}</span>
              </div>
            </div>

            {/* Step Title & Detailed Task */}
            <h4 className="text-lg sm:text-xl font-black text-white transition-colors">
              اليوم {activeStep.day}: {activeStep.title}
            </h4>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              {activeStep.task}
            </p>

            {/* Tactical Tip */}
            <div className="bg-slate-950/90 border border-slate-800/90 p-3.5 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">نصيحة الخبراء لتخطي هذه المرحلة:</strong>{' '}
                <span>{activeStep.resourceTip}</span>
              </div>
            </div>
          </div>

          {/* Action Column: Toggle Complete & Switch Day */}
          <div className="flex flex-col gap-2.5 sm:w-56 shrink-0 pt-2 md:pt-0">
            <button
              onClick={() => onToggleStep(activeStep.id)}
              className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md ${
                activeStep.completed
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black'
              }`}
            >
              {activeStep.completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>تعليم كغير مكتمل</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>إتمام مهمة هذا اليوم</span>
                </>
              )}
            </button>

            {/* Quick Prev / Next Navigator */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="اليوم السابق"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>السابق</span>
              </button>

              <button
                onClick={handleNext}
                disabled={activeIndex === steps.length - 1}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-1 transition-colors cursor-pointer"
                title="اليوم التالي"
              >
                <span>التالي</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPlanRoadmap;
