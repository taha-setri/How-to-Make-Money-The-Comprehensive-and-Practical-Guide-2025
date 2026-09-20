import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Copy, 
  CheckCircle2, 
  Sparkles, 
  Bot, 
  Send, 
  MessageSquare, 
  ShieldAlert, 
  Tag, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { PROMPT_TEMPLATES_DATA } from '../data/templatesData';
import { PromptTemplate } from '../types';

interface PromptTemplateVaultProps {
  onCopyTemplate?: (templateTitle: string) => void;
  templates?: PromptTemplate[];
}

export const PromptTemplateVault: React.FC<PromptTemplateVaultProps> = ({ onCopyTemplate, templates }) => {
  const currentTemplates = templates && templates.length > 0 ? templates : PROMPT_TEMPLATES_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (template: PromptTemplate) => {
    navigator.clipboard.writeText(template.content);
    setCopiedId(template.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);

    if (onCopyTemplate) {
      onCopyTemplate(template.title);
    }
  };

  const categories = [
    { id: 'all', label: 'كافة النماذج والبرومبتات' },
    { id: 'freelance', label: 'عروض منصات العمل الحر' },
    { id: 'pitch', label: 'المراسلة المباشرة للشركات' },
    { id: 'ai_prompt', label: 'برومبتات ChatGPT و Claude' },
    { id: 'followup', label: 'متابعة العميل وتقييم 5 نجوم' },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? currentTemplates
    : currentTemplates.filter(t => t.category === selectedCategory);

  return (
    <section id="prompt-templates-vault" className="my-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          {/* Looping ambient glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500 rounded-full blur-3xl pointer-events-none" 
          />

          <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
            <div className="max-w-2xl">
              <motion.div 
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-black mb-3"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>أدوات النسخ المباشر بنقرة واحدة (One-Click Copy Assets)</span>
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                خزينة البرومبتات ونماذج مراسلة العملاء الجاهزة
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                لا تبدأ من الصفر! وفر ساعات من التفكير واعتمد على صيغ تفاوض وبرومبتات ذكاء اصطناعي أثبتت نجاحها في استقطاب صفقات فعلية وإغلاق العقود.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-2xl border border-slate-700 text-xs text-slate-300">
              <Bot className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
              <span>جاهزة للنسخ واللصق في ChatGPT أو منصات العمل الحر مباشرة</span>
            </div>
          </div>

          {/* Category Filter Tabs with Interactive Animations */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-6 border-t border-slate-700/70 pt-6 relative z-10">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30 ring-1 ring-emerald-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Templates Grid with Interactive Animations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template) => {
              const isCopied = copiedId === template.id;

              return (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  whileHover={{ y: -5, borderColor: 'rgba(16, 185, 129, 0.5)' }}
                  transition={{ duration: 0.25 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between transition-colors group relative overflow-hidden"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        {template.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                        {template.targetPlatform}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-300 transition-colors mb-2 leading-snug">
                      {template.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {template.description}
                    </p>

                    {/* Copyable Box */}
                    <div className="relative bg-slate-950/90 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto mb-4 scrollbar-thin">
                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-200">
                        {template.content}
                      </pre>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-emerald-950/40 border border-emerald-900/50 rounded-xl p-3 text-[11px] text-emerald-300 flex items-start gap-2 mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                      <span>
                        <strong className="text-white">توجيه عملي:</strong> {template.proTip}
                      </span>
                    </div>
                  </div>

                  {/* Footer Copy Action with Animated Feedback */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      انقر للنسخ واستبدل المتغيرات [بين الأقواس]
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleCopy(template)}
                      className={`inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>تم النسخ بنجاح! جاهز للإرسال</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-emerald-400" />
                          <span>نسخ القالب كاملاً</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
