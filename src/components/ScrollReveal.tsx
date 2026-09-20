import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  delay?: number;
  duration?: number;
  threshold?: number;
  scale?: number;
  blur?: boolean;
  once?: boolean;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  distance = 32,
  delay = 0,
  duration = 0.65,
  threshold = 0.12,
  scale = 0.98,
  blur = false,
  once = true,
  id,
  ...rest
}) => {
  const getInitialOffsets = () => {
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialOffset = getInitialOffsets();

  return (
    <motion.div
      id={id}
      className={className}
      initial={{
        opacity: 0,
        x: initialOffset.x,
        y: initialOffset.y,
        scale: scale,
        filter: blur ? 'blur(8px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: blur ? 'blur(0px)' : 'none',
      }}
      viewport={{
        once,
        amount: threshold,
        margin: '0px 0px -40px 0px',
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier luxury ease
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
