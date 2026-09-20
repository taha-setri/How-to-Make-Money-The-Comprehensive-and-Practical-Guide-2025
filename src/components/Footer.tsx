import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Heart, 
  ArrowUp,
  AlertTriangle,
  Mail,
  Scale,
  Cookie,
  CheckCircle2,
  Gift,
  Puzzle,
  ExternalLink,
  Globe
} from 'lucide-react';
import { PolicyTab } from './LegalPolicyModal';
import { BrandLogo } from './BrandLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const { t, isRTL, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePolicyClick = (e: React.MouseEvent, tab: PolicyTab) => {
    e.preventDefault();
    if (onOpenPolicy) {
      onOpenPolicy(tab);
    }
  };

  return (
    <footer className={`bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-14 pb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission & Founder */}
          <div className="space-y-4">
            <BrandLogo variant="full" size="md" />
            <div className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5">
              <span className="text-slate-400 font-medium">{t.founderLabel}</span>
              <strong className="text-emerald-300 font-bold tracking-wide">{t.founderName}</strong>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {t.footerAbout}
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 flex-wrap">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.badgeYear}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                {t.freePill}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                {t.saveLocal}
              </span>
            </div>

            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <LanguageSwitcher variant="pill" />
            </div>

            {/* Network Site / Previous Site Cross-Navigation Link */}
            <div className="pt-3 border-t border-slate-800/60">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1.5 font-medium">
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>{language === 'ar' ? 'شبكة المواقع والتطبيقات:' : 'Apps & Sites Network:'}</span>
              </span>
              <a
                id="footer-network-previous-site-link"
                href="https://fast-jigsaw-puzzle.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 transition-all text-xs"
                title="Fast Jigsaw Puzzle"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 group-hover:scale-105 transition-transform">
                    <Puzzle className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-white font-bold group-hover:text-amber-300 transition-colors block text-xs">
                      {language === 'ar' ? 'الموقع السابق: Fast Jigsaw Puzzle' : 'Previous Site: Fast Jigsaw Puzzle'}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {language === 'ar' ? 'لعبة ألغاز الصور التركيبية السريعة' : 'Interactive Jigsaw Puzzle Game'}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              {language === 'ar' ? 'فئات الدخل الرقمي الأساسية' : 'Core Digital Income Categories'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#income-streams" className="hover:text-emerald-400 transition-colors">
                  {language === 'ar' ? 'خدمات مصغرة ومهام تدريب الذكاء الاصطناعي' : 'AI Data Annotation & Micro-tasks'}
                </a>
              </li>
              <li>
                <a href="#income-streams" className="hover:text-emerald-400 transition-colors">
                  {language === 'ar' ? 'كتابة الإعلانات والتسويق المقنع (Copywriting)' : 'High-Converting Copywriting & Pitching'}
                </a>
              </li>
              <li>
                <a href="#income-streams" className="hover:text-emerald-400 transition-colors">
                  {language === 'ar' ? 'مونتاج مقاطع الفيديو القصيرة (Reels & TikTok)' : 'Short-Form Video Editing (Reels/TikTok)'
                  }
                </a>
              </li>
              <li>
                <a href="#income-streams" className="hover:text-emerald-400 transition-colors">
                  {language === 'ar' ? 'بيع المنتجات الرقمية على Gumroad' : 'Digital Assets on Gumroad & Payhip'}
                </a>
              </li>
              <li>
                <a href="#income-streams" className="hover:text-emerald-400 transition-colors">
                  {language === 'ar' ? 'التسويق بالعمولة للبرمجيات السحابية (High-Ticket)' : 'SaaS High-Ticket Affiliate Marketing'}
                </a>
              </li>
            </ul>
          </div>

          {/* Mandatory Google AdSense Policies & Legal Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>السياسات والامتثال (AdSense Policies)</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={(e) => handlePolicyClick(e, 'privacy')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right w-full"
                >
                  <Cookie className="w-3.5 h-3.5 text-emerald-400" />
                  <span>سياسة الخصوصية (Privacy Policy)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handlePolicyClick(e, 'terms')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right w-full"
                >
                  <Scale className="w-3.5 h-3.5 text-teal-400" />
                  <span>شروط الاستخدام (Terms of Service)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handlePolicyClick(e, 'disclaimer')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right w-full"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>إخلاء المسؤولية المالية (Disclaimer)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handlePolicyClick(e, 'contact')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right w-full"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>اتصل بنا والناشر (Contact Us)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* SEO Keyword Cluster (Semantic LSI keywords for rankings) */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              الكلمات المفتاحية المترابطة (LSI SEO)
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {[
                'كيف الحصول على المال',
                'الربح من الانترنت للمبتدئين',
                'وظائف عن بعد باللغة العربية',
                'العمل الحر من المنزل',
                'تفريغ صوتي مدفوع',
                'تصميم كانفا بالهاتف',
                'قنوات يوتيوب بدون ظهور',
                'بيع قوالب نوشن',
                'دروب سيرفيسينج',
                'دخل إضافي للطلاب'
              ].map((kw, i) => (
                <span key={i} className="bg-slate-900 border border-slate-800 text-slate-400 px-2 py-1 rounded-md">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AdSense Compliance & Anti-Scam Notice with Luxury Styling */}
        <div className="bg-gradient-to-b from-slate-900/90 to-slate-950/95 p-5 sm:p-6 rounded-2xl border border-emerald-500/20 shadow-xl glow-luxury-emerald text-xs leading-relaxed text-slate-400 mb-8 space-y-3 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-luxury-pulse" />
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800/80 pb-3 relative z-10">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
              <span>إخلاء مسؤولية الشفافية والامتثال لبرنامج Google AdSense:</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 text-emerald-300 font-medium shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>حماية وشفافية المحتوى الرقمي المعتمد</span>
              </span>
              <button
                onClick={(e) => handlePolicyClick(e, 'contact')}
                className="text-slate-300 hover:text-emerald-300 transition-colors font-medium border border-slate-800 bg-slate-950/80 px-2.5 py-0.5 rounded-full cursor-pointer hover:border-emerald-500/40"
              >
                بوابة الدعم المباشر
              </button>
            </div>
          </div>

          <p>
            هذا الموقع يقدم محتوى إرشادياً وتدريبياً وتثقيفياً قائماً على تجارب واقعية لمستقلين وصناع محتوى عرب. النتائج والأرباح المعروضة في الحاسبة والنماذج هي تقديرات تستند إلى معدلات السوق وتتطلب جهداً والتزاماً حقيقياً؛ ولا نقدم أي وعود أو ضمانات بثراء سريع. نحن لا نروج لأي برامج تداول عالية المخاطر، تسويق هرمي، أو منصات غير مرخصة.
          </p>

          <p className="text-slate-500 text-[11px]">
            * إشعار ملفات الكوكيز والإعلانات: تستخدم Google وموردو الجهات الخارجية ملفات تعريف الارتباط لعرض الإعلانات استناداً إلى زيارات المستخدمين السابقة لهذا الموقع أو لمواقع أخرى على الويب. يمكن للمستخدمين في أي وقت إلغاء الاشتراك في الإعلانات المخصصة عبر زيارة{' '}
            <a 
              href="https://www.google.com/settings/ads" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:underline"
            >
              إعدادات إعلانات Google
            </a>
            .
          </p>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span>{t.footerRights}</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="inline-flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-emerald-500/30 text-xs shadow-sm">
              <span className="text-slate-400">{t.founderLabel}</span>
              <strong className="text-emerald-300 font-bold tracking-wide">{t.founderName}</strong>
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-slate-500 text-[11px]">
              {language === 'ar' ? 'منصة إرشادية مجانية 100% بدون أي رسوم أو اشتراكات' : '100% Free Educational Platform With Zero Paid Up-sells'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {onOpenPolicy && (
              <div className="hidden sm:flex items-center gap-3 text-slate-500 text-xs">
                <button 
                  onClick={(e) => handlePolicyClick(e, 'privacy')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.privacyPolicy}
                </button>
                <span>•</span>
                <button 
                  onClick={(e) => handlePolicyClick(e, 'terms')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.termsOfService}
                </button>
                <span>•</span>
                <button 
                  onClick={(e) => handlePolicyClick(e, 'disclaimer')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {t.earningsDisclaimer}
                </button>
                <span>•</span>
                <button 
                  onClick={(e) => handlePolicyClick(e, 'contact')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'اتصل بنا' : 'Contact'}
                </button>
              </div>
            )}

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
            >
              <span>{language === 'ar' ? 'العودة للأعلى' : 'Back to top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
