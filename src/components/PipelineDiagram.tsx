import { AnimatePresence, animate, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { stages, type Stage, type StageKind } from '../content';
import { useReducedMotion } from '../motion';
import { PauseIcon, PlayIcon } from './Icons';
import { Chip, EASE } from './ui';

// Diagram geometry, in SVG user units. Buttons are positioned with the same numbers (as percentages)
// so the HTML nodes and the SVG edges always line up at any width.
const W = 1100;
const H = 340;
const NODE_W = 124;
const NODE_H = 68;
const ROW_Y = 176;
const MAIN_IDS = ['sources', 'ingest', 'bronze', 'silver', 'gold', 'serve'];
const STEP = (W - NODE_W) / (MAIN_IDS.length - 1);
const cx = (i: number) => NODE_W / 2 + i * STEP;

interface Box {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

const mainBoxes: Box[] = MAIN_IDS.map((id, i) => ({
  id,
  x: cx(i) - NODE_W / 2,
  y: ROW_Y - NODE_H / 2,
  w: NODE_W,
  h: NODE_H,
}));
const orchestrateBox: Box = { id: 'orchestrate', x: cx(1) - NODE_W / 2, y: 27, w: cx(3) - cx(1) + NODE_W, h: 46 };
const platformBox: Box = { id: 'platform', x: 0, y: 273, w: W, h: 46 };

const stageById = Object.fromEntries(stages.map((s) => [s.id, s])) as Record<string, Stage>;

const kindColor: Record<StageKind, string> = {
  tide: 'var(--tide)',
  bronze: 'var(--bronze)',
  silver: 'var(--silver)',
  gold: 'var(--gold)',
  muted: 'var(--ink-2)',
};
const colorOf = (id: string) => kindColor[stageById[id].kind];
const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const DWELL_MS = 3200; // how long the panel stays on each stage while the pipeline runs itself
const TRAVEL_S = 0.8;

export function PipelineDiagram() {
  const rootRef = useRef<HTMLElement>(null);
  const packetRef = useRef<SVGGElement>(null);
  const reduce = useReducedMotion();
  const visible = useInView(rootRef, { amount: 0.35 });
  const seen = useInView(rootRef, { once: true, amount: 0.1 });

  const [running, setRunning] = useState(-1); // index into MAIN_IDS of the stage the packet just reached
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const userSelected = hovered !== null || pinned !== null;

  // The pipeline "runs" by itself while it is on screen, and stops as soon as someone interacts with it.
  useEffect(() => {
    if (reduce || !visible || userSelected || paused) {
      setRunning(-1);
      return;
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let flight: { stop: () => void } | null = null;
    const packet = packetRef.current;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const travel = (i: number) =>
      new Promise<void>((resolve) => {
        const x1 = cx(i) + NODE_W / 2;
        const x2 = cx(i + 1) - NODE_W / 2;
        const from = colorOf(MAIN_IDS[i]);
        const to = colorOf(MAIN_IDS[i + 1]);
        packet?.style.setProperty('opacity', '1');
        flight = animate(0, 1, {
          duration: TRAVEL_S,
          ease: 'easeInOut',
          onUpdate: (p) => {
            packet?.setAttribute('transform', `translate(${x1 + (x2 - x1) * p} ${ROW_Y})`);
            packet?.style.setProperty('color', p < 0.5 ? from : to);
          },
          onComplete: resolve,
        });
      });

    const run = async () => {
      await sleep(900);
      while (!cancelled) {
        for (let i = 0; i < MAIN_IDS.length; i++) {
          if (cancelled) return;
          setRunning(i);
          await sleep(DWELL_MS);
          if (i < MAIN_IDS.length - 1) await travel(i);
        }
        packet?.style.setProperty('opacity', '0');
        await sleep(600);
      }
    };
    void run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      flight?.stop();
      packet?.style.setProperty('opacity', '0');
    };
  }, [reduce, visible, userSelected, paused]);

  const selectedId = hovered ?? pinned ?? (running >= 0 ? MAIN_IDS[running] : 'sources');
  const selected = stageById[selectedId];

  const select = (id: string) => ({
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered(null),
    onFocus: () => setHovered(id),
    onBlur: () => setHovered(null),
    onClick: () => setPinned((current) => (current === id ? null : id)),
  });

  return (
    <figure ref={rootRef} aria-label="Data pipeline stages, from sources to serving" className="relative">
      {/* Desktop and tablet: the full diagram */}
      <div className="relative hidden aspect-[1100/340] w-full md:block">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {/* Orchestrator and platform links (dashed) */}
          {[1, 2, 3].map((k) => (
            <motion.path
              key={`o${k}`}
              d={`M${cx(k)} ${orchestrateBox.y + orchestrateBox.h} V${ROW_Y - NODE_H / 2}`}
              fill="none"
              stroke="var(--ink-2)"
              strokeWidth="1.25"
              strokeDasharray="4 5"
              initial={reduce ? false : { opacity: 0 }}
              animate={seen ? { opacity: 0.4 } : undefined}
              transition={{ delay: 1.1, duration: 0.8 }}
            />
          ))}
          {MAIN_IDS.map((_, i) => (
            <motion.path
              key={`p${i}`}
              d={`M${cx(i)} ${ROW_Y + NODE_H / 2} V${platformBox.y}`}
              fill="none"
              stroke="var(--ink-2)"
              strokeWidth="1.25"
              strokeDasharray="4 5"
              initial={reduce ? false : { opacity: 0 }}
              animate={seen ? { opacity: 0.3 } : undefined}
              transition={{ delay: 1.2, duration: 0.8 }}
            />
          ))}

          {/* Main flow (solid, drawn in left to right) */}
          {MAIN_IDS.slice(0, -1).map((_, i) => {
            const x1 = cx(i) + NODE_W / 2;
            const x2 = cx(i + 1) - NODE_W / 2;
            return (
              <motion.path
                key={`m${i}`}
                d={`M${x1} ${ROW_Y} H${x2} m-7 -5 l7 5 l-7 5`}
                fill="none"
                stroke="var(--ink-2)"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={seen ? { pathLength: 1, opacity: 0.75 } : undefined}
                transition={{ delay: 0.25 + i * 0.16, duration: 0.6, ease: EASE }}
              />
            );
          })}

          {/* The data packet that travels the main flow */}
          <g ref={packetRef} style={{ opacity: 0, color: 'var(--tide)' }}>
            <circle r="13" fill="currentColor" opacity="0.18" />
            <circle r="5.5" fill="currentColor" />
          </g>
        </svg>

        {[...mainBoxes, orchestrateBox, platformBox].map((box) => {
          const stage = stageById[box.id];
          const color = colorOf(box.id);
          const isMain = MAIN_IDS.includes(box.id);
          const isRunning = isMain && MAIN_IDS[running] === box.id;
          const isSelected = selectedId === box.id;
          const wide = box.w > NODE_W;
          return (
            <motion.button
              key={box.id}
              type="button"
              aria-pressed={pinned === box.id}
              aria-controls="pipeline-detail"
              {...select(box.id)}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={seen ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.15 + (isMain ? MAIN_IDS.indexOf(box.id) * 0.1 : 0.9), duration: 0.7, ease: EASE }}
              className="absolute flex items-center justify-center gap-2 rounded-2xl border bg-surface/80 px-2 text-center backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-300 hover:bg-surface"
              style={{
                left: pct(box.x, W),
                top: pct(box.y, H),
                width: pct(box.w, W),
                height: pct(box.h, H),
                borderColor: isRunning || isSelected ? color : 'var(--line)',
                boxShadow: isRunning
                  ? `0 0 0 4px color-mix(in oklab, ${color} 20%, transparent), 0 14px 32px -14px ${color}`
                  : isSelected
                    ? `0 0 0 3px color-mix(in oklab, ${color} 14%, transparent)`
                    : undefined,
              }}
            >
              {isRunning && (
                <span
                  aria-hidden="true"
                  className="ping-soft pointer-events-none absolute inset-0 rounded-2xl border-2"
                  style={{ borderColor: color }}
                />
              )}
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
              <span className={wide ? 'flex items-baseline gap-3' : 'flex min-w-0 flex-col'}>
                <span className="font-display text-xs font-semibold text-ink sm:text-sm">{stage.label}</span>
                <span className="hidden truncate font-mono text-[10px] text-ink-2 lg:block">{stage.node}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Phones: the same stages as a vertical run */}
      <ol className="relative mx-auto max-w-sm md:hidden">
        <span aria-hidden="true" className="absolute bottom-3 left-[11px] top-3 w-px bg-line" />
        {[...MAIN_IDS, 'orchestrate', 'platform'].map((id) => {
          const stage = stageById[id];
          const color = colorOf(id);
          const isRunning = MAIN_IDS[running] === id;
          const isSelected = selectedId === id;
          return (
            <li key={id} className="relative">
              <button
                type="button"
                aria-pressed={pinned === id}
                aria-controls="pipeline-detail"
                {...select(id)}
                className="flex min-h-11 w-full items-center gap-4 py-1.5 text-left"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border bg-bg transition-[border-color,box-shadow] duration-300"
                  style={{
                    borderColor: isRunning || isSelected ? color : 'var(--line)',
                    boxShadow: isRunning ? `0 0 0 4px color-mix(in oklab, ${color} 22%, transparent)` : undefined,
                  }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                </span>
                <span className="flex flex-col">
                  <span className={`font-display text-base font-semibold ${isSelected ? 'text-ink' : 'text-ink-2'}`}>
                    {stage.label}
                  </span>
                  <span className="font-mono text-[11px] text-ink-2">{stage.mono}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* What I built at the selected stage */}
      <div
        id="pipeline-detail"
        aria-live={userSelected ? 'polite' : 'off'}
        className="mt-6 min-h-[12.5rem] rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur-sm md:min-h-[10.5rem] md:p-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="grid gap-5 md:grid-cols-[1.5fr_1fr]"
          >
            <div>
              <p className="flex items-center gap-2 font-mono text-xs text-ink-2">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ background: colorOf(selected.id) }}
                />
                {selected.mono}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight">{selected.label}</p>
              <p className="mt-2 max-w-prose leading-relaxed text-ink-2">{selected.body}</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((item) => (
                  <Chip key={item} tone="tide">
                    {item}
                  </Chip>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-2">From: {selected.from}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-between">
        <figcaption className="text-center text-sm text-ink-2 md:text-left">
          {pinned
            ? 'Click the selected stage again to let the pipeline run on its own.'
            : 'Hover or tap any stage to see what I built there.'}
        </figcaption>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm font-semibold transition-colors hover:border-tide/50"
          >
            {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
            {paused ? 'Play animation' : 'Pause animation'}
          </button>
        )}
      </div>
    </figure>
  );
}
