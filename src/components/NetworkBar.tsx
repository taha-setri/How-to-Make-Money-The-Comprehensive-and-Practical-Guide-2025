import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ExternalLink, 
  Puzzle, 
  Sparkles, 
  ChevronDown, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface NetworkSite {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  url: string;
  type: 'previous' | 'current' | 'partner';
  badgeAr: string;
  badgeEn: string;
  categoryAr: string;
  categoryEn: string;
}

export const NETWORK_SITES: NetworkSite[] = [
  {
    id: 'fast-jigsaw-puzzle',
    nameAr: 'Fast Jigsaw Puzzle | لعبة ألغاز الصور التركيبية السريعة',
    nameEn: 'Fast Jigsaw Puzzle - Interactive Brain Challenge',
    descAr: 'لعبة تركيب صور تفاعلية سريعة وممتعة بتحديات متعددة المستويات وتصميم خفيف وسلس.',
    descEn: 'Fast-paced, responsive jigsaw puzzle game with multiple difficulty levels and brain-boosting challenges.',
    url: 'https://fast-jigsaw-puzzle.vercel.app/',
    type: 'previous',
    badgeAr: 'الموقع السابق',
    badgeEn: 'Previous Site',
    categoryAr: 'ألعاب وترفيه ذكي',
    categoryEn: 'Games & Entertainment',
  },
  {
    id: 'money-path',
    nameAr: 'MoneyPath | مسار المال - دليل كسب المال 2026',
    nameEn: 'MoneyPath - 2026 Practical Online Income Blueprint',
    descAr: 'دليل عملي واقعي وموثوق لشرح مسارات الدخل الرقمي والعمل الحر بدون رأس مال وبأدوات الذكاء الاصطناعي.',
    descEn: 'Comprehensive, verified guide and calculator for legitimate online income streams, AI workflows, and freelancing.',
    url: '#',
    type: 'current',
    badgeAr: 'الموقع الحالي (نشط)',
    badgeEn: 'Current Site (Active)',
    categoryAr: 'مال وأعمال ودخل رقمي',
    categoryEn: 'Finance & Digital Business',
  }
];

export const NetworkBar: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const isAr = language === 'ar';

  const previousSite = NETWORK_SITES.find(s => s.type === 'previous')!;

  return (
    <div 
      id="network-bar"
      className="bg-slate-950 border-b border-emerald-500/20 text-slate-300 text-xs relative z-50 select-none shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        
        {/* Left / Start: Network Brand & Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Network Hub Badge */}
          <div className="flex items-center gap-1.5 bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold text-[11px]">
            <Globe className="w-3 h-3 animate-spin [animation-duration:12s]" />
            <span className="tracking-wide">
              {isAr ? 'شريط الشبكة' : 'Network Bar'}
            </span>
          </div>

          <span className="hidden md:inline text-slate-600">|</span>

          {/* Current site mini indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {isAr ? 'الموقع الحالي: ' : 'Current: '}
              <strong className="text-emerald-300 font-semibold">
                {isAr ? 'مسار المال (MoneyPath)' : 'MoneyPath'}
              </strong>
            </span>
          </div>

          {/* Network Dropdown Toggle */}
          <div className="relative">
            <button
              id="network-sites-dropdown-btn"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-300 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/30 px-2 py-0.5 rounded-md transition-all cursor-pointer"
              title={isAr ? 'عرض جميع مواقع الشبكة' : 'Browse Network Sites'}
            >
              <Layers className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline font-medium">
                {isAr ? 'مواقع الشبكة (2)' : 'Network Sites (2)'}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute top-full mt-1.5 ${isRTL ? 'right-0' : 'left-0'} w-80 sm:w-96 bg-slate-900/98 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl p-3 z-50 text-slate-200`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                        <Globe className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{isAr ? 'شبكة المواقع والتطبيقات' : 'Sites & Apps Network'}</span>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                        {isAr ? '2 موقع' : '2 Sites'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Previous Site Card in Dropdown */}
                      <a
                        href={previousSite.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block p-2.5 rounded-lg bg-slate-950/80 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="p-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <Puzzle className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                              {isAr ? 'Fast Jigsaw Puzzle' : 'Fast Jigsaw Puzzle'}
                            </span>
                          </div>
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                            {isAr ? previousSite.badgeAr : previousSite.badgeEn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                          {isAr ? previousSite.descAr : previousSite.descEn}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[11px] text-emerald-400 font-semibold pt-1 border-t border-slate-800/60">
                          <span className="text-[10px] text-slate-500 font-mono">
                            fast-jigsaw-puzzle.vercel.app
                          </span>
                          <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <span>{isAr ? 'الانتقال للعبة' : 'Open Game'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </a>

                      {/* Current Site Card in Dropdown */}
                      <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="p-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              <Sparkles className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-xs font-bold text-white">
                              {isAr ? 'MoneyPath | مسار المال' : 'MoneyPath'}
                            </span>
                          </div>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1 whitespace-nowrap">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {isAr ? 'أنت هنا' : 'You are here'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {isAr ? 'الدليل العملي لربح المال من الإنترنت والعمل الحر وحاسبة الأرباح.' : 'Interactive online income calculator and verified 2026 financial roadmap.'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>


        {/* Right / End: Direct Call-to-Action to the Previous Site */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            {isAr ? 'الموقع السابق للشبكة:' : 'Previous Network Site:'}
          </span>

          <a
            id="network-bar-previous-site-link"
            href={previousSite.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-teal-500/15 hover:from-amber-500/25 hover:to-teal-500/25 border border-amber-500/30 hover:border-amber-400/50 text-amber-200 hover:text-white font-bold text-[11px] sm:text-xs transition-all shadow-sm group cursor-pointer"
            title={`${isAr ? 'الانتقال إلى الموقع السابق:' : 'Navigate to Previous Site:'} Fast Jigsaw Puzzle`}
          >
            <Puzzle className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="font-semibold">
              {isAr ? 'الانتقال للموقع السابق (Fast Jigsaw Puzzle)' : 'Visit Previous Site (Fast Jigsaw Puzzle)'}
            </span>
            <ExternalLink className="w-3 h-3 text-amber-300 group-hover:scale-110 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
};
