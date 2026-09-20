/**
 * Modern Global SEO Keywords & High-CPC Metadata Repository
 * Targets top-tier search intent, AdSense CPC optimization, and Schema.org semantic search.
 */

export interface GlobalKeywordItem {
  id: string;
  keywordEn: string;
  keywordAr: string;
  category: 'ai_monetization' | 'freelance_skills' | 'passive_income' | 'zero_capital' | 'high_cpc_finance';
  cpcTier: 'ultra_high' | 'high' | 'medium';
  searchIntent: 'commercial' | 'informational' | 'transactional';
  tags: string[];
}

export const GLOBAL_SEO_KEYWORDS: GlobalKeywordItem[] = [
  // --- Category: AI Monetization & Prompt Engineering ---
  {
    id: 'ai-monetization-2026',
    keywordEn: 'AI monetization strategies 2026',
    keywordAr: 'الربح من الذكاء الاصطناعي 2026',
    category: 'ai_monetization',
    cpcTier: 'ultra_high',
    searchIntent: 'commercial',
    tags: ['AI', 'ChatGPT', 'Automation', 'Future Skills']
  },
  {
    id: 'chatgpt-prompts-income',
    keywordEn: 'ChatGPT prompts for profit and client work',
    keywordAr: 'أوامر شات جي بي تي لكسب المال وأعمال العملاء',
    category: 'ai_monetization',
    cpcTier: 'ultra_high',
    searchIntent: 'transactional',
    tags: ['ChatGPT', 'Prompts', 'AI Freelancing']
  },
  {
    id: 'ai-data-annotation-jobs',
    keywordEn: 'AI data annotation remote jobs PayPal',
    keywordAr: 'وظائف تدريب وتصنيف بيانات الذكاء الاصطناعي باي بال',
    category: 'ai_monetization',
    cpcTier: 'high',
    searchIntent: 'transactional',
    tags: ['Data Annotation', 'Remotasks', 'Outlier AI', 'Zero Capital']
  },
  {
    id: 'midjourney-canva-selling',
    keywordEn: 'Selling Canva & AI generated templates on Etsy and Gumroad',
    keywordAr: 'بيع تصاميم كانفا والذكاء الاصطناعي على جمروود وإتسي',
    category: 'ai_monetization',
    cpcTier: 'high',
    searchIntent: 'commercial',
    tags: ['Canva', 'Digital Art', 'Templates', 'Gumroad']
  },

  // --- Category: High-Income Freelance & Remote Skills ---
  {
    id: 'make-money-online-guide',
    keywordEn: 'How to make money online legitimately for beginners',
    keywordAr: 'كيف الحصول على المال من الإنترنت للمبتدئين بدون نصب',
    category: 'freelance_skills',
    cpcTier: 'ultra_high',
    searchIntent: 'informational',
    tags: ['Make Money Online', 'Beginner Guide', 'Verified']
  },
  {
    id: 'upwork-fiverr-freelance',
    keywordEn: 'High paying remote freelance skills on Upwork and Fiverr',
    keywordAr: 'مهارات العمل الحر عالية الدخل على خمسات ومستقل وأب ورك',
    category: 'freelance_skills',
    cpcTier: 'high',
    searchIntent: 'transactional',
    tags: ['Freelance', 'Upwork', 'Khamsat', 'Mostaql']
  },
  {
    id: 'audio-transcription-jobs',
    keywordEn: 'Legitimate audio transcription jobs online no experience',
    keywordAr: 'وظائف تفريغ صوتي موثوقة بدون خبرة مسبقة',
    category: 'freelance_skills',
    cpcTier: 'medium',
    searchIntent: 'transactional',
    tags: ['Transcription', 'Audio', 'Entry Level']
  },
  {
    id: 'copywriting-high-conversion',
    keywordEn: 'High conversion copywriting for e-commerce and landing pages',
    keywordAr: 'كتابة الإعلانات التسويقية وصفحات الهبوط للمتاجر',
    category: 'freelance_skills',
    cpcTier: 'ultra_high',
    searchIntent: 'commercial',
    tags: ['Copywriting', 'Content', 'High Ticket']
  },
  {
    id: 'dropservicing-arbitrage',
    keywordEn: 'Drop servicing digital agency model zero startup cost',
    keywordAr: 'نموذج وساطة الخدمات الرقمية بدون تكلفة أولية',
    category: 'freelance_skills',
    cpcTier: 'ultra_high',
    searchIntent: 'commercial',
    tags: ['Drop Servicing', 'Arbitrage', 'Agency']
  },

  // --- Category: Passive Income & Digital Assets ---
  {
    id: 'passive-income-streams',
    keywordEn: 'Real passive income streams with zero capital',
    keywordAr: 'مصادر دخل سلبي حقيقي بدون رأس مال',
    category: 'passive_income',
    cpcTier: 'ultra_high',
    searchIntent: 'informational',
    tags: ['Passive Income', 'Recurring Revenue', 'Wealth']
  },
  {
    id: 'faceless-youtube-channel',
    keywordEn: 'Faceless YouTube channel automation AI voice and scripts',
    keywordAr: 'إنشاء قناة يوتيوب بدون ظهور باستخدام الذكاء الاصطناعي',
    category: 'passive_income',
    cpcTier: 'high',
    searchIntent: 'commercial',
    tags: ['YouTube Automation', 'Faceless', 'Video Monetization']
  },
  {
    id: 'affiliate-marketing-high-ticket',
    keywordEn: 'High ticket affiliate marketing without a website',
    keywordAr: 'التسويق بالعمولة عالي العمولة بدون موقع إلكتروني',
    category: 'passive_income',
    cpcTier: 'ultra_high',
    searchIntent: 'transactional',
    tags: ['Affiliate Marketing', 'ClickBank', 'Amazon Associates', 'Impact']
  },
  {
    id: 'notion-gumroad-products',
    keywordEn: 'Sell digital Notion templates and planners on Gumroad',
    keywordAr: 'بيع قوالب نوشن والمخططات الرقمية على جمروود',
    category: 'passive_income',
    cpcTier: 'high',
    searchIntent: 'commercial',
    tags: ['Notion', 'Digital Products', 'Gumroad', 'Stripe']
  },

  // --- Category: Zero Capital & Fast Cashout ---
  {
    id: 'zero-capital-side-hustle',
    keywordEn: 'Best zero capital side hustles from phone and laptop',
    keywordAr: 'أفضل أعمال جانبية برأس مال صفر دولار من الهاتف والحاسوب',
    category: 'zero_capital',
    cpcTier: 'high',
    searchIntent: 'informational',
    tags: ['Zero Capital', 'Side Hustle', 'Mobile Earnings']
  },
  {
    id: 'fast-payout-paypal-payoneer',
    keywordEn: 'Online work with direct payout to PayPal Payoneer and local banks',
    keywordAr: 'شغل أونلاين مع سحب فوري إلى باي بال بايونير والحسابات البنكية',
    category: 'zero_capital',
    cpcTier: 'high',
    searchIntent: 'transactional',
    tags: ['Instant Payout', 'PayPal', 'Payoneer', 'Bank Wire']
  },

  // --- Category: High-CPC Finance & AdSense Boosters ---
  {
    id: 'business-bank-account-online',
    keywordEn: 'Best online business banking accounts and freelance invoicing',
    keywordAr: 'أفضل حسابات بنكية إلكترونية للأنشطة التجارية والفوترة',
    category: 'high_cpc_finance',
    cpcTier: 'ultra_high',
    searchIntent: 'commercial',
    tags: ['Finance', 'Banking', 'High CPC', 'Invoicing']
  },
  {
    id: 'freelance-tax-and-contracts',
    keywordEn: 'Freelance client contract templates and escrow payment safety',
    keywordAr: 'عقود العمل الحر الاحترافية وضمان الدفع والحماية من النصب',
    category: 'high_cpc_finance',
    cpcTier: 'high',
    searchIntent: 'informational',
    tags: ['Escrow', 'Contracts', 'Legal Protection', 'Anti-Scam']
  }
];

