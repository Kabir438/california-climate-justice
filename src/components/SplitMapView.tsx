import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MutableRefObject, type PointerEvent } from 'react';
import type { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import type { ClimateVariable, CountyName, CountyRecord, SocialVariable } from '../types';
import { CLIMATE_VARIABLES, COUNTY_DATA, SOCIAL_VARIABLES, VARIABLE_LABELS } from '../data/countyData';
import { useGeoJSON } from '../hooks/useGeoJSON';
import { useMapSync } from '../hooks/useMapSync';
import { getChoroColor } from '../utils/colorScales';
import { getRange, valuesFor, variableValueLabel } from '../utils/scoring';
import { pearsonR } from '../utils/statistics';
import { CountyGeoJsonLayer, type CountyHoverPayload } from './CountyGeoJsonLayer';

const CENTER: [number, number] = [37.5, -119.5];
const MAX_BOUNDS: [[number, number], [number, number]] = [[31.8, -125.6], [42.6, -113.4]];
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; OpenStreetMap &copy; CARTO';

interface SplitMapViewProps {
  climateVar: ClimateVariable;
  onClimateVarChange: (value: ClimateVariable) => void;
  onCountySelect: (county: CountyName) => void;
  onSocialVarChange: (value: SocialVariable) => void;
  selectedCounty: CountyName | null;
  socialVar: SocialVariable;
}

interface SplitHoverTooltip {
  county: CountyName;
  label: string;
  placement: 'above' | 'below';
  region: string;
  value: string;
  x: number;
  y: number;
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

function VariableSelect<T extends SocialVariable | ClimateVariable>({
  label,
  onChange,
  options,
  palette,
  value,
}: {
  label: string;
  onChange: (value: T) => void;
  options: readonly T[];
  palette: 'social' | 'climate';
  value: T;
}) {
  return (
    <label className="flex h-14 items-center justify-between gap-3 border-b border-[var(--border)] bg-[rgba(15,15,26,0.94)] px-4">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{label}</span>
      <select
        className={`min-w-0 rounded border bg-[var(--bg-2)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none ${
          palette === 'social' ? 'border-cyan-800/60' : 'border-red-900/60'
        }`}
        onChange={(event) => onChange(event.target.value as T)}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {VARIABLE_LABELS[option]}
          </option>
        ))}
      </select>
    </label>
  );
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

function SplitFloatingTooltip({ tooltip }: { tooltip: SplitHoverTooltip | null }) {
  if (!tooltip) return null;

  return (
    <div
      className="split-floating-tooltip pointer-events-none absolute z-[1600] w-[260px] rounded-md border border-[var(--border-bright)] bg-[rgba(34,34,56,0.96)] p-4 text-[var(--text-primary)] shadow-2xl backdrop-blur"
      style={{
        left: tooltip.x,
        top: tooltip.y,
        transform:
          tooltip.placement === 'above'
            ? 'translate(-50%, calc(-100% - 18px))'
            : 'translate(-50%, 18px)',
      }}
    >
      <div className="text-2xl font-bold leading-tight">{tooltip.county}</div>
      <div className="mt-3 text-lg text-[var(--text-secondary)]">{tooltip.region}</div>
      <div className="my-4 h-px bg-[var(--border-bright)]" />
      <div className="mono text-sm uppercase tracking-[0.16em] text-[var(--text-secondary)]">{tooltip.label}</div>
      <div className="mono mt-2 text-4xl font-semibold text-[var(--text-primary)]">{tooltip.value}</div>
      <div
        className={`absolute left-1/2 h-5 w-5 -translate-x-1/2 rotate-45 border-[var(--border-bright)] bg-[rgba(34,34,56,0.96)] ${
          tooltip.placement === 'above'
            ? 'top-full -translate-y-1/2 border-b border-r'
            : 'bottom-full translate-y-1/2 border-l border-t'
        }`}
      />
    </div>
  );
}

