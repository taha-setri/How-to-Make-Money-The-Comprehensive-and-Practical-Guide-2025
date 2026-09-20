import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Sliders, 
  BarChart3, 
  Bell, 
  ShieldCheck, 
  Flame, 
  Lock, 
  ArrowDownCircle, 
  BookOpen,
  Radio,
  FileText,
  HelpCircle,
  Calculator
} from 'lucide-react';
import { ABTestVariant } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { BrandLogo } from './BrandLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { NetworkBar } from './NetworkBar';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentVariant: ABTestVariant;
  onOpenABModal: () => void;
  onOpenAnalytics: () => void;
  onOpenNotificationModal: () => void;
  hasNotificationsEnabled: boolean;
  announcementText?: string;
  badgeYear?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentVariant,
  onOpenABModal,
  onOpenAnalytics,
  onOpenNotificationModal,
  hasNotificationsEnabled,
  announcementText,
  badgeYear,
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg transition-all">
      {/* Top Network Bar (شريط الشبكة مع رابط الموقع السابق Fast Jigsaw Puzzle) */}
      <NetworkBar />

      {/* Top Urgency / Trust Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white text-xs sm:text-sm font-medium py-2 px-4 border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap text-center">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              {badgeYear || t.badgeYear}
            </span>
            <span className="text-slate-200">{announcementText || t.topAnnouncement}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-3 text-xs text-emerald-300 font-mono">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              {t.saveLocal}
            </span>
            <span className="text-emerald-500">•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {t.verifiedPlatforms}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo with Written Platform Name */}
        <a href="#" className="flex items-center group">
          <BrandLogo variant="full" size="md" />
        </a>

        {/* Quick Anchor Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-bold text-slate-300">
          <a href="#quick-selector" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <ArrowDownCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.pathFinderNav}</span>
          </a>
          <a href="#income-calculator" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.calculatorNav}</span>
          </a>
          <a href="#live-gigs-feed" className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{t.liveGigsNav}</span>
          </a>
          <a href="#income-streams" className="hover:text-emerald-400 transition-colors">
            {t.streamsNav}
          </a>
          <a href="#master-blueprint-section" className="hover:text-emerald-300 text-amber-300 transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t.masterGuideNav}</span>
          </a>
          <a href="#prompt-templates-vault" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.templatesVaultNav}</span>
          </a>
          <a href="#smart-faq-section" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.faqNav}</span>
          </a>
        </nav>

        {/* Utility / Growth Hacker & Monetization Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Switcher Button (English / العربية) */}
          <LanguageSwitcher />

          {/* A/B Testing Badge / Controller */}
          <motion.button
            id="ab-test-header-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenABModal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 text-xs font-bold transition-all cursor-pointer"
            title="A/B Testing Variants"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">A/B:</span>
            <span className="bg-purple-500/20 px-1.5 py-0.5 rounded text-[11px] uppercase font-mono text-purple-200">
              {currentVariant.id === 'variantA' ? 'A' : currentVariant.id === 'variantB' ? 'B' : 'C'}
            </span>
          </motion.button>

          {/* Analytics Dashboard Trigger */}
          <motion.button
            id="analytics-dashboard-header-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenAnalytics}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
            title={t.analyticsNav}
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden lg:inline">{t.analyticsNav}</span>
          </motion.button>

          {/* Push Notifications Toggle */}
          <motion.button
            id="push-notifications-header-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onOpenNotificationModal}
            className={`relative p-2 rounded-lg border text-xs transition-all cursor-pointer ${
              hasNotificationsEnabled 
                ? 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300' 
                : 'border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {!hasNotificationsEnabled && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-slate-950 animate-ping" />
            )}
          </motion.button>

          {/* Download App on Phone (PWA) Button */}
          <PWAInstallButton />

          {/* 100% Free Guide & Vault Link */}
          <motion.a
            id="free-vault-header-btn"
            href="#prompt-templates-vault"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-400 text-slate-950 text-xs sm:text-sm font-black px-3.5 py-2 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all relative overflow-hidden"
          >
            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-luxury-sheen pointer-events-none" />
            <BookOpen className="w-4 h-4 text-slate-950 relative z-10" />
            <span className="relative z-10">{t.freeVaultBtn}</span>
          </motion.a>
        </div>
      </div>
    </header>
  );
};
