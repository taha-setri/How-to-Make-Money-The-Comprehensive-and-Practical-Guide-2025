export type StreamCategory = 
  | 'micro-services' 
  | 'digital-skills' 
  | 'content-monetization' 
  | 'fast-execution';

export interface PlatformLink {
  name: string;
  url: string;
  note: string;
  tag?: string;
}

export interface IncomeStream {
  id: string;
  title: string;
  category: StreamCategory;
  categoryLabel: string;
  payoutSpeed: string;
  speedLevel: 'instant' | 'fast' | 'medium' | 'compounding';
  incomePotential: string;
  baseHourlyRate: number; // For dynamic calculator
  initialCapital: string;
  capitalLevel: 'zero' | 'low' | 'moderate';
  difficulty: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  dailyHoursRecommended: number;
  description: string;
  highlights: string[];
  actionSteps: string[];
  recommendedPlatforms: PlatformLink[];
  proTip: string;
  warningNote: string;
  badge?: string;
  highCpcTopic: string; // Associated high CPC keyword for advertising relevance
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedSpeed: string;
  selectedCapital: string;
  selectedDifficulty: string;
}

export interface ABTestVariant {
  id: 'variantA' | 'variantB' | 'variantC';
  label: string;
  angle: string;
  headline: string;
  subheadline: string;
  highlightWords: string[];
  primaryCtaText: string;
  primaryCtaSubtext: string;
  trustFactor: string;
  conversionRate: number;
  totalImpressions: number;
  conversionsCount: number;
}

export interface UserAssessment {
  hoursPerDay: number;
  capital: 'zero' | 'low' | 'moderate';
  primaryGoal: 'instant_cash' | 'monthly_growth' | 'passive_assets';
  skillInterest: 'writing' | 'tech_design' | 'audio_data' | 'social_selling';
}

export interface ChecklistItem {
  id: string;
  day: number;
  title: string;
  task: string;
  timeEstimate: string;
  completed: boolean;
  resourceTip: string;
  readyTemplate?: string; // One-click copy outreach template
}

export interface LiveGigItem {
  id: string;
  title: string;
  category: string;
  payout: string;
  payoutUSD: number;
  payoutType: 'instant' | 'hourly' | 'project';
  capitalRequired: string;
  platform: string;
  spotsLeft: number;
  timeAgo: string;
  urgentBadge: string;
  description: string;
  tags: string[];
  proposalPitchTemplate: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: 'pitch' | 'freelance' | 'ai_prompt' | 'followup';
  categoryLabel: string;
  targetPlatform: string;
  description: string;
  content: string;
  proTip: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'payments' | 'capital' | 'beginners' | 'security' | 'time';
  categoryLabel: string;
  keywords: string[];
}

export interface PaymentPlan {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  badge?: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface AdUnitSlot {
  id: string;
  placementName: string;
  dimensions: string;
  cpcEstimate: string;
  bestFitSponsor: string;
  ctrTarget: string;
  notes: string;
}

export interface MatrixAdItem {
  id: string;
  sponsorName: string;
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  targetUrl: string;
  estimatedCpc: string;
  category: 'hosting' | 'fintech' | 'trading' | 'ai_tools' | 'ecommerce';
  active: boolean;
  isAdSenseCode?: boolean;
  adSenseSlotId?: string;
  impressions?: number;
  clicks?: number;
}

export interface SiteConfig {
  siteTitle: string;
  metaDescription: string;
  announcementText: string;
  badgeYear: string;
  targetKeyword: string;
  currencySymbol: string;
  whatsappContact?: string;
}

export interface BlueprintStep {
  stepNumber: number;
  title: string;
  description: string;
  actionTool: string;
  pitfallToAvoid: string;
  deliverable: string;
  timeEstimate: string;
}

export interface MasterBlueprintPhase {
  id: string;
  phaseNumber: number;
  dayRange: string;
  title: string;
  subtitle: string;
  objective: string;
  timeCommitment: string;
  iconName: string;
  capitalRequired: string;
  badge: string;
  steps: BlueprintStep[];
  proTemplate?: {
    label: string;
    title: string;
    body: string;
    instructions: string;
  };
}

export type GoldenRuleCategory = 'scam_prevention' | 'high_ticket_scaling' | 'payment_gateways' | 'extreme_productivity';

export interface GoldenRuleTip {
  id: string;
  category: GoldenRuleCategory;
  categoryLabel: string;
  title: string;
  badge: string;
  impactLevel: 'critical' | 'transformative' | 'high';
  summary: string;
  detailedBreakdown: string[];
  practicalExample: string;
  goldenRuleQuote: string;
  actionChecklist: string[];
}

export interface CmsContentStore {
  siteConfig: SiteConfig;
  incomeStreams: IncomeStream[];
  liveGigs: LiveGigItem[];
  sevenDayBlueprint: ChecklistItem[];
  masterBlueprint: MasterBlueprintPhase[];
  goldenRules: GoldenRuleTip[];
  faqData: FAQItem[];
  templatesData: PromptTemplate[];
  paymentPlans: PaymentPlan[];
  adSlots: AdUnitSlot[];
  matrixAds: MatrixAdItem[];
  lastUpdated: string;
  version: string;
}

export type CmsDataSource = 'supabase' | 'remote_json' | 'local_storage' | 'bundled_fallback';
