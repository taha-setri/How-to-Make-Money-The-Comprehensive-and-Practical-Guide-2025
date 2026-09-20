import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LiveGigsTicker } from './components/LiveGigsTicker';
import { QuickPathSelector } from './components/QuickPathSelector';
import { IncomeCalculator } from './components/IncomeCalculator';
import { SearchAndFilter } from './components/SearchAndFilter';
import { IncomeStreamsGrid } from './components/IncomeStreamsGrid';
import { PromptTemplateVault } from './components/PromptTemplateVault';
import { AdSensePlacement } from './components/AdSensePlacement';
import { MasterFinancialGuide } from './components/MasterFinancialGuide';
import { ActionPlan7Days } from './components/ActionPlan7Days';
import { SmartFAQAccordion } from './components/SmartFAQAccordion';
import { SecurityPrivacyNotice } from './components/SecurityPrivacyNotice';
import { ABTestingPanel } from './components/ABTestingPanel';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { NotificationManager } from './components/NotificationManager';
import { NotificationToast } from './components/NotificationToast';
import { PWAInstallButton, OfflineIndicator } from './components/PWAInstallButton';
import { LegalPolicyModal, PolicyTab } from './components/LegalPolicyModal';
import { Footer } from './components/Footer';
import { AmbientParticles } from './components/AmbientParticles';
import { ScrollReveal } from './components/ScrollReveal';

import { ContentProvider, useCmsContent } from './context/ContentContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { syncDocumentSeo } from './data/seoKeywords';
import { AB_TEST_VARIANTS } from './data/incomeStreams';
import { FilterState, IncomeStream, ABTestVariant } from './types';
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Flame,
  Zap,
  TrendingUp,
  FileText,
  HelpCircle,
  Calculator,
  Radio
} from 'lucide-react';

