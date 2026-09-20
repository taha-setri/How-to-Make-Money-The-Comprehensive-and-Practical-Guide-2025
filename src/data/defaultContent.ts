import { CmsContentStore } from '../types';
import { INCOME_STREAMS, SEVEN_DAY_BLUEPRINT, PAYMENT_PLANS, STRATEGIC_AD_SLOTS } from './incomeStreams';
import { LIVE_GIGS_DATA } from './liveGigsData';
import { FAQ_DATA } from './faqData';
import { PROMPT_TEMPLATES_DATA } from './templatesData';
import { DEFAULT_MATRIX_ADS } from './matrixData';
import { MASTER_BLUEPRINT_PHASES, GOLDEN_RULES_DATA } from './masterBlueprintData';

export const DEFAULT_CMS_CONTENT: CmsContentStore = {
  version: '2.6.0',
  lastUpdated: '2025-05-15T12:00:00.000Z',
  siteConfig: {
    siteTitle: 'كيف الحصول على المال من الإنترنت | الدليل العملي الموثوق 2025',
    metaDescription: 'دليل تطبيقي سريع وموثوق للبدء في تحقيق دخل واقعي عبر الإنترنت بدون رأس مال وبدون تسويق هرمي أو وعود زائفة.',
    announcementText: 'دليل تطبيقي واقعي 100% بدون اشتراط رأس مال مبدئي وبدون تسويق هرمي أو إعلانات مضللة.',
    badgeYear: 'تحديث 2025',
    targetKeyword: 'كيف الحصول على المال',
    currencySymbol: '$',
    whatsappContact: '+966500000000',
  },
  incomeStreams: INCOME_STREAMS,
  liveGigs: LIVE_GIGS_DATA,
  sevenDayBlueprint: SEVEN_DAY_BLUEPRINT,
  masterBlueprint: MASTER_BLUEPRINT_PHASES,
  goldenRules: GOLDEN_RULES_DATA,
  faqData: FAQ_DATA,
  templatesData: PROMPT_TEMPLATES_DATA,
  paymentPlans: PAYMENT_PLANS,
  adSlots: STRATEGIC_AD_SLOTS,
  matrixAds: DEFAULT_MATRIX_ADS,
};
