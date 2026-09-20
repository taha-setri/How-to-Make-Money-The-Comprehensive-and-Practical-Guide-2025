import { MatrixAdItem } from '../types';

export const DEFAULT_MATRIX_ADS: MatrixAdItem[] = [
  {
    id: 'mad-hostinger',
    sponsorName: 'Hostinger & Bluehost Cloud',
    badge: 'راعي مميز • استضافة سحابية',
    title: 'خصم 78% + اسم نطاق مجاني وشبكة CDN لرواد الأعمال',
    description: 'أطلق موقعك أو مدونتك الربحية المعتمدة في AdSense بسيرفرات فائقة السرعة مع شهادة SSL مجانية ودعم فني عربي.',
    ctaText: 'احجز الاستضافة وابدأ بـ 2.99$/شهر',
    targetUrl: 'https://hostinger.com',
    estimatedCpc: '$7.40 - $14.20 CPC',
    category: 'hosting',
    active: true,
    impressions: 1240,
    clicks: 86
  },
  {
    id: 'mad-wise',
    sponsorName: 'Wise & Payoneer Business',
    badge: 'بنوك دولية مرخصة • عائد مرتفع',
    title: 'افتح حساباً بنكياً أمريكياً وأوروبياً مجاناً لاستلام أرباح العمل الحر',
    description: 'استقبل أرباح AdSense وUpwork وخمسات بالدولار واليورو مع بطاقة فيزا افتراضية وتحويل فوري لحسابك البنكي المحلي.',
    ctaText: 'فتح حساب فوري بدون عمولة تحويل',
    targetUrl: 'https://wise.com',
    estimatedCpc: '$8.80 - $16.50 CPC',
    category: 'fintech',
    active: true,
    impressions: 1890,
    clicks: 142
  },
  {
    id: 'mad-trading',
    sponsorName: 'منصات التداول المالي والاستثمار المرخص',
    badge: 'أعلى CPC معتمد • تمويل وحساب تجريبي',
    title: 'تداول الأسهم والذهب بحساب تجريبي بقيمة 10,000$ بدون مخاطرة',
    description: 'تعلم استراتيجيات التداول اليومي والتحوط المالي على منصات خاضعة للرقابة المالية مع رافعة مالية مرنة وأدوات ذكاء اصطناعي.',
    ctaText: 'افتح حساباً تجريبياً مجانياً الآن',
    targetUrl: 'https://investing.com',
    estimatedCpc: '$12.50 - $28.00 CPC',
    category: 'trading',
    active: true,
    impressions: 980,
    clicks: 65
  },
  {
    id: 'mad-ai-tools',
    sponsorName: 'أدوات الذكاء الاصطناعي الاحترافية AI Suite',
    badge: 'أدوات إنتاجية • دخل مضاعف',
    title: 'أتمت كتابة المقالات وتصميم المنشورات وعروض العمل بنقرة واحدة',
    description: 'وفر 20 ساعة عمل أسبوعياً في تقديم العروض وصناعة المحتوى مع نماذج لغوية متخصصة ومولّد صور بدقة 4K.',
    ctaText: 'تجربة مجانية لأول 10,000 كلمة',
    targetUrl: 'https://copy.ai',
    estimatedCpc: '$6.20 - $11.40 CPC',
    category: 'ai_tools',
    active: true,
    impressions: 1410,
    clicks: 98
  }
];