function LandingPageContent() {
  const { content, dataSource, isSyncing } = useCmsContent();
  const { t, isRTL, language } = useLanguage();
  const { currentThemeId, currentTheme } = useTheme();
  const isEn = language === 'en';

  // A/B Testing state
  const [currentVariantId, setCurrentVariantId] = useState<'variantA' | 'variantB' | 'variantC'>('variantA');
  const activeVariant: ABTestVariant = useMemo(() => {
    return AB_TEST_VARIANTS.find(v => v.id === currentVariantId) || AB_TEST_VARIANTS[0];
  }, [currentVariantId]);

  // Filtering & Search state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'all',
    selectedSpeed: 'all',
    selectedCapital: 'all',
    selectedDifficulty: 'all',
  });

  // Modal dialog states
  const [isABModalOpen, setIsABModalOpen] = useState<boolean>(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false);
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyTab>('privacy');

  // Notification & Engagement state
  const [hasNotificationsEnabled, setHasNotificationsEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('push_notifications_enabled') === 'true';
    } catch {
      return false;
    }
  });
  const [activeToast, setActiveToast] = useState<{ title: string; body: string } | null>(null);

  // Live session telemetry & analytics
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [maxScrollDepth, setMaxScrollDepth] = useState<number>(0);
  const [calculatorUsed, setCalculatorUsed] = useState<boolean>(false);
  const [pathCompleted, setPathCompleted] = useState<boolean>(false);
  const [adClicksCount, setAdClicksCount] = useState<number>(0);

  // Timer for session duration
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync Modern Global Keywords, Page Title & Schema with current language
  useEffect(() => {
    syncDocumentSeo(language);
  }, [language]);

  // Scroll depth tracker for engagement analytics
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(100, Math.round((scrollY / docHeight) * 100));
        setMaxScrollDepth(prev => Math.max(prev, pct));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter logic dynamic from decoupled content store
  const filteredStreams = useMemo(() => {
    const streamsList = content?.incomeStreams || [];
    return streamsList.filter(stream => {
      // Search term query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.trim().toLowerCase();
        const inTitle = stream.title.toLowerCase().includes(q);
        const inDesc = stream.description.toLowerCase().includes(q);
        const inCategory = stream.categoryLabel.toLowerCase().includes(q);
        const inHighlights = stream.highlights.some(h => h.toLowerCase().includes(q));
        const inSteps = stream.actionSteps.some(s => s.toLowerCase().includes(q));
        const inPlatforms = stream.recommendedPlatforms.some(p => p.name.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inCategory && !inHighlights && !inSteps && !inPlatforms) {
          return false;
        }
      }

      // Category tab
      if (filters.selectedCategory !== 'all' && stream.category !== filters.selectedCategory) {
        return false;
      }

      // Payout speed
      if (filters.selectedSpeed !== 'all' && stream.speedLevel !== filters.selectedSpeed) {
        return false;
      }

      // Initial capital
      if (filters.selectedCapital !== 'all' && stream.capitalLevel !== filters.selectedCapital) {
        return false;
      }

      // Difficulty
      if (filters.selectedDifficulty !== 'all' && stream.difficultyLevel !== filters.selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [filters, content.incomeStreams]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: 'all',
      selectedSpeed: 'all',
      selectedCapital: 'all',
      selectedDifficulty: 'all',
    });
  };

  const handleQuickSearchJump = (term: string) => {
    setFilters(prev => ({ ...prev, searchQuery: term }));
    const elem = document.getElementById('income-streams');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectStreamForPlan = (stream: IncomeStream) => {
    const elem = document.getElementById('blueprint-7days');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveToast({
      title: `تم اعتماد: ${stream.title}`,
      body: 'انتقل لأسفل لتطبيق خطة الـ 7 أيام للبدء الفعلي واستلام أول أرباح.'
    });
  };

  const handleToggleNotifications = (enabled: boolean) => {
    setHasNotificationsEnabled(enabled);
    try {
      localStorage.setItem('push_notifications_enabled', String(enabled));
    } catch {
      // ignore
    }
  };

  const handleTriggerSimulatedPush = (title: string, body: string) => {
    setActiveToast({ title, body });
  };

  // Compute completed tasks in 7-day checklist from localStorage
  const tasksCompletedCount = useMemo(() => {
    try {
      const saved = localStorage.getItem('user_7day_blueprint');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.filter((i: any) => i.completed).length;
      }
    } catch {
      // fallback
    }
    return 2; // initial default completed
  }, []);

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${isRTL ? "font-['Cairo',sans-serif]" : "font-sans"} selection:bg-emerald-500 selection:text-slate-950`}
    >
      {/* Navigation Header */}
      <Header
        currentVariant={activeVariant}
        onOpenABModal={() => setIsABModalOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        onOpenNotificationModal={() => setIsNotificationModalOpen(true)}
        hasNotificationsEnabled={hasNotificationsEnabled}
        announcementText={content.siteConfig.announcementText}
        badgeYear={content.siteConfig.badgeYear}
      />

      <main className="flex-1 relative overflow-hidden">
        {/* Animated Luxury Mesh Gradient Background & Drifting Particles */}
        <div className="animated-mesh-canvas">
          <div className="animated-mesh-bg" />
        </div>
        <AmbientParticles />

        {/* Top Header Leaderboard Ad Slot (High-CPC Finance / Hosting placement) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 relative z-10">
          <AdSensePlacement 
            slotType="leaderboard-top" 
            onAdClick={() => setAdClicksCount(c => c + 1)}
          />
        </div>

        {/* Section 1: Hero Section (The Hook) with A/B Testing Variants */}
        <HeroSection
          variant={activeVariant}
          onActionClick={() => {
            const elem = document.getElementById('quick-selector');
            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
          }}
          onQuickSearchJump={handleQuickSearchJump}
        />

        {/* Section 2: Live Gigs Ticker / Urgent Requests Feed */}
        <ScrollReveal direction="up" distance={20} duration={0.6}>
          <LiveGigsTicker 
            gigs={content.liveGigs}
            onSelectGigProposal={(proposal, gigTitle) => {
              setActiveToast({
                title: `تم نسخ عرض العمل: ${gigTitle}`,
                body: 'تم نسخ نموذج العرض المخصص إلى الحافظة بنجاح، يمكنك تقديمه فوراً لصاحب العمل.'
              });
            }}
          />
        </ScrollReveal>

        {/* Section 3: Interactive Quick Path Selector (Action Box) */}
        <ScrollReveal direction="up" distance={30} duration={0.65}>
          <QuickPathSelector
            streams={content.incomeStreams}
            onSelectStream={(id) => {
              const target = document.getElementById(`stream-card-${id}`);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            onPathCompleted={() => setPathCompleted(true)}
          />
        </ScrollReveal>

        {/* Section 4: Interactive Income Estimator (Engagement & Dwell Time Booster) */}
        <ScrollReveal direction="up" distance={30} duration={0.65}>
          <IncomeCalculator 
            streams={content.incomeStreams}
            onCalculate={() => setCalculatorUsed(true)}
          />
        </ScrollReveal>

        {/* PWA Phone App Download In-Page Banner */}
        <ScrollReveal direction="up" distance={24} duration={0.6}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <PWAInstallButton variant="banner" />
          </div>
        </ScrollReveal>

        {/* Section 5: Content Section: Streams, Search & Filtering */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
          {/* Section Heading with Luxury Motion & SEO Focus */}
          <ScrollReveal direction="up" distance={25} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-emerald-300 border border-emerald-500/40 px-4 py-1.5 rounded-full text-xs font-extrabold mb-3 shadow-md glow-luxury-emerald"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
                <span>{isEn ? '2025 Verified Legit Income Streams' : 'دليل الفرص الشرعية المعتمدة 2025'}</span>
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                {isEn ? 'Actionable Blueprints Answering: ' : 'مسارات استراتيجية واقعية للإجابة عن: '}
                <span className="text-luxury-gradient block sm:inline mt-1 sm:mt-0 font-black">
                  {isEn ? 'How to Make Money Online' : content.siteConfig.targetKeyword}
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {isEn ? 'Choose the stream tailored to your current capabilities, view hourly compensation benchmarks, and access official verified payout channels directly.' : 'اختر المسار المتطابق مع إمكانياتك الحالية، وتعرف على معدل الأجر بالساعة، والمنصات الرسمية لاستلام الأرباح مباشرة.'}
              </p>
            </div>
          </ScrollReveal>

          {/* Robust Search & Advanced Filtering */}
          <ScrollReveal direction="up" distance={25} duration={0.6}>
            <SearchAndFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResultsCount={filteredStreams.length}
            />
          </ScrollReveal>

          {/* Structured Categorization Grid */}
          <ScrollReveal direction="up" distance={30} duration={0.7}>
            <IncomeStreamsGrid
              streams={filteredStreams}
              onSelectStreamForPlan={handleSelectStreamForPlan}
            />
          </ScrollReveal>

          {/* Contextual In-Article High-CPC Ad Slot */}
          <ScrollReveal direction="up" distance={20} duration={0.5}>
            <div className="mt-12">
              <AdSensePlacement 
                slotType="in-article-contextual" 
                onAdClick={() => setAdClicksCount(c => c + 1)}
              />
            </div>
          </ScrollReveal>

          {/* One-Click Copy Prompts & Outreach Scripts Vault */}
          <ScrollReveal direction="up" distance={30} duration={0.65}>
            <PromptTemplateVault templates={content.templatesData} />
          </ScrollReveal>

          {/* Master Zero-to-Hero Financial Blueprint & Pro Golden Rules Guide */}
          <ScrollReveal direction="up" distance={30} duration={0.65}>
            <MasterFinancialGuide 
              phases={content.masterBlueprint}
              goldenRules={content.goldenRules}
              actionPlanSteps={content.sevenDayBlueprint}
              onNotify={(title, body) => setActiveToast({ title, body })}
            />
          </ScrollReveal>

          {/* 7-Day Action Plan Checklist */}
          <ScrollReveal direction="up" distance={30} duration={0.65}>
            <ActionPlan7Days 
              steps={content.sevenDayBlueprint}
            />
          </ScrollReveal>

          {/* Expanded Smart FAQ Accordion */}
          <ScrollReveal direction="up" distance={30} duration={0.65}>
            <SmartFAQAccordion faqs={content.faqData} />
          </ScrollReveal>

          {/* Security, Privacy & End-to-End Encryption */}
          <ScrollReveal direction="up" distance={25} duration={0.6}>
            <SecurityPrivacyNotice />
          </ScrollReveal>

          {/* Strong Final Call to Action */}
          <ScrollReveal direction="up" distance={35} scale={0.98} duration={0.7}>
            <div className="my-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-emerald-500/30">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-2xl mx-auto space-y-6 relative z-10">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-black px-3.5 py-1 rounded-full border border-emerald-500/30">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>{isEn ? 'Opportunity is live today • Start without hesitation' : 'الفرصة متاحة اليوم • لا تؤجل البداية'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white">
                  {isEn ? 'Ready to Earn Your First Real Digital Dollar This Week?' : 'هل أنت مستعد لبدء أول دولار رقمي حقيقي هذا الأسبوع؟'}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  {isEn ? 'The only distinction between those searching and those earning is executing one single plan today. Pick one path and commit to it for 7 days.' : `الفرق الوحيد بين من يستمر في البحث عن "${content.siteConfig.targetKeyword}" ومن يحققه بالفعل هو اتخاذ خطوة تنفيذية واحدة اليوم. اختر مساراً واحداً، والتزم به لمدة 7 أيام.`}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href="#quick-selector"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 text-base font-black py-3.5 px-8 rounded-xl shadow-lg transition-all transform active:scale-95"
                  >
                    <Compass className="w-5 h-5 text-slate-950" />
                    <span>{isEn ? 'Select Your Best Path Now' : 'حدد مسارك الأنسب الآن'}</span>
                    {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </a>

                  <a
                    href="#templates-vault"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 text-sm font-bold py-3.5 px-6 rounded-xl transition-all"
                  >
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>{isEn ? 'Browse 100% Free Templates' : 'تصفح بنك القوالب مجاناً 100%'}</span>
                  </a>
                </div>

                <div className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    {isEn ? 'No Credit Card Required to Browse' : 'بدون اشتراط أي بطاقة بنكية للتصفح'}
                  </span>
                  <span>•</span>
                  <span>{isEn ? 'Continuous verified opportunity updates' : 'تحديث مستمر للفرص الشاغرة'}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* SEO Footer with AdSense Compliance */}
      <Footer 
        onOpenPolicy={(tab) => {
          setActivePolicyTab(tab);
          setIsPolicyModalOpen(true);
        }}
      />

      {/* Modals & Floating Overlays */}
      <ABTestingPanel
        isOpen={isABModalOpen}
        onClose={() => setIsABModalOpen(false)}
        variants={AB_TEST_VARIANTS}
        currentVariantId={currentVariantId}
        onSelectVariant={(id) => {
          setCurrentVariantId(id);
          setIsABModalOpen(false);
          setActiveToast({
            title: `تم تفعيل النسخة (${id === 'variantA' ? 'أ' : id === 'variantB' ? 'ب' : 'ج'})`,
            body: 'تم تحديث الخطاب الإعلاني والعنوان الرئيسي فوراً لمراقبة تفاعل الزائر.'
          });
        }}
      />

      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        sessionSeconds={sessionSeconds}
        scrollDepth={maxScrollDepth}
        calculatorUsed={calculatorUsed}
        pathCompleted={pathCompleted}
        tasksCompletedCount={tasksCompletedCount}
        adClicksCount={adClicksCount}
      />

      <NotificationManager
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        isEnabled={hasNotificationsEnabled}
        onToggleEnabled={handleToggleNotifications}
        onTriggerSimulatedPush={handleTriggerSimulatedPush}
      />

      {/* Google AdSense Official Legal & Compliance Modal */}
      <LegalPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        initialTab={activePolicyTab}
      />

      <NotificationToast
        notification={activeToast}
        onDismiss={() => setActiveToast(null)}
        onActionClick={() => {
          const elem = document.getElementById('income-streams');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating Mobile Install App Button & Offline Indicator */}
      <PWAInstallButton variant="floating" />
      <OfflineIndicator />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ContentProvider>
          <LandingPageContent />
        </ContentProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
