'use client';
import { motion, useReducedMotion, useScroll, useSpring, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

const ease = [0.2, 0.7, 0.2, 1] as const;
type Tag = 'div' | 'li' | 'h1' | 'h2' | 'p' | 'ul' | 'figure';
type P = { children: ReactNode; className?: string; tag?: Tag };

/** Fade-up when scrolled into view (once). */
export function Reveal({ children, className, tag = 'div', delay = 0 }: P & { delay?: number }) {
  const Tag = motion[tag] as typeof motion.div;
  return (
    <Tag className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </Tag>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item: Variants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

/** Staggered group; children must be <Item>. Plays on mount (hero) or when in view. */
export function Stagger({ children, className, tag = 'div', inView = false }: P & { inView?: boolean }) {
  const Tag = motion[tag] as typeof motion.div;
  return (
    <Tag className={className} variants={container} initial="hidden"
      {...(inView ? { whileInView: 'show', viewport: { once: true, amount: 0.15 } } : { animate: 'show' })}>
      {children}
    </Tag>
  );
}
export function Item({ children, className, tag = 'div' }: P) {
  const Tag = motion[tag] as typeof motion.div;
  return <Tag className={className} variants={item}>{children}</Tag>;
}

/** Image/figure reveal through a clip-path wipe. */
export function ClipFigure({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.figure className={className} style={{ margin: 0 }}
      initial={reduce ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 1.1, delay: 0.2, ease: [0.7, 0, 0.2, 1] }}>
      {children}
    </motion.figure>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div id="pg" style={{ scaleX }} aria-hidden="true" />;
}
