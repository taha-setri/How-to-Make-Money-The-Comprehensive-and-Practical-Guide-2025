import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  GraduationCap, 
  Lock, 
  Clock, 
  ExternalLink,
  MessageCircleQuestion
} from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import { FAQItem } from '../types';

interface SmartFAQAccordionProps {
  faqs?: FAQItem[];
}

export const SmartFAQAccordion: React.FC<SmartFAQAccordionProps> = ({ faqs }) => {
  const availableFaqs = faqs && faqs.length > 0 ? faqs : FAQ_DATA;
  const [openIds, setOpenIds] = useState<string[]>(['faq-capital', 'faq-payments-arab-countries']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', label: 'كافة الأسئلة الشائعة', icon: HelpCircle },
    { id: 'payments', label: 'طرق استلام الأرباح بالدول العربية', icon: CreditCard },
    { id: 'capital', label: 'رأس المال ومتطلبات البداية', icon: Sparkles },
    { id: 'beginners', label: 'المبتدئون والطلاب واللغة', icon: GraduationCap },
    { id: 'security', label: 'الأمان وتفادي النصب', icon: ShieldCheck },
  ];

  const filteredFaqs = useMemo(() => {
    return availableFaqs.filter(faq => {
      const matchCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const matchSearch = searchQuery.trim() === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery, availableFaqs]);

  return (
    <section id="smart-faq-section" className="my-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-black mb-3">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-amber-400" />
            <span>إجابات صريحة وموثوقة (Smart FAQ Hub)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            الأسئلة الأكثر شيوعاً حول كيفية الحصول على المال من الإنترنت
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            إجابات عملية وشاملة تدحض الخرافات وتوضح طرق استلام الأرباح في مصر والخليج ودول المغرب العربي بأدق التفاصيل.
          </p>
        </div>

        {/* Search & Filter Hub */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-8 shadow-xl">
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن سؤالك هنا: (مثلاً: بايبال، بدون رأس مال، بالهاتف، مصر، النصب...)"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                مسح
              </button>
            )}
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs sm:text-sm">
              لم نعثر على نتائج مطابقة لبحثك "{searchQuery}". جرب البحث بكلمات أخرى مثل "بايبال" أو "رأس مال".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  className={`bg-slate-900/90 border transition-all rounded-2xl overflow-hidden ${
                    isOpen 
                      ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/20' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 transition-colors group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black transition-colors ${
                        isOpen 
                          ? 'bg-emerald-500 text-slate-950' 
                          : 'bg-slate-800 text-slate-400 group-hover:text-white'
                      }`}>
                        ؟
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-400 bg-emerald-950' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Body Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-slate-800/80 mt-1">
                      <div className="pt-4 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                        <div className="whitespace-pre-line">
                          {faq.answer}
                        </div>

                        {/* Tag Pill */}
                        <div className="flex items-center gap-2 pt-3">
                          <span className="text-[11px] font-bold text-slate-400">التصنيف:</span>
                          <span className="bg-slate-800 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded">
                            {faq.categoryLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-8 bg-gradient-to-r from-slate-900 to-emerald-950 border border-emerald-500/30 rounded-2xl p-5 text-center sm:text-right flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">هل لديك استفسار آخر لم نذكره؟</h4>
              <p className="text-xs text-slate-400">راجع دليل الأمان أو ابدأ فوراً مع حاسبة الدخل التفاعلية في الأعلى.</p>
            </div>
          </div>

          <a
            href="#income-calculator"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs py-2 px-4 rounded-xl transition-all whitespace-nowrap"
          >
            جرب حاسبة الأرباح التفاعلية
          </a>
        </div>

      </div>
    </section>
  );
};