export function SplitMapView({
  climateVar,
  onClimateVarChange,
  onCountySelect,
  onSocialVarChange,
  selectedCounty,
  socialVar,
}: SplitMapViewProps) {
  const { error, geoJSON, loading } = useGeoJSON();
  const { mapA, mapB, syncFrom } = useMapSync();
  const sliderSurfaceRef = useRef<HTMLDivElement | null>(null);
  const [sliderPercent, setSliderPercent] = useState(50);
  const [hoverTooltip, setHoverTooltip] = useState<SplitHoverTooltip | null>(null);
  const socialRange = getRange(socialVar);
  const climateRange = getRange(climateVar);
  const r = pearsonR(valuesFor(socialVar), valuesFor(climateVar));

  const updateHoverTooltip = useCallback((payload: CountyHoverPayload) => {
    const rect = sliderSurfaceRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rawX = payload.clientX - rect.left;
    const rawY = payload.clientY - rect.top;
    const tooltipHalfWidth = 130;
    const placement = rawY > 240 ? 'above' : 'below';
    setHoverTooltip({
      county: payload.county,
      label: payload.label,
      placement,
      region: payload.record.region,
      value: payload.value,
      x: Math.max(tooltipHalfWidth + 12, Math.min(rect.width - tooltipHalfWidth - 12, rawX)),
      y: placement === 'above' ? Math.max(238, rawY) : Math.max(14, rawY),
    });
  }, []);

  const setSliderFromClientX = useCallback((clientX: number) => {
    const rect = sliderSurfaceRef.current?.getBoundingClientRect();
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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
      <div className="grid shrink-0 border-b border-[var(--border)] md:grid-cols-2">
        <VariableSelect
          label="Social variable"
          onChange={onSocialVarChange}
          options={SOCIAL_VARIABLES}
          palette="social"
          value={socialVar}
        />
        <VariableSelect
          label="Climate variable"
          onChange={onClimateVarChange}
          options={CLIMATE_VARIABLES}
          palette="climate"
          value={climateVar}
        />
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden" ref={sliderSurfaceRef}>
        <div className="absolute inset-0">
          <MapContainer className="h-full w-full" {...mapProps}>
            <MapRegistrar mapRef={mapA} onSync={() => syncFrom('A')} />
            <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
            {geoJSON && (
              <CountyGeoJsonLayer
                geoJSON={geoJSON}
                getFillColor={(_, record: CountyRecord) =>
                  getChoroColor(record[socialVar], socialRange.min, socialRange.max, 'social')
                }
                layerKey={`social-${socialVar}-${selectedCounty ?? 'none'}`}
                onCountySelect={onCountySelect}
                onCountyHover={updateHoverTooltip}
                onCountyHoverEnd={() => setHoverTooltip(null)}
                selectedCounty={selectedCounty}
                showLeafletTooltip={false}
                tooltipLabel={VARIABLE_LABELS[socialVar]}
                tooltipValue={(_, record) => variableValueLabel(socialVar, record[socialVar])}
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
                getFillColor={(_, record: CountyRecord) =>
                  getChoroColor(record[climateVar], climateRange.min, climateRange.max, 'climate')
                }
                layerKey={`climate-${climateVar}-${selectedCounty ?? 'none'}`}
                onCountySelect={onCountySelect}
                onCountyHover={updateHoverTooltip}
                onCountyHoverEnd={() => setHoverTooltip(null)}
                selectedCounty={selectedCounty}
                showLeafletTooltip={false}
                tooltipLabel={VARIABLE_LABELS[climateVar]}
                tooltipValue={(_, record) => variableValueLabel(climateVar, record[climateVar])}
              />
            )}
          </MapContainer>
        </div>

        <div className="pointer-events-none absolute left-4 top-4 z-[900] rounded-md border border-cyan-800/50 bg-[rgba(15,15,26,0.82)] px-3 py-2 shadow-xl backdrop-blur">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7bccc4]">Left</div>
          <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{VARIABLE_LABELS[socialVar]}</div>
        </div>

        <div className="pointer-events-none absolute right-4 top-4 z-[900] max-w-[240px] rounded-md border border-red-900/50 bg-[rgba(15,15,26,0.82)] px-3 py-2 text-right shadow-xl backdrop-blur">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-critical)]">Right</div>
          <div className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{VARIABLE_LABELS[climateVar]}</div>
        </div>

        <div
          aria-label="Comparison reveal slider"
          aria-valuemax={92}
          aria-valuemin={8}
          aria-valuenow={Math.round(sliderPercent)}
          className="absolute top-0 z-[1100] flex h-full w-12 -translate-x-1/2 cursor-ew-resize touch-none items-center justify-center outline-none"
          onKeyDown={handleKeyDown}
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

        <SplitFloatingTooltip tooltip={hoverTooltip} />
        <MapStatus error={error} loading={loading} />
      </div>

      <div className="mono flex min-h-12 shrink-0 items-center justify-center border-t border-[var(--border)] bg-[var(--bg-1)] px-4 text-center text-xs text-[var(--text-secondary)] md:text-sm">
        Pearson r between {VARIABLE_LABELS[socialVar]} and {VARIABLE_LABELS[climateVar]} across{' '}
        {Object.keys(COUNTY_DATA).length} California counties:{' '}
        <span className="ml-1 font-semibold text-[var(--text-primary)]">r = {r.toFixed(2)}</span>
      </div>
    </section>
  );
}
