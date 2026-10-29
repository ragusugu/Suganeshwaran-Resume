import { useEffect, useRef } from 'react';
import { useFinePointer } from '../hooks';

/** Fixed page backdrop: a blueprint grid with a soft glow that follows the cursor. */
export function Backdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  useEffect(() => {
    if (!fine) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty('--mx', `${event.clientX}px`);
        ref.current?.style.setProperty('--my', `${event.clientY}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [fine]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="blueprint absolute inset-0 opacity-60" />
      <div className="cursor-glow absolute inset-0" />
    </div>
  );
}

const streams = [
  { top: '14%', width: 220, duration: 16, delay: 0, color: 'var(--bronze)' },
  { top: '30%', width: 160, duration: 21, delay: 7, color: 'var(--tide)' },
  { top: '52%', width: 260, duration: 18, delay: 3, color: 'var(--silver)' },
  { top: '68%', width: 180, duration: 24, delay: 11, color: 'var(--gold)' },
  { top: '86%', width: 200, duration: 19, delay: 5, color: 'var(--tide)' },
];

/** Thin lines of light that drift across the hero, like data moving through wires. */
export function DataStreams() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] overflow-hidden">
      {streams.map((stream, index) => (
        <span
          key={index}
          className="stream absolute left-0 block h-px opacity-40"
          style={{
            top: stream.top,
            width: stream.width,
            animationDuration: `${stream.duration}s`,
            animationDelay: `-${stream.delay}s`,
            background: `linear-gradient(90deg, transparent, ${stream.color}, transparent)`,
          }}
        />
      ))}
    </div>
  );
}
