import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Download, CheckCircle, WifiOff } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';
import { useLanguage } from '../context/LanguageContext';

interface PWAInstallButtonProps {
  variant?: 'header' | 'floating' | 'banner' | 'card';
  className?: string;
  onInstalledSuccess?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language } = useLanguage();
  const isEn = language === 'en';

  const handleClick = () => {
    // If native prompt is ready and we are not on iOS, we can open the modal or prompt
    setIsModalOpen(true);
  };

  if (variant === 'floating') {
    // Floating badge on mobile devices (hidden if already running in standalone app)
    if (isInstalled) return null;

    return (
      <>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed bottom-5 left-4 z-40 md:hidden"
        >
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-black text-xs px-3.5 py-2.5 rounded-full shadow-lg shadow-emerald-500/40 border border-emerald-300/40 active:scale-95 transition-transform cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-slate-950 animate-bounce" />
            <span>{t.downloadAppBtn}</span>
          </button>
        </motion.div>

        <PWAInstallModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onInstall={install}
          isInstallable={isInstallable}
          isInstalled={isInstalled}
          isIOS={isIOS}
          isAndroid={isAndroid}
        />
      </>
    );
  }

  if (variant === 'banner') {
    if (isInstalled) return null;

    return (
      <>
        <div className={`p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${className}`}>
          <div className="flex items-center gap-3.5 text-right w-full sm:w-auto">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-2">
                <span>{isEn ? 'Install "MoneyPath" App on Your Phone Free' : 'تثبيت تطبيق "مسار المال" على هاتفك مجاناً'}</span>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400/30">
                  {isEn ? 'No App Store Required' : 'بدون متجر'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isEn ? '1-Tap launch, lightweight installation, and complete offline capability.' : 'وصول أسرع بضغطة واحدة، حجم خفيف جداً، وتصفح سلس بدون إنترنت.'}
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClick}
            className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{isEn ? 'Download on Phone Now' : 'تنزيل على الهاتف الآن'}</span>
          </motion.button>
        </div>

        <PWAInstallModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onInstall={install}
          isInstallable={isInstallable}
          isInstalled={isInstalled}
          isIOS={isIOS}
          isAndroid={isAndroid}
        />
      </>
    );
  }

  // Header default variant
  return (
    <>
      <motion.button
        id="pwa-install-header-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm ${
          isInstalled
            ? 'bg-slate-800/80 border border-emerald-500/40 text-emerald-300 hover:bg-slate-800'
            : 'bg-gradient-to-r from-emerald-500/20 via-emerald-600/30 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/50 text-emerald-300 hover:text-white shadow-emerald-500/10'
        } ${className}`}
        title={t.downloadAppBtn}
      >
        {isInstalled ? (
          <>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t.appInstalledBtn}</span>
            <span className="sm:hidden">{t.appInstalledBtn}</span>
          </>
        ) : (
          <>
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden md:inline">{t.downloadAppBtn}</span>
            <span className="md:hidden">{isEn ? 'App' : 'تطبيق'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
          </>
        )}
      </motion.button>

      <PWAInstallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInstall={install}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isIOS={isIOS}
        isAndroid={isAndroid}
      />
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { language } = useLanguage();
  const isEn = language === 'en';

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2.5 rounded-xl bg-amber-500/95 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-slate-950 shadow-2xl border border-amber-300 animate-bounce">
      <WifiOff className="w-4 h-4 text-slate-950" />
      <span>
        {isEn 
          ? 'Browsing in Offline Mode — Content is cached and ready to explore!' 
          : 'أنت تتصفح في وضع عدم الاتصال (Offline) - المحتوى محفوظ وجاهز للاستخدام!'}
      </span>
    </div>
  );
};
