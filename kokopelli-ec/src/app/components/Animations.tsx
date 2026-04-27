'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

export function FadeInOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}) {
  const offset = 24;
  const initial =
    direction === 'up'
      ? { opacity: 0, y: offset }
      : direction === 'down'
        ? { opacity: 0, y: -offset }
        : direction === 'left'
          ? { opacity: 0, x: offset }
          : { opacity: 0, x: -offset };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {text}
    </motion.span>
  );
}

export function CountUp({
  end,
  duration = 1.5,
  className,
  suffix = '',
  prefix = '',
}: {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    let frame: number;
    const step = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
    >
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </motion.span>
  );
}

export function Parallax({
  children,
  speed = 0.3,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  void speed;
  return <div className={className}>{children}</div>;
}

export function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
    >
      {children}
    </motion.button>
  );
}

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className={
        className ?? 'fixed top-0 left-0 right-0 h-1 bg-amber-500 z-50 pointer-events-none'
      }
    />
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -4,
        boxShadow: '0 20px 40px -12px rgba(245, 158, 11, 0.25)',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
