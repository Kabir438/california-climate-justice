import { motion } from 'framer-motion';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { ClimateVariable, CountyName, SocialVariable } from '../types';
import { COUNTY_DATA, VARIABLE_LABELS } from '../data/countyData';
import {
  climateBurdenScore,
  getStateAverage,
  socialVulnerabilityScore,
  variableValueLabel,
} from '../utils/scoring';

interface CountyDetailPanelProps {
  climateVar: ClimateVariable;
  county: CountyName;
  onClose: () => void;
  socialVar: SocialVariable;
}

const communityResponses: Record<string, string> = {
  Fresno:
    'West Fresno residents and environmental justice coalitions have organized around warehouse siting, air monitoring, park access, and asthma prevention. The response is not just adaptation; it is a demand that infrastructure investment follow the people carrying the heaviest burden.',
  Imperial:
    'Imperial Valley advocates have pushed for Salton Sea dust mitigation, bilingual emergency communication, and heat protections for farmworkers. Their work reframes the county from a sacrifice zone into a frontline climate governance case.',
  'Contra Costa':
    'Richmond organizers have repeatedly challenged refinery pollution through community monitoring, public hearings, and corporate accountability campaigns. Chen (2019) identifies this kind of organized pressure as the scale where environmental knowledge becomes power.',
  Tulare:
    'Tulare County water justice groups have organized around dry wells, nitrate contamination, and emergency drinking water access. Their work connects drought, agricultural extraction, and basic household dignity.',
  'Los Angeles':
    'Wilmington and South LA organizers have fought neighborhood oil drilling, port diesel emissions, and heat island inequity through land-use campaigns. The central demand is simple: communities should not have to trade health for the logistics economy.',
  Alameda:
    'West Oakland residents have built air-quality monitoring networks and port-emissions campaigns that translate lived exposure into policy evidence. The neighborhood response shows why community science is a justice tool, not a side project.',
};

function ReadingCallout({ note }: { note: string }) {
  const callouts = [
    note.includes('Chen')
      ? '"It feels really unjust, that just because you don\'t speak English fluently... it doesn\'t mean you shouldn\'t know this information." — Andrea Chu, CAAEJ (Chen, 2019)'
      : null,
    note.includes('Baer')
      ? '"The capitalist drive for profit making results in a perpetual treadmill of production and consumption heavily reliant on fossil fuels." — Baer (2021)'
      : null,
  ].filter(Boolean);

  if (!callouts.length) return null;

  return (
    <div className="space-y-2 rounded-md border border-[rgba(230,57,70,0.4)] bg-[rgba(230,57,70,0.1)] p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-critical)]">
        Course reading connection
      </div>
      {callouts.map((callout) => (
        <blockquote className="text-sm leading-6 text-[var(--text-primary)]" key={callout}>
          {callout}
        </blockquote>
      ))}
    </div>
  );
}

function ComparisonBar({
  color,
  county,
  variable,
}: {
  color: string;
  county: CountyName;
  variable: SocialVariable | ClimateVariable;
}) {
  const record = COUNTY_DATA[county];
  const data = [
    { name: county, value: record[variable] },
    { name: 'CA avg', value: getStateAverage(variable) },
  ];

  return (
    <div className="h-24">
      <ResponsiveContainer height="100%" width="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
          <XAxis hide type="number" />
          <YAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} type="category" width={80} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((row, index) => (
              <Cell fill={index === 0 ? color : 'rgba(255,255,255,0.22)'} key={row.name} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CountyDetailPanel({ climateVar, county, onClose, socialVar }: CountyDetailPanelProps) {
  const record = COUNTY_DATA[county];
  const demographicData = [
    { name: 'Latino', value: record.pctLatino, color: '#e63946' },
    { name: 'Other PoC', value: Math.max(0, record.pctNonWhite - record.pctLatino), color: '#f4a261' },
    { name: 'White', value: Math.max(0, 100 - record.pctNonWhite), color: '#457b9d' },
  ];
  const response = communityResponses[county];
  const socialScore = socialVulnerabilityScore(record);
  const climateScore = climateBurdenScore(record);

  return (
    <motion.aside
      animate={{ x: 0 }}
      className="absolute right-0 top-0 z-[1800] flex h-full w-full max-w-[380px] flex-col border-l border-[var(--border-bright)] bg-[rgba(15,15,26,0.98)] shadow-2xl backdrop-blur"
      initial={{ x: 400 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between border-b border-[var(--border)] p-5">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{county}</h2>
          <span className="mt-2 inline-flex rounded border border-[var(--border)] bg-[var(--bg-2)] px-2 py-1 text-xs text-[var(--text-secondary)]">
            {record.region}
          </span>
        </div>
        <button
          className="rounded border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition hover:text-white"
          onClick={onClose}
          type="button"
        >
          Close
        </button>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
        <section className="rounded-md border border-[var(--border)] bg-[var(--bg-1)] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Demographics</div>
          <div className="mt-3 grid grid-cols-[120px_1fr] gap-3">
            <ResponsiveContainer height={120} width="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  dataKey="value"
                  innerRadius={38}
                  outerRadius={55}
                  paddingAngle={2}
                  stroke="var(--bg-1)"
                >
                  {demographicData.map((entry) => (
                    <Cell fill={entry.color} key={entry.name} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-sm">
              {demographicData.map((entry) => (
                <div className="flex items-center justify-between gap-2" key={entry.name}>
                  <span className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
                    {entry.name}
                  </span>
                  <span className="mono text-[var(--text-primary)]">{entry.value.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-md border border-[var(--border)] bg-[var(--bg-1)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Selected social variable
              </div>
              <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{VARIABLE_LABELS[socialVar]}</h3>
            </div>
            <div className="mono text-lg text-[#4eb3d3]">{variableValueLabel(socialVar, record[socialVar])}</div>
          </div>
          <ComparisonBar color="#4eb3d3" county={county} variable={socialVar} />
        </section>

        <section className="rounded-md border border-[var(--border)] bg-[var(--bg-1)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Selected climate variable
              </div>
              <h3 className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{VARIABLE_LABELS[climateVar]}</h3>
            </div>
            <div className="mono text-lg text-[var(--accent-critical)]">
              {variableValueLabel(climateVar, record[climateVar])}
            </div>
          </div>
          <ComparisonBar color="var(--accent-critical)" county={county} variable={climateVar} />
        </section>

        <section className="rounded-md border border-[var(--border)] bg-[var(--bg-1)] p-4">
          <div className="grid grid-cols-[90px_1fr] items-center gap-4">
            <div
              className="grid h-20 w-20 place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--accent-critical) ${record.cesScore * 3.6}deg, var(--bg-2) 0deg)`,
              }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--bg-1)]">
                <span className="mono text-lg font-semibold">{record.cesScore}</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                CalEnviroScreen percentile gauge
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Social score {socialScore.toFixed(0)} · Climate score {climateScore.toFixed(0)}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-md border border-[var(--border)] bg-[var(--bg-1)] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">County note</div>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{record.note}</p>
        </section>

        <ReadingCallout note={record.note} />

        {response && (
          <section className="rounded-md border border-[rgba(42,157,143,0.35)] bg-[rgba(42,157,143,0.08)] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-low)]">
              Community response
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{response}</p>
          </section>
        )}
      </div>
    </motion.aside>
  );
}
