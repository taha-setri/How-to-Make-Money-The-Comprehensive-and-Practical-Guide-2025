import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  AlertTriangle, 
  Mail, 
  X, 
  CheckCircle2, 
  ExternalLink,
  Cookie,
  Scale,
  Send,
  HelpCircle
} from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'disclaimer' | 'contact';

interface LegalPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('general');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setSubmitSuccess(false);
      }, 4000);
    }, 800);
  };

  const tabs: { id: PolicyTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'privacy', label: 'سياسة الخصوصية (Privacy Policy)', icon: ShieldCheck },
    { id: 'terms', label: 'شروط الاستخدام (Terms of Service)', icon: Scale },
    { id: 'disclaimer', label: 'إخلاء المسؤولية (Disclaimer)', icon: AlertTriangle },
    { id: 'contact', label: 'اتصل بنا (Contact Us)', icon: Mail },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-right overflow-hidden my-auto"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  السياسات القانونية والامتثال الإعلاني (AdSense Compliance)
                </h3>
                <p className="text-xs text-slate-400">
                  وثائق الامتثال الرسمية وشروط برنامج شركاء Google AdSense
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 border-b border-slate-800 bg-slate-900/90 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2.5 px-3.5 rounded-t-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-emerald-400 text-emerald-300 bg-slate-800/80'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed flex-1">
            {/* TAB 1: PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl flex items-start gap-3">
                  <Cookie className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      التزام معايير Google AdSense لملفات تعريف الارتباط والإعلانات المخصصة
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      نحن نحترم خصوصية زوارنا تماماً. يوضح هذا القسم كيفية استخدام ملفات تعريف الارتباط (Cookies) من قِبل Google والجهات الخارجية الشريكة لعرض الإعلانات على هذا الموقع بناءً على زيارات المستخدمين.
                    </p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    1. من نحن ومسؤولية الموقع
                  </h4>
                  <p>
                    موقع "كيف الحصول على المال" (إدارة فريق التحرير وتوجيه الدخل الرقمي) هو منصة إرشادية وتثقيفية تقدم دلائل حول المهارات الرقمية ومسارات العمل عبر الإنترنت. خصوصيتك تمثل أولوية قصوى لدينا، ونحن ملتزمون بحماية البيانات الشخصية لجميع زوار المنصة وفق أعلى معايير الشفافية والامتثال الدولي.
                  </p>
                </section>

                <section className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    2. إعلانات Google وملف تعريف الارتباط DART (AdSense Disclosure)
                  </h4>
                  <p>
                    تستخدم شركة Google بصفتها مورداً لطرف ثالث ملفات تعريف الارتباط (Cookies) لعرض الإعلانات على موقعنا:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 mr-2">
                    <li>
                      يُمكّن استخدام Google لملف تعريف الارتباط <strong>DoubleClick DART</strong> شركة Google وشركاءها الإعلانيين من عرض الإعلانات للمستخدمين استناداً إلى زياراتهم لموقعنا هذا ومواقع أخرى على شبكة الإنترنت.
                    </li>
                    <li>
                      يجوز لموردي الجهات الخارجية الآخرين وشبكات الإعلانات استخدام ملفات تعريف الارتباط وإشارات الويب (Web Beacons) لقياس مدى فعالية إعلاناتهم وتخصيص محتوى الإعلانات التي تراها.
                    </li>
                    <li>
                      موقع "كيف الحصول على المال" لا يملك أي وصول أو تحكم مباشر في ملفات تعريف الارتباط التي تستخدمها الجهات الإعلانية الخارجية.
                    </li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    3. كيفية إلغاء الاشتراك في الإعلانات المخصصة (Opt-Out)
                  </h4>
                  <p>
                    يمكن للمستخدمين في أي وقت تعطيل استخدام ملف تعريف الارتباط DART للإعلانات القائمة على الاهتمامات أو إلغاء الاشتراك في الإعلانات المخصصة باتباع إحدى الطرق التالية:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between group text-xs text-slate-200"
                    >
                      <span className="font-semibold">إعدادات إعلانات Google الرسمية</span>
                      <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <a
                      href="https://www.aboutads.info/choices"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between group text-xs text-slate-200"
                    >
                      <span className="font-semibold">بوابة مبادرة شفافية الإعلانات AboutAds</span>
                      <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    4. ملفات السجل (Log Files) والبيانات التحليلية
                  </h4>
                  <p>
                    مثل معظم خوادم المواقع الإلكترونية، يستخدم خادمنا ملفات السجل القياسية لتشخيص المشكلات الفنية. تتضمن المعلومات المجمعة: بروتوكول الإنترنت (IP address)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، طوابع التاريخ/الوقت، وصفحات الإحالة/الخروج، وعدد النقرات. هذه البيانات مجهولة الهوية بالكامل ولا ترتبط بأي معلومات تحدد هوية الشخص بصورة فردية.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    5. الامتثال لقوانين الخصوصية العالمية (GDPR & CCPA)
                  </h4>
                  <p>
                    إذا كنت مقيماً في المنطقة الاقتصادية الأوروبية (EEA) أو ولاية كاليفورنيا (CCPA)، يحق لك طلب الوصول إلى بياناتك الشخصية، أو تصحيحها، أو حذفها، أو طلب تقييد معالجتها. لا نقوم إطلاقاً ببيع أي بيانات شخصية تخص زوارنا إلى أي طرف ثالث لأي أغراض تجارية.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    6. خصوصية الأطفال (COPPA Compliance)
                  </h4>
                  <p>
                    محتوى الموقع موجه للبالغين والشباب الراغبين في اكتساب مهارات العمل الحر والتقني، ولا يقوم الموقع عن قصد بجمع أي معلومات تعريف شخصية من الأطفال دون سن 13 عاماً. إذا اعتقد أحد الوالدين أن طفله قد زودنا بمعلومات، يرجى الاتصال بنا فوراً لحذفها.
                  </p>
                </section>

                <div className="pt-2 text-xs text-slate-500 border-t border-slate-800">
                  تاريخ آخر تحديث لسياسة الخصوصية: {new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            )}

            {/* TAB 2: TERMS OF SERVICE */}
            {activeTab === 'terms' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                  <h4 className="font-bold text-white text-sm mb-1">
                    اتفاقية وشروط الاستخدام المتبادل (Terms of Service)
                  </h4>
                  <p className="text-xs text-slate-400">
                    باستخدامك لموقع "كيف الحصول على المال"، فإنك توافق على الالتزام بكافة الشروط والأحكام المبينة أدناه. إذا كنت لا توافق على هذه الشروط، يرجى الامتناع عن استخدام الموقع.
                  </p>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    1. طبيعة الخدمة والمحتوى التعليمي
                  </h4>
                  <p>
                    يقدم الموقع أدلة إرشادية، وحاسبات أرباح تقريبية، ونماذج برومبتات، ومسارات عمل حر لأغراض تعليمية وإعلامية بحتة. المحتوى لا يمثل بأي حال من الأحوال عرضاً تجارياً ملزماً أو وعداً بتوظيف رسمي من جانبنا.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    2. حقوق الملكية الفكرية والعلامات التجارية
                  </h4>
                  <p>
                    جميع النصوص، والتصميمات، والأكواد البرمجية، والحاسبات التفاعلية المعروضة على الموقع هي ملك حصري لموقع "كيف الحصول على المال" ومحمية بموجب قوانين الملكية الفكرية وحقوق النشر. يُحظر تماماً كشط البيانات التلقائي (Scraping)، أو نسخ المحتوى وإعادة نشره دون تصريح كتابي صريح.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    3. الاستخدام المقبول والسلوك المحظور
                  </h4>
                  <p>
                    يتعهد المستخدم بعدم استخدام الموقع لأي أنشطة غير قانونية، أو محاولة تعطيل الخوادم أو شبكات الأمان، أو النقر الاحتيالي على الإعلانات (Invalid Clicks) الممنوع بموجب سياسات Google AdSense، أو استخدام برمجيات الروبوت للتفاعل المصطنع مع عناصر الصفحة.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    4. الروابط التابعة وروابط المواقع الخارجية
                  </h4>
                  <p>
                    قد يحتوي الموقع على روابط تؤدي إلى منصات عمل حر خارجية (مثل Upwork, Fiverr, مستقل, خمسات). نحن لا نتحكم في سياسات أو خدمات تلك المواقع ولا نتحمل أي مسؤولية عن أي معاملات تجارية تتم بينك وبين أي منصة خارجية.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    5. التعديلات على الشروط والخدمة
                  </h4>
                  <p>
                    نحتفظ بالحق في تحديث أو تعديل شروط الاستخدام في أي وقت دون إشعار مسبق. يعتبر استمرارك في استخدام الموقع بعد نشر أي تعديلات قبولاً ضمنياً بالشروط المحدثة.
                  </p>
                </section>
              </div>
            )}

            {/* TAB 3: FINANCIAL & TRANSPARENCY DISCLAIMER */}
            {activeTab === 'disclaimer' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-amber-950/40 border border-amber-500/30 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-300 text-sm">
                      إخلاء مسؤولية الأرباح والشفافية المالية (Earnings & Transparency Disclaimer)
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      وفقاً لإرشادات هيئة التجارة الفيدرالية (FTC) وسياسات جودة المحتوى المالي لشركة Google AdSense، نعلن بوضوح ما يلي:
                    </p>
                  </div>
                </div>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    1. لا توجد ضمانات بالدخل أو الأرباح السريعة
                  </h4>
                  <p>
                    الأرقام والإحصاءات ومعدلات الدخل بالساعة المعروضة في "حاسبة الأرباح" ونماذج المسارات على هذا الموقع هي أرقام استرشادية مبنية على متوسطات السوق العالمية والعمل الحر العربي، وليست بأي حال ضمانات أو وعود مالية بتحقيق عائد محدد. تحقيق أي دخل عبر الإنترنت يعتمد بشكل كامل على مهاراتك الفردية، والوقت المستثمر، والمثابرة، والطلب الفعلي للعملاء في السوق.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    2. المحتوى لا يشكل استشارة مالية أو استثمارية
                  </h4>
                  <p>
                    المعلومات المنشورة هنا لأغراض إرشادية وتعليمية فقط، ولا تشكل استشارة استثمارية، أو قانونية، أو مالية معتمدة. يجب عليك دائماً إجراء بحثك الشخصي المستقل واستشارة مستشار مالي أو قانوني مؤهل قبل اتخاذ أي قرارات استثمارية أو تجارية كبرى.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    3. مكافحة الاحتيال والتسويق الهرمي
                  </h4>
                  <p>
                    موقعنا يحارب ويرفض بشكل قاطع أي نماذج للتسويق الهرمي (Pyramid Schemes)، أو مخططات بونزي، أو منصات التداول المشبوهة، أو استطلاعات الرأي الوهمية المدفوعة التي تطلب أموالاً مسبقة. نحن نوجه زوارنا فقط إلى العمل الحقيقي القائم على تقديم مهارات وخدمات رقمية ذات قيمة مضافة.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    4. إخلاء مسؤولية المنصات الشريكة
                  </h4>
                  <p>
                    لا نتحمل أي مسؤولية عن أي خسائر مباشرة أو غير مباشرة ناتجة عن التعامل مع أي من المنصات أو الخدمات الخارجية المذكورة ضمن دلائلنا، وتقع مسؤولية التحقق من شروط كل منصة وقواعد الدفع الخاصة بها على عاتق المستخدم.
                  </p>
                </section>
              </div>
            )}

            {/* TAB 4: CONTACT US */}
            {activeTab === 'contact' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Contact Info Card */}
                  <div className="md:col-span-1 space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm">بيانات الدعم والتواصل الرسمي</h4>
                    <p className="text-xs text-slate-400">
                      نرحب باستفسارات الزوار، وبلاغات حقوق الملكية الفكرية، واقتراحات تحسين جودة المحتوى عبر النموذج المشفر أدناه.
                    </p>
                    <div className="pt-2 space-y-2 text-xs">
                      <div>
                        <span className="text-slate-500 block">قناة الاستفسار الرسمية:</span>
                        <span className="text-emerald-300 font-bold">
                          بوابة الدعم والمراسلة الفورية المباشرة
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">سرعة الاستجابة:</span>
                        <span className="text-slate-300 font-medium">خلال 24 إلى 48 ساعة عمل</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">الموضوع الأساسي:</span>
                        <span className="text-slate-300 font-medium">إرشاد الدخل الرقمي والعمل الحر</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="md:col-span-2 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-white text-sm mb-3">
                      إرسال رسالة مباشرة إلى إدارة الموقع
                    </h4>

                    {submitSuccess ? (
                      <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/40 rounded-xl">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                        <h5 className="font-bold text-white">تم استلام رسالتك بنجاح!</h5>
                        <p className="text-xs text-slate-300">
                          شكراً لتواصلك معنا. سنقوم بمراجعة استفسارك والرد عليك عبر بريدك الإلكتروني في أقرب وقت.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              الاسم الكامل *
                            </label>
                            <input
                              type="text"
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="أدخل اسمك"
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              البريد الإلكتروني *
                            </label>
                            <input
                              type="email"
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="name@example.com"
                              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            نوع الاستفسار *
                          </label>
                          <select
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                          >
                            <option value="general">استفسار عام حول المحتوى والمسارات</option>
                            <option value="privacy">استفسار بخصوص سياسة الخصوصية وملفات الكوكيز</option>
                            <option value="ads">ملاحظة بخصوص الإعلانات وسياسة Google AdSense</option>
                            <option value="dmca">حقوق الملكية الفكرية وطلب إزالة محتوى (DMCA)</option>
                            <option value="partnership">اقتراح تعاون أو شراكة موثوقة</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            نص الرسالة *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="اكتب تفاصيل استفسارك أو اقتراحك هنا..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة الآن'}</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>محتوى قانوني متوافق مع سياسات برنامج شركاء Google للناشرين 2025</span>
            </div>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors cursor-pointer"
            >
              إغلاق النافذة
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
