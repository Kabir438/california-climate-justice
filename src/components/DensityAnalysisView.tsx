import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
  type PointerEvent,
} from 'react';
import type { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { CountyName, CountyRecord } from '../types';
import { COUNTY_DATA } from '../data/countyData';
import { useGeoJSON } from '../hooks/useGeoJSON';
import { useMapSync } from '../hooks/useMapSync';
import { DENSITY_COLORS, getDensityColor } from '../utils/colorScales';
import { quantileBreaks } from '../utils/statistics';
import { BIVARIATE_COLORS, climateBurdenScore, getBivariateBucket, socialVulnerabilityScore } from '../utils/scoring';
import { CountyGeoJsonLayer, type CountyHoverPayload } from './CountyGeoJsonLayer';

const CENTER: [number, number] = [37.5, -119.5];
const MAX_BOUNDS: [[number, number], [number, number]] = [[31.8, -125.6], [42.6, -113.4]];
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; OpenStreetMap &copy; CARTO';

interface DensityAnalysisViewProps {
  onCountySelect: (county: CountyName) => void;
  selectedCounty: CountyName | null;
}

interface CountyAnalysisRow {
  climateScore: number;
  county: CountyName;
  density: number;
  logDensity: number;
  record: CountyRecord;
  socialBucket: 0 | 1 | 2;
  socialScore: number;
}

interface HypothesisGroup {
  body: string;
  rows: CountyAnalysisRow[];
  title: string;
}

interface FloatingTooltipState {
  county: CountyName;
  label: string;
  placement: 'above' | 'below';
  region: string;
  value: string;
  x: number;
  y: number;
}

interface ScatterTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: CountyAnalysisRow }>;
}

function populationDensity(record: CountyRecord): number {
  return record.population / record.areaSqMi;
}

