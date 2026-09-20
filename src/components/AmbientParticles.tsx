import React from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  symbol: string;
  x: number; // percentage
  y: number; // percentage
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

const PARTICLES: Particle[] = [
  { id: 1, symbol: '$', x: 8, y: 15, size: 24, duration: 9, delay: 0, opacity: 0.18, color: 'text-emerald-400' },
  { id: 2, symbol: '✦', x: 92, y: 18, size: 20, duration: 8, delay: 1.5, opacity: 0.25, color: 'text-amber-300' },
  { id: 3, symbol: '€', x: 14, y: 65, size: 22, duration: 11, delay: 2, opacity: 0.15, color: 'text-teal-400' },
  { id: 4, symbol: '★', x: 85, y: 72, size: 18, duration: 7, delay: 0.5, opacity: 0.22, color: 'text-amber-400' },
  { id: 5, symbol: '⚡', x: 5, y: 88, size: 20, duration: 10, delay: 3, opacity: 0.2, color: 'text-emerald-300' },
  { id: 6, symbol: '£', x: 94, y: 48, size: 22, duration: 12, delay: 1, opacity: 0.14, color: 'text-emerald-400' },
  { id: 7, symbol: '💎', x: 22, y: 38, size: 16, duration: 9, delay: 2.5, opacity: 0.22, color: 'text-teal-300' },
  { id: 8, symbol: '📈', x: 78, y: 32, size: 18, duration: 10, delay: 1.8, opacity: 0.2, color: 'text-emerald-400' },
  { id: 9, symbol: '✦', x: 45, y: 8, size: 16, duration: 8, delay: 0.2, opacity: 0.18, color: 'text-amber-200' },
  { id: 10, symbol: '$', x: 62, y: 85, size: 26, duration: 13, delay: 3.2, opacity: 0.16, color: 'text-emerald-400' },
];

export const AmbientParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic drifting luxury orbs */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 50, 0],
          scale: [1, 1.25, 0.9, 1],
          opacity: [0.12, 0.24, 0.14, 0.12],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: 'easeInOut',
        }}
        className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-600/20 via-teal-500/15 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -70, 45, 0],
          y: [0, 90, -60, 0],
          scale: [1, 1.3, 0.95, 1],
          opacity: [0.08, 0.2, 0.1, 0.08],
        }}
        transition={{
          repeat: Infinity,
          duration: 26,
          ease: 'easeInOut',
        }}
        className="absolute top-2/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/15 via-emerald-600/10 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [0.95, 1.15, 1, 0.95],
          opacity: [0.06, 0.16, 0.08, 0.06],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/8 to-amber-500/10 rounded-full blur-3xl"
      />

      {/* Floating geometric symbols & currency glyphs with continuous floating trajectory */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
          }}
          animate={{
            y: [0, -25, 8, 0],
            x: [0, 15, -12, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.18, 0.92, 1],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.7, p.opacity],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          className={`absolute font-black ${p.color} filter drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]`}
        >
          {p.symbol}
        </motion.div>
      ))}

      {/* Repeating fine matrix scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
    </div>
  );
};
