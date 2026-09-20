export type Language = 'ar' | 'en';

export interface Translations {
  // Navigation & Header
  siteName: string;
  siteSubtitle: string;
  founderLabel: string;
  founderName: string;
  topAnnouncement: string;
  badgeYear: string;
  saveLocal: string;
  verifiedPlatforms: string;
  pathFinderNav: string;
  calculatorNav: string;
  liveGigsNav: string;
  streamsNav: string;
  masterGuideNav: string;
  templatesVaultNav: string;
  faqNav: string;
  analyticsNav: string;
  freeVaultBtn: string;
  downloadAppBtn: string;
  appInstalledBtn: string;
  langSwitchBtn: string;
  currentLangLabel: string;

  // Hero Section
  heroPreTitle: string;
  heroBadgeZeroCapital: string;
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  heroHeadlineEnd: string;
  heroSubheadline: string;
  heroCtaExplore: string;
  heroCtaCalculate: string;
  heroTrust1: string;
  heroTrust2: string;
  heroTrust3: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;

  // Live Gigs Ticker
  liveGigsTitle: string;
  liveGigsSubtitle: string;
  liveGigsUpdateLive: string;
  spotsLeft: string;
  copyPitchBtn: string;
  pitchCopiedToast: string;

  // Quick Path Selector
  quickSelectorTitle: string;
  quickSelectorSubtitle: string;
  stepHoursTitle: string;
  stepHoursDesc: string;
  stepCapitalTitle: string;
  stepCapitalDesc: string;
  stepGoalTitle: string;
  stepGoalDesc: string;
  stepSkillsTitle: string;
  stepSkillsDesc: string;
  recommendedPathHeader: string;
  matchScore: string;
  startPlanNowBtn: string;
  retestBtn: string;

  // Calculator
  calculatorTitle: string;
  calculatorSubtitle: string;
  hourlyRateLabel: string;
  hoursPerDayLabel: string;
  daysPerWeekLabel: string;
  estimatedDaily: string;
  estimatedMonthly: string;
  estimatedAnnual: string;
  potentialNotice: string;

  // Search & Filter
  searchPlaceholder: string;
  categoryAll: string;
  categoryMicro: string;
  categorySkills: string;
  categoryContent: string;
  categoryFast: string;
  speedAll: string;
  speedInstant: string;
  speedFast: string;
  speedMedium: string;
  capitalAll: string;
  capitalZero: string;
  capitalLow: string;
  difficultyAll: string;
  difficultyBeginner: string;
  difficultyIntermediate: string;
  resultsFound: string;
  clearFilters: string;

  // Stream Cards
  streamCardPayoutSpeed: string;
  streamCardCapital: string;
  streamCardDifficulty: string;
  streamCardPotential: string;
  streamCardActionSteps: string;
  streamCardHighlights: string;
  streamCardPlatforms: string;
  streamCardProTip: string;
  streamCardWarning: string;
  streamCardExploreBtn: string;

  // Master Financial Guide
  masterGuideTitle: string;
  masterGuideSubtitle: string;
  progressOverview: string;
  printGuide: string;
  copyScript: string;
  scriptCopied: string;
  scamShieldTitle: string;
  highTicketTitle: string;
  paymentsTitle: string;
  deepWorkTitle: string;

  // 7-Day Plan
  actionPlanTitle: string;
  actionPlanSubtitle: string;
  completedTasks: string;
  resetChecklist: string;

  // Prompt Vault
  promptVaultTitle: string;
  promptVaultSubtitle: string;
  copyPromptBtn: string;
  copiedBtn: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;
  allQuestions: string;

  // Security & Disclaimer
  securityNoticeTitle: string;
  securityNoticeBody: string;

  // PWA & Mobile
  downloadAppModalTitle: string;
  downloadAppModalSubtitle: string;
  freePill: string;
  directInstallBtn: string;
  installingState: string;
  alreadyInstalledTitle: string;
  speedBenefit: string;
  offlineBenefit: string;
  lightBenefit: string;
  androidTab: string;
  iosTab: string;
  desktopScanTitle: string;
  desktopScanDesc: string;
  copyLinkBtn: string;
  linkCopiedBtn: string;
  closeBtn: string;
  offlineBanner: string;