/**
 * Returns a concatenated meta-keywords string for HTML head injection.
 */
export function getMetaKeywordsString(): string {
  const englishList = GLOBAL_SEO_KEYWORDS.map(k => k.keywordEn);
  const arabicList = GLOBAL_SEO_KEYWORDS.map(k => k.keywordAr);
  const extraGlobal = [
    'make money online 2026',
    'how to earn money from home',
    'AI prompt engineering money',
    'legit freelance platforms',
    'canva template business',
    'faceless youtube automation',
    'high ticket affiliate marketing',
    'PayPal instant cashout',
    'Payoneer freelance bank transfer',
    'zero investment online jobs',
    'digital products gumroad',
    'remote work for students',
    'كيف الحصول على المال',
    'الربح من الانترنت للمبتدئين',
    'كيفية كسب المال من الهاتف',
    'الربح من كانفا',
    'العمل الحر عن بعد',
    'الربح بالذكاء الاصطناعي',
    'دخل سلبي حقيقي',
    'طرق شرعية بدون نصب',
    'شغل أونلاين بالدولار'
  ];

  return Array.from(new Set([...englishList, ...arabicList, ...extraGlobal])).join(', ');
}

/**
 * Dynamically updates document metadata (title, meta keywords, Schema, OG tags)
 * to keep them in sync with user language and current view context.
 */
export function syncDocumentSeo(language: 'ar' | 'en') {
  if (typeof document === 'undefined') return;

  const isEn = language === 'en';

  // Dynamic Page Title
  const title = isEn 
    ? 'MoneyPath | How to Make Money Online - Verified 2026 Global Blueprint'
    : 'كيف الحصول على المال من الإنترنت | الدليل العملي الموثوق 2026 - مسار المال';
  
  document.title = title;

  // Description
  const description = isEn
    ? 'Discover legitimate ways to make money online with 0% capital. Explore verified AI workflows, freelance skills, passive digital products, and an interactive income calculator.'
    : 'اكتشف كيف الحصول على المال بأساليب واقعية وشرعية 100%. مسارات الربح من العمل الحر، الذكاء الاصطناعي، والمنتجات الرقمية مع حاسبة أرباح تفاعلية.';

  // Meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', getMetaKeywordsString());

  // Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }

  // Open Graph Title & Description
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', title);

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', description);

  // Update HTML lang & dir
  document.documentElement.lang = isEn ? 'en' : 'ar';
  document.documentElement.dir = isEn ? 'ltr' : 'rtl';
}
