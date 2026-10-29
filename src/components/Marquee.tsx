import { useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { PauseIcon, PlayIcon } from './Icons';

const tools = [
  'Azure OpenAI',
  'Synthetic Data',
  'Generative AI',
  'Apache Airflow',
  'Databricks',
  'PySpark',
  'Delta Lake',
  'AWS Glue',
  'Medallion Architecture',
  'Terraform',
  'Kubernetes',
  'Docker',
  'Jenkins',
  'Snowflake',
  'PostgreSQL',
  'Web3.py',
  'Streamlit',
  'Flask',
];

/** A ribbon of the tools I work with that loops continuously. Decorative: the full list is in the Stack section. */
export function Marquee() {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const group = (extra: string) => (
    <ul className={`flex shrink-0 items-center gap-10 pr-10 ${extra}`}>
      {tools.map((tool) => (
        <li
          key={tool}
          className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tight text-ink-2/80 md:text-3xl"
        >
          {tool}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-tide/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex border-y border-line bg-surface/40 backdrop-blur-sm">
      <div
        aria-hidden="true"
        data-paused={paused}
        className="marquee min-w-0 flex-1 overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        <div className="marquee-track flex w-max">
          {group('')}
          {group('marquee-dup')}
        </div>
      </div>
      {!reduce && (
        <div className="grid w-16 shrink-0 place-items-center border-l border-line">
          <button
            type="button"
            onClick={() => setPaused((current) => !current)}
            aria-label={paused ? 'Play the tool ribbon' : 'Pause the tool ribbon'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/90 text-ink-2 transition-colors hover:border-tide/50 hover:text-ink active:scale-95"
          >
            {paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