  // Footer
  footerAbout: string;
  footerRights: string;
  privacyPolicy: string;
  termsOfService: string;
  cookiePolicy: string;
  earningsDisclaimer: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    siteName: 'مسار المال',
    siteSubtitle: 'الدليل العملي الموثوق للدخل الرقمي الشرعي',
    founderLabel: 'المؤسس:',
    founderName: 'Taha setri',
    topAnnouncement: 'دليل تطبيقي واقعي 100% بدون اشتراط رأس مال مبدئي وبدون تسويق هرمي أو إعلانات مضللة.',
    badgeYear: 'تحديث 2025',
    saveLocal: 'حفظ الخطة محلياً',
    verifiedPlatforms: 'منصات معتمدة ومفحوصة',
    pathFinderNav: 'محدد المسار',
    calculatorNav: 'حاسبة الأرباح',
    liveGigsNav: 'الطلبات الحية',
    streamsNav: 'الفرص والمسارات',
    masterGuideNav: 'خارطة الصفر والأمان',
    templatesVaultNav: 'خزينة النماذج',
    faqNav: 'الأسئلة الشائعة',
    analyticsNav: 'التحليلات',
    freeVaultBtn: 'القوالب مجاناً 100%',
    downloadAppBtn: 'تنزيل التطبيق على الهاتف',
    appInstalledBtn: 'التطبيق مثبت',
    langSwitchBtn: 'English',
    currentLangLabel: 'العربية',

    heroPreTitle: 'الدليل العملي العربي الموثوق 2025',
    heroBadgeZeroCapital: '0$ رأس مال مبدئي',
    heroHeadlineMain: 'كيف تبدأ',
    heroHeadlineHighlight: 'جني المال الحقيقي',
    heroHeadlineEnd: 'من الإنترنت بدون وعود كاذبة',
    heroSubheadline: 'منصة تفاعلية مجانية 100% أسسها Taha setri لمساعدتك في اختيار المسار الرقمي الأنسب لمهاراتك، حساب أرباحك المتوقعة، وتنفيذ خطة عملية من 7 أيام لكسب أول دولار.',
    heroCtaExplore: 'استكشف مسارات الدخل (0$ تكلفة)',
    heroCtaCalculate: 'احسب أرباحك الشهرية',
    heroTrust1: 'بدون كورسات مدفوعة',
    heroTrust2: 'فرص حقيقية مفحوصة',
    heroTrust3: 'نماذج عمل مجانية',
    stat1Value: '8+',
    stat1Label: 'مسارات دخل معتمدة',
    stat2Value: '0$',
    stat2Label: 'تكلفة البداية الفعلية',
    stat3Value: '100%',
    stat3Label: 'مجاني ومدقق 2025',
    stat4Value: '7 أيام',
    stat4Label: 'لتحقيق أول نتيجة',

    liveGigsTitle: 'طلبات ومشاريع حية ومتاحة الآن',
    liveGigsSubtitle: 'تحديثات مستمرة لطلبات حقيقية من كبرى منصات العمل الحر (مستقل، خمسات، Upwork)',
    liveGigsUpdateLive: 'تحديث مباشر',
    spotsLeft: 'أماكن شاغرة',
    copyPitchBtn: 'نسخ نموذج العرض المناسب',
    pitchCopiedToast: 'تم نسخ نموذج العرض بنجاح!',

    quickSelectorTitle: 'محدد المسار الذكي المخصص لك',
    quickSelectorSubtitle: 'أجب عن 4 أسئلة سريعة لنحدد لك أفضل طريقة لكسب المال تناسب وقتك ومهاراتك الحالية',
    stepHoursTitle: 'كم ساعة تستطيع تخصيصها يومياً؟',
    stepHoursDesc: 'الالتزام اليومي يحدد سرعة النتائج',
    stepCapitalTitle: 'كم هو رأس المال المتاح لديك حالياً؟',
    stepCapitalDesc: 'أكثر من 80% من المسارات تبدأ بـ 0$',
    stepGoalTitle: 'ما هو هدفك المالي الأساسي؟',
    stepGoalDesc: 'هل تبحث عن سرعة النقد أم استدامة الدخل؟',
    stepSkillsTitle: 'ما هو المجال الأقرب لاهتمامك؟',
    stepSkillsDesc: 'اختر المجال الأكثر متعة وفائدة بالنسبة لك',
    recommendedPathHeader: 'المسار الموصى به لك بدقة عالية',
    matchScore: 'نسبة التوافق:',
    startPlanNowBtn: 'عرض تفاصيل هذا المسار والبدء فوراً',
    retestBtn: 'إعادة الاختبار وتغيير الإجابات',

