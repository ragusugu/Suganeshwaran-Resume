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

/** A slow ribbon of the tools I work with. Decorative: the full list is in the Stack section. */
export function Marquee() {
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
    <div
      aria-hidden="true"
      className="marquee relative overflow-hidden border-y border-line bg-surface/40 py-6 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="marquee-track flex w-max">
        {group('')}
        {group('marquee-dup')}
      </div>
    </div>
  );
}
