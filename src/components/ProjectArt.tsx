import type { ProjectArtId } from '../content';

// Small animated schematics, one per project. Pure SVG + CSS keyframes (see index.css), so they cost almost
// nothing.

const mono = { fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'var(--ink-2)' } as const;

function SyntheticArt() {
  const tables = [34, 79, 124];
  return (
    <svg viewBox="0 0 360 240" role="presentation" className="h-auto w-full">
      {/* schema */}
      <rect x="12" y="38" width="86" height="114" rx="10" fill="var(--surface)" stroke="var(--line)" />
      <text x="24" y="58" {...mono}>
        schema
      </text>
      {[72, 88, 104, 120].map((y, i) => (
        <rect key={y} x="24" y={y} width={[54, 40, 62, 34][i]} height="6" rx="3" fill="var(--ink-2)" opacity="0.45" />
      ))}

      {/* flow: schema -> model -> tables */}
      <path d="M98 95 H146" stroke="var(--tide)" strokeWidth="1.5" fill="none" className="dash-flow" />
      {tables.map((ty) => (
        <path
          key={ty}
          d={`M192 95 C216 95 216 ${ty + 16} 238 ${ty + 16}`}
          stroke="var(--tide)"
          strokeWidth="1.5"
          fill="none"
          className="dash-flow"
        />
      ))}

      {/* Azure OpenAI */}
      <circle cx="170" cy="95" r="22" fill="var(--tide)" opacity="0.12" />
      <circle cx="170" cy="95" r="22" fill="none" stroke="var(--tide)" strokeWidth="1.5" className="ping-soft" />
      <circle cx="170" cy="95" r="22" fill="none" stroke="var(--tide)" strokeWidth="1.5" />
      <path d="M170 82 l3.4 8.6 8.6 3.4 -8.6 3.4 -3.4 8.6 -3.4 -8.6 -8.6 -3.4 8.6 -3.4z" fill="var(--tide)" />
      <text x="170" y="134" textAnchor="middle" {...mono}>
        Azure OpenAI
      </text>

      {/* generated tables */}
      {tables.map((ty, t) =>
        [0, 1, 2].flatMap((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${t}-${r}-${c}`}
              x={240 + c * 23}
              y={ty + r * 12}
              width="20"
              height="9"
              rx="2.5"
              fill="var(--tide)"
              className="cell-fill"
              style={{ animationDelay: `${t * 0.5 + (r * 4 + c) * 0.11}s` }}
            />
          )),
        ),
      )}

      {/* exports */}
      {['CSV', 'ZIP', 'XLSX'].map((label, i) => (
        <g key={label}>
          <rect x={240 + i * 38} y="184" width="34" height="20" rx="10" fill="var(--surface)" stroke="var(--line)" />
          <text x={257 + i * 38} y="197.5" textAnchor="middle" {...mono}>
            {label}
          </text>
        </g>
      ))}
      <text x="12" y="204" {...mono}>
        multi-table, exportable
      </text>
    </svg>
  );
}

function MedallionArt() {
  const layers = [
    { x: 12, color: 'var(--bronze)', title: 'Bronze', tool: 'raw in RDS' },
    { x: 134, color: 'var(--silver)', title: 'Silver', tool: 'AWS Glue' },
    { x: 256, color: 'var(--gold)', title: 'Gold', tool: 'Streamlit' },
  ];
  const scattered = [
    [18, 22],
    [60, 14],
    [34, 52],
    [72, 46],
    [20, 84],
    [58, 78],
    [44, 100],
    [74, 98],
    [30, 36],
    [66, 64],
    [46, 26],
    [14, 62],
  ];
  return (
    <svg viewBox="0 0 360 240" role="presentation" className="h-auto w-full">
      {layers.map((layer) => (
        <g key={layer.title}>
          <rect
            x={layer.x}
            y="30"
            width="92"
            height="130"
            rx="14"
            fill={layer.color}
            fillOpacity="0.08"
            stroke={layer.color}
            strokeOpacity="0.7"
          />
          <text
            x={layer.x + 46}
            y="178"
            textAnchor="middle"
            {...mono}
            style={{ ...mono, fill: 'var(--ink)', fontWeight: 500 }}
          >
            {layer.title}
          </text>
          <text x={layer.x + 46} y="191" textAnchor="middle" {...mono}>
            {layer.tool}
          </text>
        </g>
      ))}

      {/* Bronze: raw, scattered */}
      <g transform="translate(12 36)">
        {scattered.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="3.4"
            fill="var(--bronze)"
            className="jitter"
            style={{ animationDelay: `${i * -0.27}s` }}
          />
        ))}
      </g>

      {/* Silver: processed, aligned */}
      <g transform="translate(150 50)">
        {[0, 1, 2, 3].flatMap((r) =>
          [0, 1, 2, 3].map((c) => (
            <circle
              key={`${r}-${c}`}
              cx={c * 20 + 2}
              cy={r * 24 + 6}
              r="4"
              fill="var(--silver)"
              className="cell-fill"
              style={{ animationDelay: `${(r * 4 + c) * 0.1}s` }}
            />
          )),
        )}
      </g>

      {/* Gold: curated aggregates */}
      <g transform="translate(272 36)">
        {[44, 70, 56, 88, 76].map((h, i) => (
          <rect
            key={i}
            x={i * 15 + 2}
            y={110 - h}
            width="10"
            height={h}
            rx="3"
            fill="var(--gold)"
            className="bar-rise"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </g>

      <path d="M106 95 H132" stroke="var(--ink-2)" strokeWidth="1.5" className="dash-flow" fill="none" />
      <path d="M228 95 H254" stroke="var(--ink-2)" strokeWidth="1.5" className="dash-flow" fill="none" />

      {/* infrastructure strip */}
      <rect x="12" y="206" width="336" height="26" rx="13" fill="var(--surface)" stroke="var(--line)" />
      <text x="180" y="222" textAnchor="middle" {...mono}>
        provisioned with Terraform: VPC · EC2 · Lambda
      </text>
    </svg>
  );
}

function FraudArt() {
  const total = 9;
  return (
    <svg viewBox="0 0 360 240" role="presentation" className="h-auto w-full">
      <text x="12" y="30" {...mono}>
        Ethereum transactions
      </text>

      {/* lanes */}
      <path d="M12 95 H348" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 5" fill="none" />
      <path
        d="M196 150 H348"
        stroke="var(--alert)"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        fill="none"
      />
      <text x="348" y="170" textAnchor="end" {...mono} style={{ ...mono, fill: 'var(--alert)' }}>
        high-risk
      </text>

      {/* the model */}
      <circle cx="180" cy="95" r="26" fill="var(--tide)" opacity="0.12" />
      <circle cx="180" cy="95" r="26" fill="none" stroke="var(--tide)" strokeWidth="1.5" className="ping-soft" />
      <circle cx="180" cy="95" r="26" fill="none" stroke="var(--tide)" strokeWidth="1.5" />
      <path
        d="M168 100 l7 -9 l6 6 l9 -12"
        fill="none"
        stroke="var(--tide)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="180" y="136" textAnchor="middle" {...mono}>
        ML model
      </text>

      {/* transactions */}
      {Array.from({ length: total }, (_, i) => {
        const flagged = i % 3 === 2;
        return (
          <circle
            key={i}
            cx="18"
            cy="95"
            r="4.5"
            fill={flagged ? 'var(--alert)' : 'var(--tide)'}
            className={flagged ? 'tx-flag' : 'tx-ok'}
            style={{
              animationDelay: `${-(i * 4.8) / total}s`,
              ['--run' as string]: '320px',
              ['--drop' as string]: '55px',
            }}
          />
        );
      })}

      {/* uptime */}
      <rect x="12" y="188" width="336" height="44" rx="14" fill="var(--surface)" stroke="var(--line)" />
      <text x="28" y="207" {...mono}>
        uptime
      </text>
      <text
        x="28"
        y="224"
        style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, fill: 'var(--ink)' }}
      >
        99.5%+
      </text>
      <path
        d="M104 212 h16 l5 -10 l8 20 l7 -16 l4 6 h16 l5 -8 l7 14 l5 -5 h22"
        fill="none"
        stroke="var(--tide)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="332" y="207" textAnchor="end" {...mono}>
        logging · monitoring
      </text>
      <text x="332" y="222" textAnchor="end" {...mono}>
        automated fallback
      </text>
    </svg>
  );
}

export function ProjectArt({ id }: { id: ProjectArtId }) {
  if (id === 'synthetic') return <SyntheticArt />;
  if (id === 'medallion') return <MedallionArt />;
  return <FraudArt />;
}