    calculatorTitle: 'حاسبة الدخل والأرباح التفاعلية',
    calculatorSubtitle: 'احسب عائدك الشهري والسنوي التقديري بناءً على ساعتك ووقتك المتاح يومياً',
    hourlyRateLabel: 'العائد المتوقع للساعة ($)',
    hoursPerDayLabel: 'ساعات العمل اليومية',
    daysPerWeekLabel: 'أيام العمل أسبوعياً',
    estimatedDaily: 'العائد اليومي التقديري',
    estimatedMonthly: 'العائد الشهري التقديري',
    estimatedAnnual: 'العائد السنوي التقديري',
    potentialNotice: 'تقديرات مبنية على متوسط معدلات الدفع للمستقلين في المنصات العالمية والعربية.',

    searchPlaceholder: 'ابحث عن مسار، مهارة، أداة (مثل: كانفا، ترجمة، تفريغ، ذكاء اصطناعي)...',
    categoryAll: 'كل الفئات',
    categoryMicro: 'خدمات مصغرة ومهام سريعة',
    categorySkills: 'مهارات رقمية عالية القيمة',
    categoryContent: 'صناعة المحتوى والأصول',
    categoryFast: 'عائد فوري وسريع',
    speedAll: 'كل سرعات الدفع',
    speedInstant: 'دفع فوري / أسبوعي',
    speedFast: 'دفع سريع (خلال أيام)',
    speedMedium: 'متوسط وتراكمي',
    capitalAll: 'كل مستويات رأس المال',
    capitalZero: '0$ مجاني بالكامل',
    capitalLow: 'منخفض جداً (أقل من 30$)',
    difficultyAll: 'كل المستويات',
    difficultyBeginner: 'مناسب للمبتدئين',
    difficultyIntermediate: 'متوسط',
    resultsFound: 'مسار متاح ومطابق لمعاييرك',
    clearFilters: 'إعادة ضبط الفلاتر',

    streamCardPayoutSpeed: 'سرعة الدفع:',
    streamCardCapital: 'رأس المال:',
    streamCardDifficulty: 'مستوى الصعوبة:',
    streamCardPotential: 'الدخل المتوقع:',
    streamCardActionSteps: 'خطوات التنفيذ العملية:',
    streamCardHighlights: 'أبرز المميزات:',
    streamCardPlatforms: 'المنصات الرسمية الموصى بها:',
    streamCardProTip: 'نصيحة ذهبية:',
    streamCardWarning: 'تحذير أمان:',
    streamCardExploreBtn: 'بدء هذا المسار الآن',

    masterGuideTitle: 'خارطة الصفر والأمان المالي الشامل',
    masterGuideSubtitle: 'الدليل التنفيذي المتكامل من الصفر حتى استلام أول 100$ وتأمين أموالك ضد الاحتيال',
    progressOverview: 'نسبة استيعابك للمراحل:',
    printGuide: 'طباعة الدليل / حفظ PDF',
    copyScript: 'نسخ القالب الجاهز',
    scriptCopied: 'تم نسخ القالب بنجاح!',
    scamShieldTitle: 'درع الحماية من الاحتيال والنصب الرقمي',
    highTicketTitle: 'استراتيجية الصفقات المرتفعة والعقود الشهرية',
    paymentsTitle: 'دليل بوابات الدفع واستلام الأرباح في الدول العربية',
    deepWorkTitle: 'نظام الـ 120 دقيقة للعمل العميق ومضاعفة الإنتاجية',

    actionPlanTitle: 'خطة الـ 7 أيام لتحقيق أول دخل من الإنترنت',
    actionPlanSubtitle: 'خطوات يومية مرتبة وقابلة للقياس، صُممت لنقلك من حيرة التفكير إلى التنفيذ الفعلي',
    completedTasks: 'المهام المنجزة:',
    resetChecklist: 'إعادة تعيين الخطة',

