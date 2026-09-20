import React from 'react';
import { Search, Filter, X, Zap, DollarSign, Clock, Shield, Sparkles } from 'lucide-react';
import { FilterState } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SearchAndFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResultsCount,
}) => {
  const { t, isRTL, language } = useLanguage();
  const isEn = language === 'en';

  const hasActiveFilters = 
    filters.searchQuery !== '' || 
    filters.selectedCategory !== 'all' || 
    filters.selectedSpeed !== 'all' || 
    filters.selectedCapital !== 'all' || 
    filters.selectedDifficulty !== 'all';

  const categories = isEn ? [
    { id: 'all', label: 'All Verified Streams' },
    { id: 'micro-services', label: 'Micro-tasks & Instant Payout' },
    { id: 'digital-skills', label: 'High-Income Digital Skills' },
    { id: 'content-monetization', label: 'Content Creation & Digital Assets' },
    { id: 'fast-execution', label: 'Affiliate Marketing & Brokerage' },
  ] : [
    { id: 'all', label: 'جميع المسارات الموثوقة' },
    { id: 'micro-services', label: 'مهام مصغرة ودفع فوري' },
    { id: 'digital-skills', label: 'مهارات رقمية عالية الدخل' },
    { id: 'content-monetization', label: 'صناعة محتوى وأصول رقمية' },
    { id: 'fast-execution', label: 'تسويق بالعمولة ووساطة' },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-xl p-4 sm:p-6 mb-8">
      {/* Search Input Bar */}
      <div className="relative mb-5">
        <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3.5' : 'left-0 pl-3.5'} flex items-center pointer-events-none text-slate-400`}>
          <Search className="w-5 h-5 text-emerald-400" />
        </div>
        <input
          id="search-streams-input"
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
          placeholder={t.searchPlaceholder}
          className={`w-full bg-slate-950 border border-slate-700/80 focus:border-emerald-500 focus:bg-slate-950 rounded-xl ${isRTL ? 'pr-11 pl-10' : 'pl-11 pr-10'} py-3 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium transition-all`}
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFilterChange({ searchQuery: '' })}
            className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center text-slate-400 hover:text-white cursor-pointer`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Trending Global Keywords Bar with Multi-Color accents */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none text-xs">
        <span className="text-[11px] font-black text-amber-300 shrink-0 flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{isEn ? 'Keywords:' : 'كلمات مفتاحية مطلوبة:'}</span>
        </span>
        {[
          { label: isEn ? 'AI Workflows' : 'ذكاء اصطناعي', query: 'ai', color: 'hover:border-purple-400 hover:text-purple-300 hover:bg-purple-950/40 border-purple-500/20 text-purple-200/80' },
          { label: isEn ? 'Canva Design' : 'كانفا', query: 'canva', color: 'hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 border-cyan-500/20 text-cyan-200/80' },
          { label: isEn ? 'Transcription' : 'تفريغ', query: 'audio', color: 'hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border-emerald-500/20 text-emerald-200/80' },
          { label: isEn ? 'Digital Products' : 'منتجات رقمية', query: 'digital', color: 'hover:border-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border-amber-500/20 text-amber-200/80' },
          { label: isEn ? 'Affiliate Marketing' : 'تسويق بالعمولة', query: 'affiliate', color: 'hover:border-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border-rose-500/20 text-rose-200/80' },
          { label: isEn ? 'Faceless YouTube' : 'يوتيوب بدون ظهور', query: 'youtube', color: 'hover:border-red-400 hover:text-red-300 hover:bg-red-950/40 border-red-500/20 text-red-200/80' },
          { label: isEn ? '$0 Capital' : 'رأس مال 0$', query: 'zero', color: 'hover:border-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 border-emerald-500/20 text-emerald-200/80' },
          { label: isEn ? 'Copywriting' : 'كتابة إعلانات', query: 'copywriting', color: 'hover:border-orange-400 hover:text-orange-300 hover:bg-orange-950/40 border-orange-500/20 text-orange-200/80' }
        ].map((tag) => (
          <button
            key={tag.query}
            onClick={() => onFilterChange({ searchQuery: tag.query })}
            className={`shrink-0 bg-slate-950/90 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${tag.color}`}
          >
            #{tag.label}
          </button>
        ))}
      </div>

      {/* Category Tabs with Distinct Color Profiles */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm font-semibold mb-5">
        {categories.map((tab) => {
          const isSelected = filters.selectedCategory === tab.id;
          let activeClasses = 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30 font-bold';
          let borderAccent = 'hover:border-slate-700';

          if (tab.id === 'micro-services') {
            activeClasses = 'bg-cyan-600 text-white shadow-md shadow-cyan-700/40 font-bold';
            borderAccent = 'hover:border-cyan-500/40 hover:text-cyan-300';
          } else if (tab.id === 'digital-skills') {
            activeClasses = 'bg-purple-600 text-white shadow-md shadow-purple-700/40 font-bold';
            borderAccent = 'hover:border-purple-500/40 hover:text-purple-300';
          } else if (tab.id === 'content-monetization') {
            activeClasses = 'bg-amber-600 text-white shadow-md shadow-amber-700/40 font-bold';
            borderAccent = 'hover:border-amber-500/40 hover:text-amber-300';
          } else if (tab.id === 'fast-execution') {
            activeClasses = 'bg-emerald-600 text-white shadow-md shadow-emerald-700/40 font-bold';
            borderAccent = 'hover:border-emerald-500/40 hover:text-emerald-300';
          } else if (tab.id === 'all') {
            activeClasses = 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-md shadow-teal-700/30 font-bold';
          }

          return (
            <button
              key={tab.id}
              onClick={() => onFilterChange({ selectedCategory: tab.id })}
              className={`whitespace-nowrap px-3.5 py-2 rounded-xl transition-all cursor-pointer border ${
                isSelected
                  ? `${activeClasses} border-transparent`
                  : `bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white border-slate-800 ${borderAccent}`
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Dropdown Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
        {/* Payout Speed Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEn ? 'Payout Speed:' : 'سرعة استلام الأرباح:'}</span>
          </label>
          <select
            id="filter-speed-select"
            value={filters.selectedSpeed}
            onChange={(e) => onFilterChange({ selectedSpeed: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">{isEn ? 'All Speeds' : 'كل سرعات الدفع'}</option>
            <option value="instant">{isEn ? 'Instant (24-48h)' : 'فوري (24-48 ساعة)'}</option>
            <option value="fast">{isEn ? 'Fast (Weekly)' : 'سريع (أسبوعي)'}</option>
            <option value="medium">{isEn ? 'Medium (Monthly)' : 'متوسط (خلال شهر)'}</option>
            <option value="compounding">{isEn ? 'Compounding Long-Term' : 'تراكمي طويل الأجل'}</option>
          </select>
        </div>

        {/* Capital Required Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEn ? 'Starting Capital:' : 'رأس المال المبدئي:'}</span>
          </label>
          <select
            id="filter-capital-select"
            value={filters.selectedCapital}
            onChange={(e) => onFilterChange({ selectedCapital: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">{isEn ? 'All Capital Levels' : 'كل الخيارات المالية'}</option>
            <option value="zero">{isEn ? '$0 (100% Free - No Capital)' : '0$ (مجاني 100% بدون رأس مال)'}</option>
            <option value="low">{isEn ? 'Under $50 (Optional tools)' : 'أقل من 50$ (أدوات إضافية)'}</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isEn ? 'Difficulty Level:' : 'مستوى الصعوبة:'}</span>
          </label>
          <select
            id="filter-difficulty-select"
            value={filters.selectedDifficulty}
            onChange={(e) => onFilterChange({ selectedDifficulty: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">{isEn ? 'All Levels' : 'جميع المستويات'}</option>
            <option value="beginner">{isEn ? 'Beginner (Zero experience)' : 'مبتدئ تماماً (بدون خبرة)'}</option>
            <option value="intermediate">{isEn ? 'Intermediate (Needs practice)' : 'متوسط (يحتاج تدريب)'}</option>
            <option value="advanced">{isEn ? 'Advanced (Specialized)' : 'متقدم (تخصص مهني)'}</option>
          </select>
        </div>
      </div>

      {/* Results Bar & Active Reset */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 text-xs font-medium text-slate-400">
        <div>
          {isEn ? (
            <span>Found <strong className="text-emerald-400 font-bold">{totalResultsCount}</strong> verified actionable streams</span>
          ) : (
            <span>تم العثور على <strong className="text-emerald-400 font-bold">{totalResultsCount}</strong> مساراً واقعياً ومجرباً</span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t.clearFilters}</span>
          </button>
        )}
      </div>
    </div>
  );
};
