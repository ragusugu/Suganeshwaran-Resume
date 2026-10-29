import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { synthetic } from '../content';
import { CheckIcon, DownloadIcon, PauseIcon, PlayIcon, SparkleIcon } from './Icons';
import { Chip, EASE, Reveal, SectionHeading, SpotlightCard } from './ui';

const STEP_MS = 4200;

// A small example schema used by the animation. It illustrates the flow; it is not real data.
const schema = [
  { name: 'customers', cols: ['id', 'name', 'city'] },
  { name: 'orders', cols: ['id', 'customer_id', 'total'] },
  { name: 'payments', cols: ['id', 'order_id', 'amount'] },
];

function TableCard({ name, cols, delay = 0 }: { name: string; cols: string[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="min-w-0 rounded-xl border border-line bg-surface p-2.5 font-mono text-[10px] leading-5 shadow-sm sm:text-[11px]"
    >
      <p className="truncate font-semibold text-ink">{name}</p>
      <ul className="mt-1 text-ink-2">
        {cols.map((col) => (
          <li key={col} className={col.endsWith('_id') ? 'text-tide-ink' : ''}>
            {col}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Scene({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="absolute inset-0 flex flex-col justify-center gap-4 p-5 pt-12 sm:p-8 sm:pt-14"
    >
      {children}
    </motion.div>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] text-ink-2">{children}</p>;
}

function UploadScene() {
  return (
    <Scene>
      <div className="grid grid-cols-3 gap-3">
        {schema.map((table, i) => (
          <TableCard key={table.name} {...table} delay={0.1 + i * 0.18} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
        className="flex items-center gap-2 self-start rounded-full border border-tide/30 bg-tide/10 px-3 py-1.5 text-xs font-medium text-tide-ink"
      >
        <CheckIcon size={14} /> Schema uploaded
      </motion.div>
    </Scene>
  );
}

function AnalyzeScene() {
  const links = ['customer_id → id', 'order_id → id'];
  return (
    <Scene>
      <div className="flex items-center gap-2 self-start rounded-full border border-tide/30 bg-tide/10 px-3 py-1.5 text-xs font-medium text-tide-ink">
        <span className="relative flex h-2 w-2">
          <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-tide/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-tide" />
        </span>
        Azure OpenAI is analyzing the tables
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 sm:gap-2">
        <TableCard {...schema[0]} />
        <Link label={links[0]} delay={0.3} />
        <TableCard {...schema[1]} />
        <Link label={links[1]} delay={0.8} />
        <TableCard {...schema[2]} />
      </div>
      <Caption>Relationships found between the tables</Caption>
    </Scene>
  );
}

function Link({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="flex w-10 flex-col items-center gap-1 sm:w-14">
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay, duration: 0.7, ease: EASE }}
        className="h-0.5 w-full origin-left rounded-full bg-tide"
      />
      <span className="hidden text-center font-mono text-[9px] leading-tight text-ink-2 sm:block">{label}</span>
    </div>
  );
}

function TuneScene() {
  const rows = [
    { name: 'customers', width: 38, count: '1,000' },
    { name: 'orders', width: 82, count: '4,000' },
    { name: 'payments', width: 72, count: '3,800' },
  ];
  return (
    <Scene>
      <Caption>Recommended row counts</Caption>
      <ul className="space-y-3">
        {rows.map((row, i) => (
          <li
            key={row.name}
            className="grid grid-cols-[5.5rem_1fr_3rem] items-center gap-3 text-xs sm:grid-cols-[6.5rem_1fr_3.5rem]"
          >
            <span className="font-mono text-ink-2">{row.name}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-line">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${row.width}%` }}
                transition={{ delay: 0.2 + i * 0.18, duration: 0.9, ease: EASE }}
                className="block h-full rounded-full bg-tide"
              />
            </span>
            <span className="text-right font-mono text-ink">{row.count}</span>
          </li>
        ))}
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: EASE }}
        className="flex items-center gap-2 self-start rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-2"
      >
        Suggested error rate <span className="font-mono font-medium text-ink">2%</span>
      </motion.div>
    </Scene>
  );
}

function PreviewScene() {
  const rows = [
    ['1', 'Meera Nair', 'Chennai'],
    ['2', 'Liam Carter', 'Leeds'],
    ['3', 'Aiko Tanaka', 'Osaka'],
  ];
  return (
    <Scene>
      <Caption>Seed preview: customers</Caption>
      <div className="overflow-hidden rounded-xl border border-line bg-surface font-mono text-[11px] sm:text-xs">
        <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-2 border-b border-line bg-surface-2/60 px-3 py-2 text-ink-2">
          <span>id</span>
          <span>name</span>
          <span>city</span>
        </div>
        {rows.map((row, i) => (
          <motion.div
            key={row[0]}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.35, duration: 0.5, ease: EASE }}
            className="grid grid-cols-[2.5rem_1fr_1fr] gap-2 border-b border-line px-3 py-2 last:border-b-0"
          >
            {row.map((cell, c) => (
              <span key={c} className="truncate">
                {cell}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </Scene>
  );
}

function GenerateScene() {
  return (
    <Scene>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border border-tide/30 bg-tide/10 px-3 py-1.5 text-xs font-medium text-tide-ink">
          <span className="relative flex h-2 w-2">
            <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-tide/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tide" />
          </span>
          Background job running
        </div>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-line">
        <motion.div
          initial={{ width: '4%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="medal-gradient h-full rounded-full"
        />
      </div>
      <ul className="space-y-2">
        {schema.map((table, i) => (
          <li key={table.name} className="flex items-center justify-between font-mono text-xs text-ink-2">
            <span>{table.name}</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.7, type: 'spring', duration: 0.5, bounce: 0.3 }}
              className="text-tide-ink"
            >
              <CheckIcon size={16} />
            </motion.span>
          </li>
        ))}
      </ul>
    </Scene>
  );
}

function DownloadScene() {
  const files = ['CSV', 'ZIP', 'Excel'];
  return (
    <Scene>
      <Caption>Ready in Azure Blob Storage</Caption>
      <div className="grid grid-cols-3 gap-3">
        {files.map((file, i) => (
          <motion.div
            key={file}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.2, duration: 0.55, ease: EASE }}
            className="flex flex-col items-center gap-2 rounded-xl border border-line bg-surface px-2 py-4 text-ink"
          >
            <DownloadIcon size={20} className="text-tide-ink" />
            <span className="font-mono text-xs font-medium">{file}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="flex items-center gap-2 self-start rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink-2"
      >
        <CheckIcon size={14} className="text-tide-ink" /> SAS-token download
      </motion.div>
    </Scene>
  );
}

const scenes = [UploadScene, AnalyzeScene, TuneScene, PreviewScene, GenerateScene, DownloadScene];

export function SyntheticData() {
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useInView(rootRef, { amount: 0.4 });
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const playing = visible && !paused;
  const Active = scenes[step];

  // Walk through the steps by itself while it is on screen. Clicking a step, or the pause button, stops it.
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setStep((current) => (current + 1) % synthetic.steps.length), STEP_MS);
    return () => clearTimeout(timer);
  }, [playing, step]);

  return (
    <section id="ai" aria-labelledby="ai-title" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-tide/30 bg-tide/10 py-1 pl-2.5 pr-3 text-sm font-medium text-tide-ink">
          <SparkleIcon size={16} />
          Featured project
        </div>
        <SectionHeading id="ai-title" title={synthetic.title} lead={synthetic.lead} />

        <div ref={rootRef} className="mt-12 grid items-start gap-8 md:mt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <ol className="space-y-1">
              {synthetic.steps.map((item, i) => {
                const active = i === step;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      aria-current={active ? 'step' : undefined}
                      onClick={() => {
                        setStep(i);
                        setPaused(true);
                      }}
                      className={`relative flex w-full gap-4 rounded-2xl px-4 py-3.5 text-left transition-colors ${
                        active ? 'bg-surface/80 ring-1 ring-tide/40' : 'hover:bg-surface/50'
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-xs transition-colors ${
                          active ? 'border-tide bg-tide text-bg' : 'border-line text-ink-2'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-display text-lg font-semibold ${active ? 'text-ink' : 'text-ink-2'}`}
                        >
                          {item.title}
                        </span>
                        <span className="mt-1 block leading-relaxed text-ink-2">{item.body}</span>
                      </span>
                      {active && playing && (
                        <motion.span
                          key={step}
                          aria-hidden="true"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                          className="medal-gradient absolute inset-x-4 bottom-1 h-0.5 origin-left rounded-full"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
            <button
              type="button"
              onClick={() => setPaused((current) => !current)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm font-semibold transition-colors hover:border-tide/50"
            >
              {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
              {paused ? 'Resume auto-play' : 'Pause auto-play'}
            </button>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-28">
            <div
              aria-hidden="true"
              className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-bg/60 sm:aspect-[4/3]"
            >
              <div className="blueprint absolute inset-0 opacity-50" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-bronze/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-silver/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                </span>
                <span className="rounded-full border border-line bg-surface/80 px-2.5 py-1 font-mono text-[10px] text-ink-2">
                  Illustrative example
                </span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <Active key={step} />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold tracking-tight">{synthetic.platformTitle}</h3>
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {synthetic.platform.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <SpotlightCard className="h-full">
                    <div className="p-5 md:p-6">
                      <Chip tone="tide">{item.title}</Chip>
                      <p className="mt-3 font-medium leading-snug">{item.body}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