    promptVaultTitle: 'خزينة نماذج العروض ورسائل التواصل الجاهزة',
    promptVaultSubtitle: 'نماذج تواصل وعروض احترافية معدة بنقرة واحدة لنسخها وتعديلها لجذب العملاء فوراً',
    copyPromptBtn: 'نسخ النموذج',
    copiedBtn: 'تم النسخ بنجاح!',

    faqTitle: 'الأسئلة الشائعة والإجابات الصريحة',
    faqSubtitle: 'إجابات واضحة وحاسمة عن رأس المال، بوابات الدفع في الدول العربية، وتفادي مواقع النصب',
    allQuestions: 'عرض جميع الأسئلة',

    securityNoticeTitle: 'إشعار الشفافية والأمان والمسؤولية المالية',
    securityNoticeBody: 'هذا الموقع منصة تعليمية وتطبيقية مجانية 100% أنشأها Taha setri. لا نطلب بياناتك البنكية، ولا نروج لمخططات الثراء السريع أو التسويق الهرمي. الأرباح تعتمد كلياً على جهدك الشخصي وتطبيقك للخطوات العملية.',

    downloadAppModalTitle: 'تنزيل التطبيق على الهاتف',
    downloadAppModalSubtitle: 'تثبيت فوري بدون متجر تطبيقات، فائق السرعة ويعمل حتى بدون إنترنت',
    freePill: 'مجاناً 100%',
    directInstallBtn: 'تثبيت التطبيق بنقرة واحدة الآن',
    installingState: 'جاري التثبيت...',
    alreadyInstalledTitle: 'التطبيق مثبت بالفعل على جهازك!',
    speedBenefit: 'سرعة فائقة',
    offlineBenefit: 'يعمل بدون نت',
    lightBenefit: 'أمان وخفيف الحجم',
    androidTab: 'هواتف أندرويد (Samsung / Xiaomi)',
    iosTab: 'أجهزة آيفون وآيباد (iPhone / iPad)',
    desktopScanTitle: 'هل تتصفح من جهاز الكمبيوتر؟',
    desktopScanDesc: 'وجّه كاميرا هاتفك نحو رمز الاستجابة السريعة (QR) أو انسخ الرابط لفتحه وتثبيته فوراً.',
    copyLinkBtn: 'نسخ رابط التطبيق للهاتف',
    linkCopiedBtn: 'تم نسخ الرابط بنجاح!',
    closeBtn: 'إغلاق',
    offlineBanner: 'أنت تتصفح في وضع عدم الاتصال (Offline) - المحتوى محفوظ وجاهز للاستخدام!',

