import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  Percent, 
  Info,
  Layers,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface FutureGrowthSimulatorProps {
  baseMonthlyEarningsUSD: number;
  currencySymbol: string;
  currencyRate: number;
  streamTitle?: string;
}

export const FutureGrowthSimulator: React.FC<FutureGrowthSimulatorProps> = ({
  baseMonthlyEarningsUSD,
  currencySymbol,
  currencyRate,
  streamTitle,
}) => {
  // Monthly growth rate percentage (default 15%)
  const [growthRate, setGrowthRate] = useState<number>(15);
  const [viewMode, setViewMode] = useState<'cumulative' | 'both'>('both');

  // Convert USD to current active currency
  const toLocalCurrency = (usdVal: number) => Math.round(usdVal * currencyRate);

  const formatCurrency = (usdVal: number) => {
    return `${toLocalCurrency(usdVal).toLocaleString()} ${currencySymbol}`;
  };

  // Generate 6-Month projections
  const projectionData = useMemo(() => {
    const rateDecimal = growthRate / 100;
    const months = [
      { name: 'الشهر 1', label: 'بداية الانطلاق', num: 1 },
      { name: 'الشهر 2', label: 'بناء التقييمات', num: 2 },
      { name: 'الشهر 3', label: 'العملاء الدائمين', num: 3 },
      { name: 'الشهر 4', label: 'رفع التسعير', num: 4 },
      { name: 'الشهر 5', label: 'توسع وتكرار', num: 5 },
      { name: 'الشهر 6', label: 'استقرار العوائد', num: 6 },
    ];

    let runningTotalUSD = 0;

    return months.map((m, idx) => {
      // Monthly income compounds with growth rate as reviews & repeat clients increase
      const monthlyIncomeUSD = baseMonthlyEarningsUSD * Math.pow(1 + rateDecimal, idx);
      runningTotalUSD += monthlyIncomeUSD;

      return {
        month: m.name,
        subLabel: m.label,
        monthNum: m.num,
        monthlyUSD: Math.round(monthlyIncomeUSD),
        monthlyLocal: toLocalCurrency(monthlyIncomeUSD),
        cumulativeUSD: Math.round(runningTotalUSD),
        cumulativeLocal: toLocalCurrency(runningTotalUSD),
      };
    });
  }, [baseMonthlyEarningsUSD, growthRate, currencyRate]);

  const totalSixMonthsUSD = projectionData[5]?.cumulativeUSD || 0;
  const finalMonthUSD = projectionData[5]?.monthlyUSD || 0;
  const growthMultiplier = baseMonthlyEarningsUSD > 0 
    ? ((finalMonthUSD - baseMonthlyEarningsUSD) / baseMonthlyEarningsUSD * 100).toFixed(0) 
    : '0';

  const growthPresets = [
    { label: 'نمو واقعي (10%)', value: 10, desc: 'ساعة أو ساعتين إضافيتين شهرياً' },
    { label: 'نمو معتدل (15%)', value: 15, desc: 'افتراضي: تكرار عملاء وتوصيات' },
    { label: 'نمو متسارع (25%)', value: 25, desc: 'رفع التسعير وتقديم باقات ممتازة' },
    { label: 'نمو هجومي (35%)', value: 35, desc: 'تفرغ وتفويض بعض المهام' },
  ];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950/95 backdrop-blur-md border border-emerald-500/40 rounded-xl p-3.5 shadow-2xl text-right min-w-[200px] z-50">
          <div className="text-xs font-black text-white border-b border-slate-800 pb-1.5 mb-2 flex items-center justify-between">
            <span className="text-emerald-400 font-mono">{label}</span>
            <span className="text-[10px] text-slate-400 font-normal">{data.subLabel}</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">الدخل في هذا الشهر:</span>
              <span className="font-bold text-cyan-300 font-mono">
                {data.monthlyLocal.toLocaleString()} {currencySymbol}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-800/80">
              <span className="text-emerald-400 font-bold">الأرباح المتراكمة:</span>
              <span className="font-black text-gold-luxury font-mono text-sm">
                {data.cumulativeLocal.toLocaleString()} {currencySymbol}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10" id="future-growth-simulator">
      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 text-cyan-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-cyan-500/40 mb-2 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>محاكي النمو المستقبلي (Future Growth Simulator)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>توقع أرباحك المتراكمة خلال 6 أشهر</span>
            {streamTitle && (
              <span className="text-xs font-semibold text-slate-400 hidden md:inline">
                ({streamTitle})
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            شاهد كيف يتضاعف دخلك تلقائياً مع تراكم التقييمات الإيجابية والعملاء الدائمين
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto text-xs">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'both' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            المتراكم والشهري
          </button>
          <button
            onClick={() => setViewMode('cumulative')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              viewMode === 'cumulative' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            الأرباح المتراكمة فقط
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
        {/* Total 6-Month Cumulative Earnings */}
        <div className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-4 relative overflow-hidden glow-luxury-amber">
          <div className="text-[11px] font-bold text-amber-300 flex items-center justify-between mb-1.5">
            <span>إجمالي الأرباح المتراكمة (6 أشهر)</span>
            <Award className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gold-luxury font-mono tracking-tight">
            {formatCurrency(totalSixMonthsUSD)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            مجموع ما ستحققه بحلول نهاية الشهر السادس
          </div>
        </div>

        {/* Month 6 Expected Monthly Run Rate */}
        <div className="bg-slate-950/90 border border-emerald-500/30 rounded-2xl p-4 relative overflow-hidden glow-luxury-emerald">
          <div className="text-[11px] font-bold text-emerald-300 flex items-center justify-between mb-1.5">
            <span>الدخل المتوقع في الشهر السادس</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
            {formatCurrency(finalMonthUSD)}
            <span className="text-xs font-bold text-slate-400 mr-1.5">/شهرياً</span>
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-1 font-semibold flex items-center gap-1">
            <span>+{growthMultiplier}% زيادة في الدخل الشهري</span>
          </div>
        </div>

        {/* Compound Growth Rate Metric */}
        <div className="bg-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 relative overflow-hidden glow-luxury-sapphire">
          <div className="text-[11px] font-bold text-cyan-300 flex items-center justify-between mb-1.5">
            <span>معدل النمو الشهري المطبق</span>
            <Percent className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">
            +{growthRate}%
            <span className="text-xs font-bold text-slate-400 mr-1.5">شهرياً</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            مبني على زيادة قاعدة العملاء والتقييمات
          </div>
        </div>
      </div>

      {/* Interactive Growth Rate Presets & Slider */}
      <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>حدد معدل النمو الشهري الافتراضي:</span>
          </label>
          <span className="text-xs font-extrabold text-cyan-400 font-mono bg-cyan-950/80 px-2.5 py-0.5 rounded-md border border-cyan-500/30">
            {growthRate}% نمو شهري مركب
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
          {growthPresets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => setGrowthRate(preset.value)}
              className={`p-2.5 rounded-xl text-right border transition-all cursor-pointer ${
                growthRate === preset.value
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-extrabold text-white">{preset.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 leading-snug">{preset.desc}</div>
            </button>
          ))}
        </div>

        <input
          type="range"
          min={5}
          max={40}
          step={1}
          value={growthRate}
          onChange={(e) => setGrowthRate(Number(e.target.value))}
          className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>5% (نمو بطيء وحذر)</span>
          <span>15% (افتراضي مجرب)</span>
          <span>40% (توسع قياسي)</span>
        </div>
      </div>

      {/* Recharts Interactive Projection Chart */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-6 relative">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-gradient-to-r from-amber-400 to-yellow-500 inline-block shadow-xs" />
              <span className="font-bold text-slate-300">الأرباح المتراكمة الإجمالية</span>
            </div>
            {viewMode === 'both' && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block shadow-xs" />
                <span className="font-bold text-slate-300">الدخل الشهري الفردي</span>
              </div>
            )}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            مرر المؤشر فوق أي شهر لرؤية تفاصيل الأرقام
          </span>
        </div>

        {/* Chart Container */}
        <div className="w-full h-72 sm:h-80 dir-ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={projectionData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                {/* Gold Gradient for Cumulative Earnings */}
                <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                {/* Cyan Gradient for Monthly Earnings */}
                <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              
              <XAxis 
                dataKey="month" 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
              />

              <YAxis 
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false}
                axisLine={{ stroke: '#334155' }}
                tickFormatter={(val) => {
                  if (val >= 1000) {
                    return `${(val / 1000).toFixed(1)}k`;
                  }
                  return val;
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Cumulative Profits Area */}
              <Area
                type="monotone"
                dataKey="cumulativeLocal"
                name="الأرباح المتراكمة"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCumulative)"
                activeDot={{ r: 6, stroke: '#fef08a', strokeWidth: 2, fill: '#f59e0b' }}
              />

              {/* Individual Monthly Income Area */}
              {viewMode === 'both' && (
                <Area
                  type="monotone"
                  dataKey="monthlyLocal"
                  name="الدخل الشهري"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorMonthly)"
                  activeDot={{ r: 5, stroke: '#a5f3fc', strokeWidth: 2, fill: '#06b6d4' }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Six Months Milestones Breakdown Footer */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-800/80 text-center">
          {projectionData.map((d, i) => (
            <div key={i} className="bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
              <div className="text-[10px] text-slate-400 font-medium">{d.month}</div>
              <div className="text-xs font-bold text-amber-300 font-mono mt-0.5">
                {d.cumulativeLocal.toLocaleString()} {currencySymbol}
              </div>
              <div className="text-[9px] text-cyan-400/80 font-mono mt-0.5">
                +{d.monthlyLocal.toLocaleString()} {currencySymbol}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Strategy Advice */}
      <div className="mt-4 bg-slate-900/70 border border-slate-800 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-slate-300">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-cyan-300">سر تحقيق هذا المنحنى المتصاعد:</strong>{' '}
          لا تعتمد على العملاء الجدد فقط؛ كل عميل تقدم له جودة عالية يتحول لعميل شهري مستمر يضمن لك دخلاً ثابتاً، مما يسمح لك برفع تسعير ساعتك تدريجياً كل شهرين.
        </div>
      </div>
    </div>
  );
};

export default FutureGrowthSimulator;
