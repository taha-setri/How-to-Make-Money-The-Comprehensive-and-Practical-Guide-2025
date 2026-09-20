import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Download, 
  Sparkles, 
  X, 
  User, 
  Briefcase, 
  ShieldCheck, 
  Award, 
  Check, 
  Share2,
  Calendar,
  Zap,
  Star,
  QrCode
} from 'lucide-react';
import { IncomeStream } from '../types';

interface SkillBadgeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedStream?: IncomeStream | null;
  timeCommitment?: string;
  capitalLevel?: string;
  defaultUserName?: string;
}

export const SkillBadgeCardModal: React.FC<SkillBadgeCardModalProps> = ({
  isOpen,
  onClose,
  matchedStream,
  timeCommitment = '2-3 ساعات',
  capitalLevel = '0$ رأس مال',
  defaultUserName = 'رائد أعمال رقمي'
}) => {
  const [userName, setUserName] = useState<string>(defaultUserName);
  const [cardTheme, setCardTheme] = useState<'emerald' | 'gold' | 'sapphire'>('emerald');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const cardCanvasRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentYear = '2026';
  const issueDate = new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

  // Generate and Download Card Image using HTML5 Canvas
  const handleDownloadCard = async () => {
    setIsGenerating(true);
    try {
      const cardEl = cardCanvasRef.current;
      if (!cardEl) return;

      // Create high-res canvas (retina 2x)
      const canvas = document.createElement('canvas');
      const width = 800;
      const height = 480;
      const scale = 2; // High resolution
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;
      ctx.scale(scale, scale);

      // Colors based on selected theme
      const themeColors = {
        emerald: {
          bg1: '#021812',
          bg2: '#064e3b',
          accent: '#10b981',
          accentLight: '#34d399',
          border: '#059669',
          glow: 'rgba(16, 185, 129, 0.25)',
          goldBadge: '#f59e0b'
        },
        gold: {
          bg1: '#181202',
          bg2: '#78350f',
          accent: '#f59e0b',
          accentLight: '#fbbf24',
          border: '#d97706',
          glow: 'rgba(245, 158, 11, 0.25)',
          goldBadge: '#10b981'
        },
        sapphire: {
          bg1: '#031326',
          bg2: '#1e3a8a',
          accent: '#06b6d4',
          accentLight: '#38bdf8',
          border: '#0284c7',
          glow: 'rgba(6, 182, 212, 0.25)',
          goldBadge: '#f59e0b'
        }
      }[cardTheme];

      // 1. Draw Background Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, themeColors.bg1);
      grad.addColorStop(0.5, '#090d16');
      grad.addColorStop(1, themeColors.bg2);

      // Rounded rectangle for card
      const radius = 28;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();

      // Outer Border
      ctx.lineWidth = 3;
      ctx.strokeStyle = themeColors.border;
      ctx.stroke();

      // Subtle Decorative Grid & Orbs
      ctx.fillStyle = themeColors.glow;
      ctx.beginPath();
      ctx.arc(width - 60, 60, 140, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(80, height - 60, 160, 0, Math.PI * 2);
      ctx.fill();

      // Top Bar: Brand & Issue Badge
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('بطاقة المهارة الرقمية المعتمدة • 2026', width - 45, 52);

      // Certificate / ID Number
      const cardIdNumber = `ID-${Math.floor(100000 + Math.random() * 900000)}`;
      ctx.font = 'bold 13px monospace';
      ctx.fillStyle = themeColors.accentLight;
      ctx.textAlign = 'left';
      ctx.fillText(cardIdNumber, 45, 50);

      // Divider Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(45, 75);
      ctx.lineTo(width - 45, 75);
      ctx.stroke();

      // User Name
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('اسم المستقل / رائد الأعمال:', width - 45, 115);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
      ctx.fillText(userName || 'رائد أعمال رقمي', width - 45, 155);

      // Matched Skill Domain / Title
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px system-ui, -apple-system, sans-serif';
      ctx.fillText('المسار التخصصي المعتمد (2026):', width - 45, 205);

      ctx.fillStyle = themeColors.accentLight;
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      const domainTitle = matchedStream?.title || 'مهارات الاقتصاد الرقمي والعمل الحر';
      ctx.fillText(domainTitle, width - 45, 240);

      // Category & Target Hourly Rate
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '16px system-ui, -apple-system, sans-serif';
      const categoryText = `${matchedStream?.categoryLabel || 'مهارات رقمية'} • الدخل المستهدف: ${matchedStream?.baseHourlyRate || 25}$ / ساعة`;
      ctx.fillText(categoryText, width - 45, 275);

      // 3 Feature Badges on Bottom
      const badges = [
        { label: 'ساعات العمل اليومية', val: timeCommitment },
        { label: 'رأس مال البداية', val: capitalLevel },
        { label: 'سرعة سحب الأرباح', val: matchedStream?.payoutSpeed || 'أسبوعي / عند الطلب' }
      ];

      badges.forEach((b, idx) => {
        const boxX = width - 45 - (idx * 230) - 210;
        const boxY = 320;
        const boxW = 210;
        const boxH = 65;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxW, boxH, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(b.label, boxX + boxW - 14, boxY + 24);

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
        ctx.fillText(b.val, boxX + boxW - 14, boxY + 48);
      });

      // Bottom Watermark & Verification
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.font = '11px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`تاريخ الإصدار: ${issueDate} • منصة العمل والربح الواقعي 2026`, width - 45, 435);

      ctx.textAlign = 'left';
      ctx.fillStyle = themeColors.accentLight;
      ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
      ctx.fillText('✓ تم التحقق والمطابقة بواسطة محدد المسار الذكي', 45, 435);

      // Convert canvas to image download
      const imageURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Skill-Badge-2026-${(userName || 'pro').replace(/\s+/g, '-')}.png`;
      link.href = imageURL;
      link.click();
    } catch (err) {
      console.error('Failed to export skill badge card', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden relative glow-luxury-emerald my-6"
      >
        {/* Header Modal Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">توليد بطاقة المهارة الرقمية (2026)</h3>
              <p className="text-xs text-slate-400">بطاقة عمل رقمية رسمية قابلة للحفظ والمشاركة</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customization Controls: Name & Card Theme */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>اسمك على البطاقة:</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="أدخل اسمك أو لقبك المهني"
                className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden transition-all text-right"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>سمة البطاقة اللونية:</span>
              </label>
              <div className="flex items-center gap-2">
                {[
                  { id: 'emerald', label: 'زمردي رقمي', bg: 'bg-emerald-600' },
                  { id: 'gold', label: 'عنبر ذهبي', bg: 'bg-amber-600' },
                  { id: 'sapphire', label: 'ياقوت سيبراني', bg: 'bg-cyan-600' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCardTheme(t.id as any)}
                    className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      cardTheme === t.id
                        ? 'border-white/80 bg-slate-800 text-white shadow-sm'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${t.bg}`} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Visual Card Preview (WYSIWYG) */}
          <div className="relative">
            <div 
              ref={cardCanvasRef}
              className={`rounded-2xl p-6 border shadow-2xl relative overflow-hidden transition-all text-right ${
                cardTheme === 'emerald' 
                  ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 border-emerald-500/60 glow-luxury-emerald'
                  : cardTheme === 'gold'
                  ? 'bg-gradient-to-br from-amber-950 via-slate-950 to-yellow-950 border-amber-500/60 glow-luxury-amber'
                  : 'bg-gradient-to-br from-cyan-950 via-slate-950 to-blue-950 border-cyan-500/60 glow-luxury-sapphire'
              }`}
            >
              {/* Background ambient shine */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              {/* Top Row: Brand & Certificate ID */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="text-[11px] font-mono text-emerald-400 bg-slate-950/60 px-2.5 py-0.5 rounded-md border border-white/10">
                  VERIFIED • 2026
                </div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>بطاقة المهارة الرقمية المعتمدة</span>
                </div>
              </div>

              {/* User Name & Domain */}
              <div className="mb-4">
                <div className="text-[11px] text-slate-400 mb-0.5">اسم المحترف الرقمي:</div>
                <div className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  {userName || 'رائد أعمال رقمي'}
                </div>
              </div>

              <div className="mb-5 bg-slate-950/50 p-3 rounded-xl border border-white/10">
                <div className="text-[11px] text-slate-400 mb-0.5">المسار التخصصي المستخرج:</div>
                <div className={`text-base sm:text-lg font-black ${
                  cardTheme === 'emerald' ? 'text-emerald-300' : cardTheme === 'gold' ? 'text-amber-300' : 'text-cyan-300'
                }`}>
                  {matchedStream?.title || 'مهارات الاقتصاد الرقمي والعمل الحر'}
                </div>
                <div className="text-xs text-slate-300 mt-1 flex items-center gap-2">
                  <span>{matchedStream?.categoryLabel || 'مهارات رقمية'}</span>
                  <span>•</span>
                  <span className="text-amber-300 font-bold font-mono">
                    متوسط الدخل: {matchedStream?.baseHourlyRate || 25}$ / ساعة
                  </span>
                </div>
              </div>

              {/* Badges Matrix */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">ساعات العمل</div>
                  <div className="text-xs font-bold text-white mt-0.5">{timeCommitment}</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">رأس المال</div>
                  <div className="text-xs font-bold text-white mt-0.5">{capitalLevel}</div>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl border border-white/5">
                  <div className="text-[10px] text-slate-400">صرف الأرباح</div>
                  <div className="text-xs font-bold text-white mt-0.5 truncate">{matchedStream?.payoutSpeed || 'أسبوعي'}</div>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-4 pt-2 border-t border-white/5">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>معتمد وفق معايير 2026 للعمل الحر</span>
                </span>
                <span>{issueDate}</span>
              </div>
            </div>
          </div>

          {/* Action Download & Share Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadCard}
              disabled={isGenerating}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black py-3 px-6 rounded-xl shadow-lg transition-all text-sm cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'جارٍ توليد وتحميل الصورة...' : 'حفظ الصورة بدقة عالية (PNG)'}</span>
            </motion.button>

            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-5 py-3 rounded-xl border border-slate-700 text-sm font-bold transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">تم نسخ الرابط!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة الرابط</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillBadgeCardModal;