    footerAbout: 'أول منصة ومسار توجيهي عربي عملي مجاني 100%، أسسها Taha setri لتقديم حلول واقعية وموثوقة للإجابة عن سؤال "كيف الحصول على المال" عبر المهارات الرقمية الحقيقية.',
    footerRights: 'جميع الحقوق محفوظة لمنصة مسار المال © 2025. أسسها Taha setri.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الاستخدام',
    cookiePolicy: 'سياسة ملفات الكوكيز',
    earningsDisclaimer: 'إخلاء المسؤولية عن الأرباح',
  },

  en: {
    siteName: 'MoneyPath',
    siteSubtitle: 'The Practical & Verified Blueprint to Online Income',
    founderLabel: 'Founder:',
    founderName: 'Taha setri',
    topAnnouncement: '100% Realistic & Practical Guide — $0 Initial Capital, No Ponzi Schemes, No Paid Course Up-sells.',
    badgeYear: '2025 Verified',
    saveLocal: 'Saved Locally',
    verifiedPlatforms: 'Verified Platforms',
    pathFinderNav: 'Path Finder',
    calculatorNav: 'Profit Calculator',
    liveGigsNav: 'Live Gigs Feed',
    streamsNav: 'Income Streams',
    masterGuideNav: 'Zero-to-Hero Guide',
    templatesVaultNav: 'Prompt Vault',
    faqNav: 'FAQ',
    analyticsNav: 'Analytics',
    freeVaultBtn: '100% Free Templates',
    downloadAppBtn: 'Download App on Phone',
    appInstalledBtn: 'App Installed',
    langSwitchBtn: 'العربية',
    currentLangLabel: 'English',

    heroPreTitle: 'The Proven 2025 Practical Income Blueprint',
    heroBadgeZeroCapital: '$0 Initial Capital',
    heroHeadlineMain: 'How to Actually Make',
    heroHeadlineHighlight: 'Real Money Online',
    heroHeadlineEnd: 'Without False Promises or Gimmicks',
    heroSubheadline: 'A 100% free interactive platform founded by Taha setri to help you discover the ideal online income path, calculate real earning potential, and execute a 7-day action plan to earn your first dollar.',
    heroCtaExplore: 'Explore Income Paths ($0 Capital)',
    heroCtaCalculate: 'Calculate Monthly Potential',
    heroTrust1: 'No Paid Courses or Subscriptions',
    heroTrust2: 'Verified Legitimate Platforms',
    heroTrust3: 'Ready-to-Use Client Templates',
    stat1Value: '8+',
    stat1Label: 'Proven Income Streams',
    stat2Value: '$0',
    stat2Label: 'Required Startup Capital',
    stat3Value: '100%',
    stat3Label: 'Free & 2025 Verified',
    stat4Value: '7 Days',
    stat4Label: 'To Your First Real Result',

    liveGigsTitle: 'Live Open Gigs & Client Opportunities',
    liveGigsSubtitle: 'Real-time verified client requests from top freelance platforms (Upwork, Mostaql, Khamsat, Fiverr)',
    liveGigsUpdateLive: 'Live Updates',
    spotsLeft: 'Open Spots',
    copyPitchBtn: 'Copy Pitch Template',
    pitchCopiedToast: 'Pitch template copied successfully!',

    quickSelectorTitle: 'Personalized Smart Path Finder',
    quickSelectorSubtitle: 'Answer 4 quick questions to instantly identify the most lucrative income stream tailored to your daily schedule and current skills.',
    stepHoursTitle: 'How many hours can you dedicate daily?',
    stepHoursDesc: 'Your daily focus determines result velocity',
    stepCapitalTitle: 'What is your current starting capital?',
    stepCapitalDesc: 'Over 80% of our streams start with strictly $0',
    stepGoalTitle: 'What is your primary financial objective?',
    stepGoalDesc: 'Quick emergency cash vs. sustainable scalable assets',
    stepSkillsTitle: 'Which skill domain interests you most?',
    stepSkillsDesc: 'Pick the craft you genuinely enjoy doing',
    recommendedPathHeader: 'Your Highly Matched Income Path',
    matchScore: 'Match Score:',
    startPlanNowBtn: 'View Details & Start This Path',
    retestBtn: 'Retake Quiz & Change Answers',

    calculatorTitle: 'Interactive Income & Earnings Calculator',
    calculatorSubtitle: 'Estimate your daily, monthly, and annual digital income based on your target hourly rate and available hours.',
    hourlyRateLabel: 'Target Hourly Rate ($)',
    hoursPerDayLabel: 'Work Hours Per Day',
    daysPerWeekLabel: 'Work Days Per Week',
    estimatedDaily: 'Estimated Daily Income',
    estimatedMonthly: 'Estimated Monthly Income',
    estimatedAnnual: 'Estimated Annual Potential',
    potentialNotice: 'Estimates grounded in current market median rates for global and regional remote freelancers.',

    searchPlaceholder: 'Search streams, tools, skills (e.g. Canva, translation, AI training, audio)...',
    categoryAll: 'All Categories',
    categoryMicro: 'Micro-tasks & Instant Gigs',
    categorySkills: 'High-Value Digital Skills',
    categoryContent: 'Content & Digital Assets',
    categoryFast: 'Fast Execution',
    speedAll: 'All Payout Speeds',
    speedInstant: 'Instant / Weekly Payout',
    speedFast: 'Fast (Within Days)',
    speedMedium: 'Medium & Compounding',
    capitalAll: 'All Capital Levels',
    capitalZero: '$0 Zero Capital (100% Free)',
    capitalLow: 'Very Low (< $30)',
    difficultyAll: 'All Difficulties',
    difficultyBeginner: 'Beginner Friendly',
    difficultyIntermediate: 'Intermediate',
    resultsFound: 'streams matched your criteria',
    clearFilters: 'Reset Filters',

    streamCardPayoutSpeed: 'Payout Speed:',
    streamCardCapital: 'Required Capital:',
    streamCardDifficulty: 'Difficulty Level:',
    streamCardPotential: 'Income Potential:',
    streamCardActionSteps: 'Execution Roadmap:',
    streamCardHighlights: 'Key Highlights:',
    streamCardPlatforms: 'Verified Platforms:',
    streamCardProTip: 'Pro Insider Tip:',
    streamCardWarning: 'Safety Warning:',
    streamCardExploreBtn: 'Launch This Stream',

    masterGuideTitle: 'Zero-to-Hero Master Financial Blueprint',
    masterGuideSubtitle: 'The complete step-by-step roadmap from absolute zero to earning your first $100 and safeguarding your earnings against online scams.',
    progressOverview: 'Your Blueprint Mastery Progress:',
    printGuide: 'Print Guide / Save as PDF',
    copyScript: 'Copy Ready Script',
    scriptCopied: 'Script copied to clipboard!',
    scamShieldTitle: 'Anti-Scam Defense Shield',
    highTicketTitle: 'High-Ticket Client Retainer Strategy',
    paymentsTitle: 'International & Arab Payment Gateways Guide',
    deepWorkTitle: 'The 120-Minute Daily Deep Work Protocol',

    actionPlanTitle: '7-Day Fast-Track Action Plan',
    actionPlanSubtitle: 'Structured, measurable daily checkpoints engineered to bridge the gap from overthinking to tangible client revenue.',
    completedTasks: 'Completed Checkpoints:',
    resetChecklist: 'Reset 7-Day Plan',

    promptVaultTitle: 'Ready-to-Use Client Outreach & Pitch Vault',
    promptVaultSubtitle: 'Copy-paste cold outreach emails, Upwork proposals, and AI prompts with one click to win clients immediately.',
    copyPromptBtn: 'Copy Template',
    copiedBtn: 'Copied to Clipboard!',

    faqTitle: 'Frequently Asked Questions & Honest Answers',
    faqSubtitle: 'Straightforward answers regarding startup capital, payment gateways across Arab countries, and avoiding online fraud.',
    allQuestions: 'Show All Questions',

    securityNoticeTitle: 'Transparency, Ethics & Earnings Disclaimer',
    securityNoticeBody: 'This website is a 100% free educational & execution platform founded by Taha setri. We never solicit banking passwords or push get-rich-quick schemes. Your earnings are solely a reflection of your consistent effort, craft, and execution.',

    downloadAppModalTitle: 'Download App on Your Phone',
    downloadAppModalSubtitle: 'Instant install with no app store required. Lightweight, lightning-fast, and works offline.',
    freePill: '100% Free',
    directInstallBtn: 'Install App Now (1-Click)',
    installingState: 'Installing App...',
    alreadyInstalledTitle: 'App is already installed on your device!',
    speedBenefit: 'Blazing Fast',
    offlineBenefit: 'Works Offline',
    lightBenefit: 'Ultra Light & Safe',
    androidTab: 'Android Phones (Samsung / Xiaomi / etc.)',
    iosTab: 'Apple iOS (iPhone / iPad)',
    desktopScanTitle: 'Browsing from a PC or Mac?',
    desktopScanDesc: 'Point your phone camera at the QR code below or copy the link to install it directly on your mobile device.',
    copyLinkBtn: 'Copy Phone App Link',
    linkCopiedBtn: 'Link Copied Successfully!',
    closeBtn: 'Close',
    offlineBanner: 'You are browsing in offline mode — all blueprints and templates are cached and ready to use!',

    footerAbout: 'The premier 100% free practical digital income blueprint, founded by Taha setri to answer "How to make money online" through genuine digital craftsmanship with no paid up-sells.',
    footerRights: 'All Rights Reserved. MoneyPath Platform © 2025. Founded by Taha setri.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    earningsDisclaimer: 'Earnings Disclaimer',
  },
};
