import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smartphone, 
  Download, 
  X, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  Copy, 
  Check, 
  Sparkles, 
  Zap, 
  WifiOff, 
  ShieldCheck, 
  ExternalLink,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => Promise<boolean>;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable,
  isInstalled,
  isIOS,
  isAndroid,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>((isIOS ? 'ios' : 'android'));
  const [installing, setInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-w4smeynnw5yamvji6efiuc-282396221807.europe-west2.run.app';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentUrl)}&bgcolor=0f172a&color=34d399&margin=10`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDirectInstall = async () => {
    setInstalling(true);
    const success = await onInstall();
    setInstalling(false);
    if (success) {
      setInstallSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 p-6 sm:p-8 text-right overflow-hidden z-10"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-white">تنزيل التطبيق على الهاتف</h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-[11px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30">
                  مجاناً 100%
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تثبيت فوري بدون متجر تطبيقات، فائق السرعة ويعمل حتى بدون إنترنت
              </p>
            </div>
          </div>

          {/* Already Installed Notification */}
          {isInstalled && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-3 text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-sm">التطبيق مثبت بالفعل على جهازك!</div>
                <div className="text-xs text-emerald-400/80">أنت تستخدم النسخة المثبتة المستقلة بكامل سرعتها وخاصية عدم الاتصال.</div>
              </div>
            </div>
          )}

          {/* If Install Success */}
          {installSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-400 flex items-center gap-3 text-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 shrink-0" />
              <div>
                <div className="font-bold text-sm">ألف مبروك! جاري تثبيت التطبيق...</div>
                <div className="text-xs text-emerald-400/90">ستجد أيقونة التطبيق "مسار المال" على شاشتك الرئيسية فوراً.</div>
              </div>
            </div>
          )}

          {/* Direct Install Button (Chrome / Edge / Android) */}
          {isInstallable && !isInstalled && !installSuccess && (
            <div className="mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDirectInstall}
                disabled={installing}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Download className="w-5 h-5 text-slate-950" />
                <span>{installing ? 'جاري الفتح والتثبيت...' : 'تثبيت التطبيق بنقرة واحدة الآن'}</span>
              </motion.button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                سيتيح لك الوصول الفوري من شاشة هاتفك الرئيسية تماماً كأي تطبيق أصلي.
              </p>
            </div>
          )}

          {/* Features Highlights */}
          <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <Zap className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-slate-200">سرعة فائقة</div>
              <div className="text-[9px] text-slate-400">تحميل لحظي بدون انتظار</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <WifiOff className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-slate-200">يعمل بدون نت</div>
              <div className="text-[9px] text-slate-400">تصفح النماذج والخطط أوفلاين</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <ShieldCheck className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-slate-200">أمان وحجم خفيف</div>
              <div className="text-[9px] text-slate-400">أقل من 2 ميغابايت ولا يستهلك ذاكرة</div>
            </div>
          </div>

          {/* OS-Specific Instruction Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-slate-800 mb-4">
              <button
                onClick={() => setActiveTab('android')}
                className={`flex-1 pb-2.5 text-xs font-bold transition-all relative cursor-pointer ${
                  activeTab === 'android' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>هواتف أندرويد (Samsung / Xiaomi / وغيرها)</span>
                {activeTab === 'android' && (
                  <motion.div
                    layoutId="activePwaTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('ios')}
                className={`flex-1 pb-2.5 text-xs font-bold transition-all relative cursor-pointer ${
                  activeTab === 'ios' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>أجهزة آيفون وآيباد (iPhone / iPad)</span>
                {activeTab === 'ios' && (
                  <motion.div
                    layoutId="activePwaTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                  />
                )}
              </button>
            </div>

            {/* Android Guide */}
            {activeTab === 'android' && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </span>
                  <p className="text-slate-300">
                    افتح الرابط في متصفح <strong>Google Chrome</strong> على هاتفك.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </span>
                  <p className="text-slate-300">
                    اضغط على قائمة الثلاث نقاط <strong>(⋮)</strong> في أعلى أو أسفل المتصفح.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </span>
                  <p className="text-slate-300">
                    اختر <strong>"تثبيت التطبيق" (Install app)</strong> أو <strong>"الإضافة إلى الشاشة الرئيسية"</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* iOS Guide */}
            {activeTab === 'ios' && (
              <div className="space-y-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </span>
                  <p className="text-slate-300">
                    تأكد من فتح الموقع في متصفح <strong>Safari</strong> الأصلي على هاتفك.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </span>
                  <p className="text-slate-300 flex items-center gap-1.5 flex-wrap">
                    <span>اضغط على زر المشاركة</span>
                    <Share2 className="w-3.5 h-3.5 text-blue-400 inline" />
                    <span>في الشريط السفلي للشاشة.</span>
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </span>
                  <p className="text-slate-300 flex items-center gap-1.5 flex-wrap">
                    <span>مرر للأسفل واضغط على</span>
                    <PlusSquare className="w-3.5 h-3.5 text-emerald-400 inline" />
                    <strong>"إضافة إلى الصفحة الرئيسية" (Add to Home Screen)</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* QR Code & Share link for desktop users */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
            <div className="shrink-0 bg-slate-900 p-2 rounded-xl border border-emerald-500/20 shadow-inner flex flex-col items-center">
              <img 
                src={qrCodeUrl} 
                alt="مسح رمز الاستجابة السريعة QR لتنزيل التطبيق على الهاتف" 
                className="w-24 h-24 rounded-lg"
                loading="lazy"
              />
              <span className="text-[10px] text-emerald-400 mt-1 font-bold flex items-center gap-1">
                <QrCode className="w-3 h-3" />
                امسح بكاميرا هاتفك
              </span>
            </div>

            <div className="flex-1 text-center sm:text-right">
              <div className="text-xs font-bold text-slate-200 mb-1">
                هل تتصفح من جهاز الكمبيوتر؟
              </div>
              <p className="text-[11px] text-slate-400 mb-2.5">
                وجّه كاميرا هاتفك نحو رمز الاستجابة السريعة (QR) أو انسخ الرابط لفتحه على هاتفك وتثبيته فوراً.
              </p>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">تم نسخ الرابط بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>نسخ رابط التطبيق للهاتف</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Footer Action */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
