import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import { useFinePointer } from '../hooks';

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts content into place once, the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A line of text that slides up out of a mask: the headline reveal. */
export function MaskLine({
  children,
  delay = 0,
  trigger = 'view',
  className,
}: {
  children: ReactNode;
  delay?: number;
  trigger?: 'load' | 'view';
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Watch the clipping wrapper: the moving child sits outside it until it animates in, so it can't be observed.
  const wrapRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: '0px 0px -12% 0px' });
  if (reduce) return <span className={`block ${className ?? ''}`}>{children}</span>;
  const shown = trigger === 'load' || inView;
  return (
    <span ref={wrapRef} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <motion.span
        className={`block ${className ?? ''}`}
        initial={{ y: '115%' }}
        animate={{ y: shown ? '0%' : '115%' }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function SectionHeading({
  id,
  title,
  lead,
  className = '',
}: {
  id: string;
  title: string;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <h2 id={id} className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        <MaskLine>{title}</MaskLine>
      </h2>
      {lead && (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}

/** Pulls its content gently toward the pointer. Only on devices with a precise pointer. */
export function Magnetic({
  children,
  strength = 0.28,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduce || !fine) return <div className={`inline-block ${className}`}>{children}</div>;

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - (box.left + box.width / 2)) * strength);
    y.set((event.clientY - (box.top + box.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to its value when scrolled into view. Screen readers get the final value straight away. */
export function Counter({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const format = (n: number) => `${n.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, decimals, suffix]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {format(reduce ? value : 0)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  );
}

/** A card whose border area glows where the pointer is. */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const box = element.getBoundingClientRect();
    element.style.setProperty('--sx', `${event.clientX - box.left}px`);
    element.style.setProperty('--sy', `${event.clientY - box.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group/card relative overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur-sm transition-colors duration-300 hover:border-tide/40 ${className}`}
    >
      <div
        aria-hidden="true"
        className="card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function Chip({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'tide' }) {
  const toneClass = tone === 'tide' ? 'border-tide/30 bg-tide/10 text-tide-ink' : 'border-line bg-bg/60 text-ink-2';
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${toneClass}`}>
      {children}
    </span>
  );
}
