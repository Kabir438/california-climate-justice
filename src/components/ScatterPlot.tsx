import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import type { ClimateVariable, ScatterPoint, SocialVariable } from '../types';
import { COUNTY_DATA, POPULATION_ESTIMATES, VARIABLE_LABELS } from '../data/countyData';
import { correlationInterpretation, REGION_COLORS, variableValueLabel } from '../utils/scoring';
import { linearRegression, pearsonR } from '../utils/statistics';

interface ScatterPlotProps {
  climateVar: ClimateVariable;
  socialVar: SocialVariable;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ScatterPoint }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-md border border-[var(--border-bright)] bg-[var(--bg-3)] p-3 text-xs shadow-xl">
      <div className="font-semibold text-[var(--text-primary)]">{point.county}</div>
      <div className="text-[var(--text-muted)]">{point.region}</div>
      <div className="mono mt-2 space-y-1 text-[var(--text-secondary)]">
        <div>x: {point.x.toFixed(1)}</div>
        <div>y: {point.y.toFixed(1)}</div>
        <div>pop: {point.population.toLocaleString()}</div>
      </div>
    </div>
  );
}

export function ScatterPlot({ climateVar, socialVar }: ScatterPlotProps) {
  const points: ScatterPoint[] = Object.entries(COUNTY_DATA).map(([county, record]) => ({
    county,
    x: record[socialVar],
    y: record[climateVar],
    region: record.region,
    population: POPULATION_ESTIMATES[county] ?? 50000,
  }));

  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const r = pearsonR(xs, ys);
  const regression = linearRegression(xs, ys);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const segment: [{ x: number; y: number }, { x: number; y: number }] = [
    { x: xMin, y: regression.m * xMin + regression.b },
    { x: xMax, y: regression.m * xMax + regression.b },
  ];

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col">
      <div className="border-b border-[var(--border)] px-5 py-4 text-center">
        <div className="mono text-4xl font-semibold text-[var(--text-primary)]">r = {r.toFixed(2)}</div>
        <div className="mt-2 text-sm text-[var(--text-secondary)]">
          {correlationInterpretation(r, VARIABLE_LABELS[socialVar], VARIABLE_LABELS[climateVar])}
        </div>
      </div>

      <div className="min-h-0 flex-1 p-4">
        <ResponsiveContainer height="100%" width="100%">
          <ScatterChart margin={{ bottom: 32, left: 22, right: 28, top: 20 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              domain={['dataMin', 'dataMax']}
              name={VARIABLE_LABELS[socialVar]}
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => variableValueLabel(socialVar, Number(value))}
              type="number"
            />
            <YAxis
              dataKey="y"
              domain={['dataMin', 'dataMax']}
              name={VARIABLE_LABELS[climateVar]}
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => variableValueLabel(climateVar, Number(value))}
              type="number"
            />
            <ZAxis dataKey="population" range={[45, 520]} type="number" />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.22)', strokeDasharray: '4 4' }} />
            <ReferenceLine
              ifOverflow="extendDomain"
              segment={segment}
              stroke="var(--accent-critical)"
              strokeDasharray="6 4"
              strokeWidth={2}
            />
            <Scatter data={points} name="Counties">
              {points.map((point) => (
                <Cell fill={REGION_COLORS[point.region]} key={point.county} stroke="rgba(255,255,255,0.55)" />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