function formatDensity(value: number): string {
  if (value >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (value < 10) return value.toFixed(1);
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function scoreBucket(score: number): 0 | 1 | 2 {
  return score < 33 ? 0 : score < 66 ? 1 : 2;
}

function averageDensity(rows: CountyAnalysisRow[]): number {
  if (!rows.length) return 0;
  return rows.reduce((sum, row) => sum + row.density, 0) / rows.length;
}

function MapRegistrar({
  mapRef,
  onSync,
}: {
  mapRef: MutableRefObject<LeafletMap | null>;
  onSync: () => void;
}) {
  const map = useMap();
  useMapEvents({
    moveend: onSync,
    zoomend: onSync,
  });

  useEffect(() => {
    mapRef.current = map;
    return () => {
      if (mapRef.current === map) mapRef.current = null;
    };
  }, [map, mapRef]);

  return null;
}

function MapStatus({ error, loading }: { error: string | null; loading: boolean }) {
  if (!loading && !error) return null;
  return (
    <div className="absolute inset-0 z-[900] flex items-center justify-center bg-[rgba(7,7,13,0.72)]">
      <div className="rounded-md border border-[var(--border-bright)] bg-[var(--bg-2)] px-5 py-4 text-sm text-[var(--text-secondary)]">
        {loading ? 'Loading California county boundaries…' : `GeoJSON error: ${error}`}
      </div>
    </div>
  );
}

function FloatingTooltip({ tooltip }: { tooltip: FloatingTooltipState | null }) {
  if (!tooltip) return null;

  return (
    <div
      className="pointer-events-none absolute z-[1600] w-[250px] rounded-md border border-[var(--border-bright)] bg-[rgba(34,34,56,0.97)] p-4 text-[var(--text-primary)] shadow-2xl backdrop-blur"
      style={{
        left: tooltip.x,
        top: tooltip.y,
        transform:
          tooltip.placement === 'above'
            ? 'translate(-50%, calc(-100% - 16px))'
            : 'translate(-50%, 16px)',
      }}
    >
      <div className="text-xl font-bold leading-tight">{tooltip.county}</div>
      <div className="mt-1 text-sm text-[var(--text-secondary)]">{tooltip.region}</div>
      <div className="my-3 h-px bg-[var(--border-bright)]" />
      <div className="mono text-xs uppercase tracking-[0.14em] text-[var(--text-secondary)]">{tooltip.label}</div>
      <div className="mono mt-2 text-xl font-semibold text-[var(--text-primary)]">{tooltip.value}</div>
      <div
        className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-[var(--border-bright)] bg-[rgba(34,34,56,0.97)] ${
          tooltip.placement === 'above'
            ? 'top-full -translate-y-1/2 border-b border-r'
            : 'bottom-full translate-y-1/2 border-l border-t'
        }`}
      />
    </div>
  );
}

function MapLabel({ align, eyebrow, title }: { align: 'left' | 'right'; eyebrow: string; title: string }) {
  return (
    <div
      className={`pointer-events-none absolute top-4 z-[900] max-w-[150px] rounded-md border border-[var(--border-bright)] bg-[rgba(15,15,26,0.84)] px-3 py-2 shadow-xl backdrop-blur sm:max-w-[300px] ${
        align === 'left' ? 'left-14' : 'right-4 text-right'
      }`}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">{eyebrow}</div>
      <div className="mt-1 truncate text-xs font-semibold text-[var(--text-primary)] sm:text-sm">{title}</div>
    </div>
  );
}

function BivariateLegend({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`absolute bottom-4 left-4 z-[900] rounded-md border border-[var(--border-bright)] bg-[rgba(15,15,26,0.92)] shadow-xl backdrop-blur ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      <div className="text-xs font-semibold text-[var(--text-primary)]">Double burden index</div>
      <div className="mt-3 grid grid-cols-[auto_repeat(3,20px)] grid-rows-[repeat(3,20px)_auto] gap-1">
        <div className="row-span-3 flex -rotate-90 items-center justify-center text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Climate ↑
        </div>
        {[2, 1, 0].map((climate) =>
          [0, 1, 2].map((social) => (
            <div
              className="h-5 w-5 border border-[rgba(0,0,0,0.25)]"
              key={`${climate}-${social}`}
              style={{ background: BIVARIATE_COLORS[climate][social] }}
            />
          )),
        )}
        <div />
        <div className="col-span-3 text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Social →
        </div>
      </div>
    </div>
  );
}

function DensityLegend({ breaks }: { breaks: number[] }) {
  const labels = DENSITY_COLORS.map((_, index) => {
    if (index === 0) return `≤ ${formatDensity(breaks[0] ?? 0)}`;
    if (index === DENSITY_COLORS.length - 1) return `> ${formatDensity(breaks.at(-1) ?? 0)}`;
    return `${formatDensity(breaks[index - 1])}-${formatDensity(breaks[index])}`;
  });

  return (
    <div className="absolute bottom-4 right-4 z-[900] w-[190px] rounded-md border border-[var(--border-bright)] bg-[rgba(15,15,26,0.92)] p-3 shadow-xl backdrop-blur sm:w-[250px]">
      <div className="text-xs font-semibold text-[var(--text-primary)]">Population density</div>
      <div className="mt-3 grid grid-cols-7 overflow-hidden rounded-sm border border-[rgba(0,0,0,0.28)]">
        {DENSITY_COLORS.map((color) => (
          <div className="h-3" key={color} style={{ background: color }} />
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-2 text-[9px] text-[var(--text-muted)]">
        <span>{labels[0]}</span>
        <span>{labels.at(-1)}</span>
      </div>
      <div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[var(--text-muted)]">people/sq mi</div>
    </div>
  );
}

function HypothesisCard({ group }: { group: HypothesisGroup }) {
  const avg = averageDensity(group.rows);

  return (
    <article className="flex min-h-[220px] min-w-0 flex-col rounded-md border border-[var(--border)] bg-[rgba(24,24,40,0.76)] p-4">
      <div className="text-sm font-semibold text-[var(--text-primary)]">{group.title}</div>
      <div className="mono mt-3 text-3xl font-semibold text-[var(--text-primary)]">
        {formatDensity(avg)}
        <span className="ml-2 text-xs font-medium text-[var(--text-secondary)]">avg people/sq mi</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {group.rows.map((row) => (
          <span
            className="rounded border border-[var(--border)] bg-[rgba(255,255,255,0.04)] px-2 py-1 text-[11px] text-[var(--text-secondary)]"
            key={row.county}
            title={`Social ${row.socialScore.toFixed(1)} | Climate ${row.climateScore.toFixed(1)} | Density ${formatDensity(row.density)}`}
          >
            {row.county}
          </span>
        ))}
      </div>
      <p className="mt-auto pt-4 text-xs leading-relaxed text-[var(--text-secondary)]">{group.body}</p>
    </article>
  );
}

function DensityScatterTooltip({ active, payload }: ScatterTooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-md border border-[var(--border-bright)] bg-[var(--bg-3)] p-3 text-xs shadow-xl">
      <div className="font-semibold text-[var(--text-primary)]">{point.county}</div>
      <div className="text-[var(--text-muted)]">{point.record.region}</div>
      <div className="mono mt-2 space-y-1 text-[var(--text-secondary)]">
        <div>density: {formatDensity(point.density)} people/sq mi</div>
        <div>climate: {point.climateScore.toFixed(1)}</div>
        <div>social: {point.socialScore.toFixed(1)}</div>
      </div>
    </div>
  );
}

function DensityScatter({ rows }: { rows: CountyAnalysisRow[] }) {
  return (
    <div className="min-h-[300px] rounded-md border border-[var(--border)] bg-[rgba(15,15,26,0.78)] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-[var(--text-primary)]">Density Does Not Explain Everything</div>
          <div className="mt-1 text-xs text-[var(--text-secondary)]">
            X axis is log10 population density; color shows social vulnerability bucket.
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#b0d0e8]" />Low social</span>
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#f4a261]" />Medium</span>
          <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#49006a]" />High</span>
        </div>
      </div>
      <div className="mt-3 h-[240px]">
        <ResponsiveContainer height="100%" minWidth={0} width="100%">
          <ScatterChart margin={{ bottom: 28, left: 18, right: 24, top: 14 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <XAxis
              dataKey="logDensity"
              domain={[0, 4.4]}
              label={{ value: 'Population density (people/sq mi, log scale)', dy: 24, fill: 'var(--text-muted)', fontSize: 11 }}
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => formatDensity(10 ** Number(value))}
              ticks={[0, 1, 2, 3, 4]}
              type="number"
            />
            <YAxis
              dataKey="climateScore"
              domain={[0, 85]}
              label={{ value: 'Climate burden score', angle: -90, dx: -18, fill: 'var(--text-muted)', fontSize: 11 }}
              stroke="var(--text-muted)"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => Number(value).toFixed(0)}
              type="number"
            />
            <Tooltip content={<DensityScatterTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.22)', strokeDasharray: '4 4' }} />
            <Scatter data={rows} name="Counties">
              {rows.map((row) => (
                <Cell
                  fill={row.socialBucket === 2 ? '#49006a' : row.socialBucket === 1 ? '#f4a261' : '#b0d0e8'}
                  key={row.county}
                  stroke="rgba(255,255,255,0.62)"
                  strokeWidth={0.9}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function DensityAnalysisView({ onCountySelect, selectedCounty }: DensityAnalysisViewProps) {
  const { error, geoJSON, loading } = useGeoJSON();
  const { mapA, mapB, syncFrom } = useMapSync();
  const mapAreaRef = useRef<HTMLDivElement | null>(null);
  const [hoverTooltip, setHoverTooltip] = useState<FloatingTooltipState | null>(null);
  const [mapMode, setMapMode] = useState<'side-by-side' | 'slider'>('side-by-side');
  const [sliderPercent, setSliderPercent] = useState(34);

  const rows = useMemo<CountyAnalysisRow[]>(
    () =>
      Object.entries(COUNTY_DATA)
        .map(([county, record]) => {
          const density = populationDensity(record);
          const socialScore = socialVulnerabilityScore(record);
          const climateScore = climateBurdenScore(record);
          return {
            climateScore,
            county,
            density,
            logDensity: Math.log10(density),
            record,
            socialBucket: scoreBucket(socialScore),
            socialScore,
          };
        })
        .sort((a, b) => a.density - b.density),
    [],
  );

  const densityBreaks = useMemo(() => quantileBreaks(rows.map((row) => row.density), DENSITY_COLORS.length), [rows]);

  const groups = useMemo<HypothesisGroup[]>(
    () => [
      {
        title: 'High Social, Low Climate (Rural Farming Counties)',
        rows: rows.filter((row) => row.socialScore > 50 && row.climateScore < 40),
        body: 'Subsistence, farm, timber, and tourism economies show real poverty, but geographic isolation often buffers them from refineries, ports, diesel corridors, and logistics infrastructure.',
      },
      {
        title: 'High Social, High Climate (Industrial Sacrifice Zones)',
        rows: rows.filter((row) => row.socialScore > 60 && row.climateScore > 60),
        body: 'These counties are dense enough for commercial agriculture, extraction, warehouses, highways, and industrial infrastructure, while still politically exposed.',
      },
      {
        title: 'Low Social, Low Climate (Buffered Wealth)',
        rows: rows.filter((row) => row.socialScore < 35 && row.climateScore < 35),
        body: 'Wealthy counties with high density or deliberately low-density exclusivity are both insulated by capital, services, tree canopy, political access, and adaptive capacity.',
      },
    ],
    [rows],
  );

  const handleHover = useCallback((payload: CountyHoverPayload) => {
    const rect = mapAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rawX = payload.clientX - rect.left;
    const rawY = payload.clientY - rect.top;
    const tooltipHalfWidth = 125;
    const placement = rawY > 190 ? 'above' : 'below';
    setHoverTooltip({
      county: payload.county,
      label: payload.label,
      placement,
      region: payload.record.region,
      value: payload.value,
      x: Math.max(tooltipHalfWidth + 12, Math.min(rect.width - tooltipHalfWidth - 12, rawX)),
      y: placement === 'above' ? Math.max(188, rawY) : Math.max(14, rawY),
    });
  }, []);

  const setSliderFromClientX = useCallback((clientX: number) => {
    const rect = mapAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSliderPercent(Math.max(8, Math.min(92, next)));
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    setSliderFromClientX(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    setSliderFromClientX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleSliderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSliderPercent((value) => Math.max(8, value - 3));
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSliderPercent((value) => Math.min(92, value + 3));
    }
  };

  const mapProps = {
    center: CENTER,
    maxBounds: MAX_BOUNDS,
    maxBoundsViscosity: 0.85,
    minZoom: 5,
    scrollWheelZoom: true,
    zoom: 6,
  };

  return (
    <section className="flex h-full flex-col bg-[var(--bg-0)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-1)] px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-base font-bold text-[var(--text-primary)]">Rural Hypothesis</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)]">
              Testing whether geographic isolation buffers some poor counties from industrial climate burden.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="mono text-xs text-[var(--text-muted)]">
              density = population / square miles · {rows.length} counties
            </div>
            <button
              className="rounded border border-[var(--border-bright)] bg-[rgba(34,34,56,0.78)] px-3 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent-critical)] hover:text-white"
              onClick={() => setMapMode((value) => (value === 'slider' ? 'side-by-side' : 'slider'))}
              type="button"
            >
              {mapMode === 'slider' ? 'Side-by-side maps' : 'Slide Compare'}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`relative h-[44%] min-h-[300px] shrink-0 overflow-hidden ${
          mapMode === 'side-by-side' ? 'grid grid-cols-2' : ''
        }`}
        ref={mapAreaRef}
      >
        {mapMode === 'side-by-side' ? (
          <>
            <div className="relative min-w-0 border-r border-[var(--border)]">
              <MapContainer className="h-full w-full" {...mapProps}>
                <MapRegistrar mapRef={mapA} onSync={() => syncFrom('A')} />
                <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
                {geoJSON && (
                  <CountyGeoJsonLayer
                    geoJSON={geoJSON}
                    getFillColor={(_, record) => {
                      const bucket = getBivariateBucket(record);
                      return BIVARIATE_COLORS[bucket.climateBucket][bucket.socialBucket];
                    }}
                    layerKey={`density-bivariate-side-${selectedCounty ?? 'none'}`}
                    onCountyHover={handleHover}
                    onCountyHoverEnd={() => setHoverTooltip(null)}
                    onCountySelect={onCountySelect}
                    selectedCounty={selectedCounty}
                    showLeafletTooltip={false}
                    tooltipLabel="Combined burden"
                    tooltipValue={(_, record) =>
                      `Social: ${socialVulnerabilityScore(record).toFixed(0)} | Climate: ${climateBurdenScore(record).toFixed(0)}`
                    }
                  />
                )}
              </MapContainer>
              <MapLabel align="left" eyebrow="Left map" title="Combined Burden (Social + Climate)" />
              <BivariateLegend compact />
            </div>

            <div className="relative min-w-0">
              <MapContainer className="h-full w-full" {...mapProps}>
                <MapRegistrar mapRef={mapB} onSync={() => syncFrom('B')} />
                <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
                {geoJSON && (
                  <CountyGeoJsonLayer
                    geoJSON={geoJSON}
                    getFillColor={(_, record) => getDensityColor(populationDensity(record), densityBreaks)}
                    layerKey={`density-map-side-${selectedCounty ?? 'none'}`}
                    onCountyHover={handleHover}
                    onCountyHoverEnd={() => setHoverTooltip(null)}
                    onCountySelect={onCountySelect}
                    selectedCounty={selectedCounty}
                    showLeafletTooltip={false}
                    tooltipLabel="Population density"
                    tooltipValue={(_, record) => `${formatDensity(populationDensity(record))} people/sq mi`}
                  />
                )}
              </MapContainer>
              <MapLabel align="right" eyebrow="Right map" title="Population Density (people/sq mi)" />
              <DensityLegend breaks={densityBreaks} />
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0">
              <MapContainer className="h-full w-full" {...mapProps}>
                <MapRegistrar mapRef={mapA} onSync={() => syncFrom('A')} />
                <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
                {geoJSON && (
                  <CountyGeoJsonLayer
                    geoJSON={geoJSON}
                    getFillColor={(_, record) => {
                      const bucket = getBivariateBucket(record);
                      return BIVARIATE_COLORS[bucket.climateBucket][bucket.socialBucket];
                    }}
                    layerKey={`density-bivariate-slider-${selectedCounty ?? 'none'}`}
                    onCountyHover={handleHover}
                    onCountyHoverEnd={() => setHoverTooltip(null)}
                    onCountySelect={onCountySelect}
                    selectedCounty={selectedCounty}
                    showLeafletTooltip={false}
                    tooltipLabel="Combined burden"
                    tooltipValue={(_, record) =>
                      `Social: ${socialVulnerabilityScore(record).toFixed(0)} | Climate: ${climateBurdenScore(record).toFixed(0)}`
                    }
                  />
                )}
              </MapContainer>
            </div>

            <div
              className="absolute inset-0 z-[500] overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderPercent}%)` }}
            >
              <MapContainer className="h-full w-full" {...mapProps}>
                <MapRegistrar mapRef={mapB} onSync={() => syncFrom('B')} />
                <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
                {geoJSON && (
                  <CountyGeoJsonLayer
                    geoJSON={geoJSON}
                    getFillColor={(_, record) => getDensityColor(populationDensity(record), densityBreaks)}
                    layerKey={`density-map-slider-${selectedCounty ?? 'none'}`}
                    onCountyHover={handleHover}
                    onCountyHoverEnd={() => setHoverTooltip(null)}
                    onCountySelect={onCountySelect}
                    selectedCounty={selectedCounty}
                    showLeafletTooltip={false}
                    tooltipLabel="Population density"
                    tooltipValue={(_, record) => `${formatDensity(populationDensity(record))} people/sq mi`}
                  />
                )}
              </MapContainer>
            </div>

            <MapLabel align="left" eyebrow="Left" title="Combined Burden (Social + Climate)" />
            <MapLabel align="right" eyebrow="Right" title="Population Density (people/sq mi)" />
            <BivariateLegend compact />
            <DensityLegend breaks={densityBreaks} />
            <div
              aria-label="Rural hypothesis comparison reveal slider"
              aria-valuemax={92}
              aria-valuemin={8}
              aria-valuenow={Math.round(sliderPercent)}
              className="absolute top-0 z-[1100] flex h-full w-12 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center outline-none"
              onKeyDown={handleSliderKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              role="slider"
              style={{ left: `${sliderPercent}%` }}
              tabIndex={0}
            >
              <div className="h-full w-0.5 bg-white shadow-[0_0_0_1px_rgba(7,7,13,0.55),0_0_18px_rgba(255,255,255,0.5)]" />
              <div className="absolute grid h-14 w-14 place-items-center rounded-full border border-white/80 bg-[rgba(15,15,26,0.92)] text-white shadow-2xl backdrop-blur transition hover:scale-105">
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rotate-45 border-b-2 border-l-2 border-white" />
                  <span className="h-2 w-2 -rotate-45 border-b-2 border-r-2 border-white" />
                </div>
              </div>
            </div>
          </>
        )}

        <FloatingTooltip tooltip={hoverTooltip} />
        <MapStatus error={error} loading={loading} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto border-t border-[var(--border)] bg-[var(--bg-0)] p-4">
        <div className="grid gap-4 lg:grid-cols-3">
          {groups.map((group) => (
            <HypothesisCard group={group} key={group.title} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <DensityScatter rows={rows} />
          <aside className="rounded-md border border-[var(--border-bright)] bg-[rgba(24,24,40,0.82)] p-4">
            <div className="text-sm font-semibold text-[var(--text-primary)]">What This Tests</div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              The rural counties in the top-left of the bivariate map — high social vulnerability, low climate burden —
              have much lower average population density than the industrial sacrifice-zone cohort. Their poverty is
              real, but it reflects agricultural and timber economies in geographic isolation, not proximity to
              refineries, ports, or diesel corridors.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              This distinction matters: Baer (2021) argues that climate burden follows the capitalist treadmill of
              production — and the treadmill has not yet reached Trinity County. It has reached Fresno.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
