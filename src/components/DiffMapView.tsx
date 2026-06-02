import { MapContainer, TileLayer } from 'react-leaflet';
import type { CountyName } from '../types';
import { useGeoJSON } from '../hooks/useGeoJSON';
import { BIVARIATE_COLORS, getBivariateBucket, variableValueLabel } from '../utils/scoring';
import { CountyGeoJsonLayer } from './CountyGeoJsonLayer';
import { CountyRankings } from './CountyRankings';
import { PatternCards } from './PatternCards';

const CENTER: [number, number] = [37.5, -119.5];
const MAX_BOUNDS: [[number, number], [number, number]] = [[31.8, -125.6], [42.6, -113.4]];
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; OpenStreetMap &copy; CARTO';

interface DiffMapViewProps {
  onCountySelect: (county: CountyName) => void;
  selectedCounty: CountyName | null;
}

function BivariateLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] rounded-md border border-[var(--border-bright)] bg-[rgba(15,15,26,0.92)] p-4 shadow-xl backdrop-blur">
      <div className="text-xs font-semibold text-[var(--text-primary)]">Double burden index</div>
      <div className="mt-3 grid grid-cols-[auto_repeat(3,22px)] grid-rows-[repeat(3,22px)_auto] gap-1">
        <div className="row-span-3 flex -rotate-90 items-center justify-center text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Climate Burden ↑
        </div>
        {[2, 1, 0].map((climate) =>
          [0, 1, 2].map((social) => (
            <div
              className="h-[22px] w-[22px] border border-[rgba(0,0,0,0.25)]"
              key={`${climate}-${social}`}
              style={{ background: BIVARIATE_COLORS[climate][social] }}
            />
          )),
        )}
        <div />
        <div className="col-span-3 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Social Vulnerability →
        </div>
      </div>
    </div>
  );
}

export function DiffMapView({ onCountySelect, selectedCounty }: DiffMapViewProps) {
  const { error, geoJSON, loading } = useGeoJSON();

  return (
    <section className="flex h-full flex-col bg-[var(--bg-0)]">
      <div className="relative min-h-0 flex-1">
        <MapContainer
          center={CENTER}
          className="h-full w-full"
          maxBounds={MAX_BOUNDS}
          maxBoundsViscosity={0.85}
          minZoom={5}
          scrollWheelZoom
          zoom={6}
        >
          <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
          {geoJSON && (
            <CountyGeoJsonLayer
              geoJSON={geoJSON}
              getFillColor={(_, record) => {
                const bucket = getBivariateBucket(record);
                return BIVARIATE_COLORS[bucket.climateBucket][bucket.socialBucket];
              }}
              layerKey={`diff-${selectedCounty ?? 'none'}`}
              onCountySelect={onCountySelect}
              selectedCounty={selectedCounty}
              tooltipLabel="Combined double burden"
              tooltipValue={(_, record) => variableValueLabel('cesScore', getBivariateBucket(record).combinedScore)}
            />
          )}
        </MapContainer>
        <BivariateLegend />
        {(loading || error) && (
          <div className="absolute inset-0 z-[900] flex items-center justify-center bg-[rgba(7,7,13,0.72)]">
            <div className="rounded-md border border-[var(--border-bright)] bg-[var(--bg-2)] px-5 py-4 text-sm text-[var(--text-secondary)]">
              {loading ? 'Loading California county boundaries…' : `GeoJSON error: ${error}`}
            </div>
          </div>
        )}
      </div>

      <div className="scrollbar-thin flex h-[300px] shrink-0 gap-4 overflow-x-auto border-t border-[var(--border)] bg-[var(--bg-0)] p-4">
        <CountyRankings onCountySelect={onCountySelect} />
        <PatternCards />
      </div>
    </section>
  );
}
