import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Award, 
  Info, 
  CheckCircle2,
  HelpCircle,
  Zap,
  Sparkles,
  Calendar,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { INCOME_STREAMS } from '../data/incomeStreams';
import { IncomeStream } from '../types';
import { FutureGrowthSimulator } from './FutureGrowthSimulator';

interface IncomeCalculatorProps {
  onCalculate?: () => void;
  streams?: IncomeStream[];
}

export const IncomeCalculator: React.FC<IncomeCalculatorProps> = ({ onCalculate, streams }) => {
  const availableStreams = streams && streams.length > 0 ? streams : INCOME_STREAMS;
  const [hoursPerDay, setHoursPerDay] = useState<number>(3);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [selectedStreamId, setSelectedStreamId] = useState<string>(availableStreams[0]?.id || INCOME_STREAMS[0].id);
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [currency, setCurrency] = useState<'USD' | 'SAR' | 'AED' | 'EGP'>('USD');

  const activeStream = availableStreams.find(s => s.id === selectedStreamId) || availableStreams[0];

  const experienceMultipliers = {
    beginner: 0.85,
    intermediate: 1.15,
    expert: 1.65,
  };

  const currencyRates = {
    USD: { rate: 1, symbol: '$', name: 'دولار أمريكي' },
    SAR: { rate: 3.75, symbol: 'ر.س', name: 'ريال سعودي' },
    AED: { rate: 3.67, symbol: 'د.إ', name: 'درهم إماراتي' },
    EGP: { rate: 49.5, symbol: 'ج.م', name: 'جنيه مصري' },
  };

  const baseRate = activeStream.baseHourlyRate * experienceMultipliers[experienceLevel];
  const dailyEarningsUSD = baseRate * hoursPerDay;
  const weeklyEarningsUSD = dailyEarningsUSD * daysPerWeek;
  const monthlyEarningsUSD = weeklyEarningsUSD * 4.2;

  const currentRate = currencyRates[currency].rate;
  const currentSymbol = currencyRates[currency].symbol;

  const formatMoney = (amountUSD: number) => {
    const val = Math.round(amountUSD * currentRate);
    return `${val.toLocaleString()} ${currentSymbol}`;
  };

  // Quick preset hour tiers requested by user
  const hourPillPresets = [
    { label: '1 - 2 ساعة', value: 2, sub: 'دخل إضافي سريع' },
    { label: '3 - 4 ساعات', value: 4, sub: 'نصف دوام مرن' },
    { label: '5+ ساعات', value: 6, sub: 'تفرغ كامل ومضاعفة' },
  ];

  return (
    <div id="income-calculator" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-16 scroll-mt-24">
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/90 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-500/30 glow-luxury-emerald relative overflow-hidden">
        
        {/* Continuous Looping Ambient Luxury Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-amber-400/10 rounded-full blur-3xl pointer-events-none" 
        />

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3.5">
            <motion.div 
              animate={{ rotate: [0, 5, -5, 0], y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-950 to-slate-900 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-lg glow-luxury-emerald"
            >
              <Calculator className="w-6 h-6" />
            </motion.div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-950/90 text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-500/40 mb-1.5 shadow-sm">
                <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>حاسبة الأرباح التفاعلية الملكية (Realistic Estimator)</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black">
                <span className="text-luxury-gradient">احسب دخلك المتوقع</span> بدقة واقعية 100%
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                حساب مبني على أسعار السوق الحقيقية للمنصات المعتمدة وعدد ساعات التزامك
              </p>
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(Object.keys(currencyRates) as (keyof typeof currencyRates)[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currency === cur
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 relative z-10">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Select Skill Track */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                اختر مسار العمل والمهارة التي ترغب في تطبيقها:
              </label>
              <select
                value={selectedStreamId}
                onChange={(e) => {
                  setSelectedStreamId(e.target.value);
                  if (onCalculate) onCalculate();
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold text-white focus:outline-hidden focus:border-emerald-500 cursor-pointer"
              >
                {availableStreams.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.categoryLabel})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Preset Hour Pills */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  عدد ساعات العمل المتاحة يومياً:
                </span>
                <span className="text-emerald-400 font-extrabold font-mono text-sm">
                  {hoursPerDay} {hoursPerDay === 1 ? 'ساعة' : 'ساعات'}
                </span>
              </div>

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {hourPillPresets.map((preset) => (
                  <motion.button
                    key={preset.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setHoursPerDay(preset.value);
                      if (onCalculate) onCalculate();
                    }}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                      hoursPerDay === preset.value
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-white">{preset.label}</div>
                    <div className="text-[10px] text-slate-400">{preset.sub}</div>
                  </motion.button>
                ))}
              </div>

              {/* Interactive Smooth Slider */}
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={hoursPerDay}
                onChange={(e) => {
                  setHoursPerDay(Number(e.target.value));
                  if (onCalculate) onCalculate();
                }}
                className="w-full accent-emerald-500 h-2.5 bg-slate-800 rounded-lg cursor-pointer mt-1"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>ساعة واحدة</span>
                <span>4 ساعات</span>
                <span>8 ساعات (تفرغ)</span>
              </div>
            </div>

            {/* 3. Days per week */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  أيام العمل الملتزم بها أسبوعياً:
                </span>
                <span className="text-emerald-400 font-bold">{daysPerWeek} أيام</span>
              </div>
              <div className="flex items-center gap-2">
                {[3, 4, 5, 6].map((days) => (
                  <motion.button
                    key={days}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setDaysPerWeek(days);
                      if (onCalculate) onCalculate();
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      daysPerWeek === days 
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-md' 
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {days} أيام
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 4. Experience Level */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                مستوى جاهزيتك وخبرتك الحالية:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'beginner', label: 'مبتدئ جديد', note: 'أول 1-3 أشهر' },
                  { id: 'intermediate', label: 'متوسط', note: 'لديك نماذج أعمال' },
                  { id: 'expert', label: 'محترف', note: 'تقييمات سابقة' },
                ].map((lvl) => (
                  <motion.button
                    key={lvl.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setExperienceLevel(lvl.id as any);
                      if (onCalculate) onCalculate();
                    }}
                    className={`p-2.5 rounded-xl text-right border transition-all cursor-pointer ${
                      experienceLevel === lvl.id 
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <div className="text-xs font-bold">{lvl.label}</div>
                    <div className="text-[10px] text-slate-400">{lvl.note}</div>
                  </motion.button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Projection Card with Repeating Subtle Breathing Glow */}
          <motion.div 
            animate={{ 
              boxShadow: [
                '0 0 15px rgba(16,185,129,0.1)', 
                '0 0 35px rgba(16,185,129,0.3)', 
                '0 0 15px rgba(16,185,129,0.1)'
              ] 
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="lg:col-span-5 flex flex-col justify-between bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-6 relative overflow-hidden shadow-xl"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  الدخل الشهري المتوقع
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  واقعي ومجرب 100%
                </span>
              </div>

              {/* Big Monthly Number with Luxury Animation */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 text-center relative overflow-hidden glow-luxury-gold">
                <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent skew-x-12 pointer-events-none animate-luxury-sheen" />
                <motion.div 
                  key={`${monthlyEarningsUSD}-${currency}`}
                  initial={{ scale: 0.9, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-3xl sm:text-4xl font-black text-gold-luxury tracking-tight font-mono relative z-10"
                >
                  {formatMoney(monthlyEarningsUSD)}
                </motion.div>
                <div className="text-xs text-slate-400 mt-1.5 font-medium relative z-10">
                  شهرياً (بمعدل {hoursPerDay * daysPerWeek * 4} ساعة عمل شهرياً)
                </div>
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 mb-1">المعدل اليومي:</div>
                  <motion.div 
                    key={`daily-${dailyEarningsUSD}`}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-white text-sm font-mono"
                  >
                    {formatMoney(dailyEarningsUSD)}
                  </motion.div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 mb-1">المعدل الأسبوعي:</div>
                  <motion.div 
                    key={`weekly-${weeklyEarningsUSD}`}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-white text-sm font-mono"
                  >
                    {formatMoney(weeklyEarningsUSD)}
                  </motion.div>
                </div>
              </div>

              {/* Milestone Target info */}
              <div className="text-xs text-slate-300 bg-emerald-950/60 border border-emerald-800/60 p-3.5 rounded-xl leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300 block mb-0.5">شروط تحقيق هذا الدخل:</strong>
                  الالتزام بساعات العمل، إتقان نموذج تقديم مقنع، والرد السريع على أول 5 عملاء.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-center">
              <motion.a
                href="#live-gigs-feed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all shadow-md"
              >
                <span>شاهد الطلبات الحية المتاحة الآن</span>
                <TrendingUp className="w-4 h-4" />
              </motion.a>
              <a
                href="#prompt-templates-vault"
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-emerald-300 transition-colors py-1"
              >
                <span>أو تصفح قوالب المراسلة الجاهزة للنسخ</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Future Growth Simulator Component with 6-Month Projections & Recharts */}
        <FutureGrowthSimulator
          baseMonthlyEarningsUSD={monthlyEarningsUSD}
          currencySymbol={currentSymbol}
          currencyRate={currentRate}
          streamTitle={activeStream?.title}
        />

      </div>
    </div>
  );
};
