import React, { useState } from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Info, 
  Eye, 
  Sliders, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp,
  Layout
} from 'lucide-react';
import { STRATEGIC_AD_SLOTS } from '../data/incomeStreams';
import { AdUnitSlot } from '../types';

interface AdSensePlacementProps {
  slotType: 'leaderboard-top' | 'in-article-contextual' | 'sticky-action-sidebar';
  onAdClick?: () => void;
}

export const AdSensePlacement: React.FC<AdSensePlacementProps> = ({
  slotType,
  onAdClick,
}) => {
  const [showArchDetails, setShowArchDetails] = useState<boolean>(false);

  const slotInfo: AdUnitSlot = STRATEGIC_AD_SLOTS.find(s => s.id === slotType) || STRATEGIC_AD_SLOTS[0];

  // High-CPC contextual advertisers strictly aligned with online business / making money
  const sampleAdvertisers = {
    'leaderboard-top': {
      brand: 'Bluehost & Hostinger Cloud Solutions',
      title: 'خصم 75% + دومين مجاني | أطلق موقعك أو متجرك الإلكتروني في دقائق',
      desc: 'استضافة فائقة السرعة مع دعم فني عربي على مدار الساعة وضمان استرجاع الأموال 30 يوماً.',
      action: 'احصل على العرض الحصري',
      cpcTag: 'High-CPC Web Hosting ($6.40 avg)',
      url: 'https://hostinger.com'
    },
    'in-article-contextual': {
      brand: 'Wise & Payoneer Business Accounts',
      title: 'استقبل أرباحك بالدولار واليورو مباشرة لحسابك البنكي المحلي بأقل عمولة',
      desc: 'حساب بنكي أمريكي وأوروبي افتراضي فوري للمستقلين وصناع المحتوى العرب بدون رسوم فتح حساب.',
      action: 'فتح حساب مجاني الآن',
      cpcTag: 'Fintech & International Payments ($8.90 avg)',
      url: 'https://wise.com'
    },
    'sticky-action-sidebar': {
      brand: 'Shopify Global E-Commerce',
      title: 'ابدأ تجارتك الإلكترونية بـ 1$ فقط للشهر الأول مع شوبيفاي',
      desc: 'المنصة العالمية الأولى لبناء وإدارة مبيعاتك عبر الإنترنت مع بوابات دفع متكاملة.',
      action: 'تجربة مجانية لمدة 3 أيام',
      cpcTag: 'E-Commerce SaaS Subscription ($9.50 avg)',
      url: 'https://shopify.com'
    }
  };

  const currentAd = sampleAdvertisers[slotType];

  return (
    <div className="my-8 scroll-mt-20">
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 relative transition-all shadow-xl">
        {/* Compliance Label required by Google AdSense & FTC guidelines */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>إعلان ممول / محتوى برعاية شركاء موثوقين (Sponsored)</span>
          </div>

          <button
            onClick={() => setShowArchDetails(!showArchDetails)}
            className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 px-2 py-0.5 rounded-md transition-colors text-[10px]"
            title="فحص المعايير الهندسية لهذا الإعلان ومعدل العائد"
          >
            <Layout className="w-3 h-3" />
            <span>{showArchDetails ? 'إخفاء تفاصيل SEO الإعلانية' : 'تحليل عائد موضع الإعلان'}</span>
          </button>
        </div>

        {/* Growth Hacker / Webmaster Insight Panel */}
        {showArchDetails && (
          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs space-y-2.5 mb-3 border border-slate-800 animate-fadeIn font-mono">
            <div className="flex items-center justify-between text-emerald-400 font-bold font-sans">
              <span>تحليل موضع الإعلان: {slotInfo.placementName}</span>
              <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px] border border-emerald-800/60">
                {slotInfo.cpcEstimate}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              {slotInfo.notes}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-800 text-[10px]">
              <div>الأبعاد القياسية: <strong className="text-white">{slotInfo.dimensions}</strong></div>
              <div>معدل النقر المستهدف (CTR): <strong className="text-emerald-400">{slotInfo.ctrTarget}</strong></div>
              <div>فئة المعلن الأنسب: <strong className="text-amber-300">{slotInfo.bestFitSponsor}</strong></div>
            </div>
          </div>
        )}

        {/* Native Ad Banner Display */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-right flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/60">
                {currentAd.brand}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">
                {currentAd.cpcTag}
              </span>
            </div>
            <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug">
              {currentAd.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {currentAd.desc}
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href={currentAd.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={onAdClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-black py-2.5 px-5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <span>{currentAd.action}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
