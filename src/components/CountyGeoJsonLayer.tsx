import { GeoJSON } from 'react-leaflet';
import type { GeoJsonObject } from 'geojson';
import type { Layer, LeafletMouseEvent, PathOptions } from 'leaflet';
import type { CountyName, CountyRecord } from '../types';
import { COUNTY_DATA } from '../data/countyData';
import { resolveCountyName } from '../utils/scoring';

export interface CountyHoverPayload {
  clientX: number;
  clientY: number;
  county: CountyName;
  label: string;
  record: CountyRecord;
  value: string;
}

interface CountyGeoJsonLayerProps {
  geoJSON: GeoJSON.FeatureCollection;
  getFillColor: (county: CountyName, record: CountyRecord) => string;
  layerKey: string;
  onCountyHover?: (payload: CountyHoverPayload) => void;
  onCountyHoverEnd?: () => void;
  onCountySelect: (county: CountyName) => void;
  selectedCounty: CountyName | null;
  showLeafletTooltip?: boolean;
  tooltipLabel: string;
  tooltipValue: (county: CountyName, record: CountyRecord) => string;
}

type StyledLayer = Layer & {
  bringToFront: () => void;
  setStyle: (style: PathOptions) => void;
};

function countyFromFeature(feature: GeoJSON.Feature): CountyName | null {
  const properties = feature.properties as { name?: string } | null;
  return resolveCountyName(properties?.name);
}

function tooltipHtml(county: CountyName, record: CountyRecord, label: string, value: string): string {
  return `
    <div class="min-w-[190px]">
      <div style="font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:700;letter-spacing:.02em;">${county}</div>
      <div style="color:#a8b2c4;font-size:11px;margin-top:2px;">${record.region}</div>
      <div style="height:1px;background:rgba(255,255,255,.15);margin:8px 0;"></div>
      <div style="color:#a8b2c4;font-size:10px;text-transform:uppercase;letter-spacing:.08em;">${label}</div>
      <div style="font-size:18px;font-weight:500;color:#f1faee;margin-top:2px;">${value}</div>
    </div>
  `;
}

function isStyledLayer(layer: Layer): layer is StyledLayer {
  return 'setStyle' in layer && typeof layer.setStyle === 'function';
}

export function CountyGeoJsonLayer({
  geoJSON,
  getFillColor,
  layerKey,
  onCountyHover,
  onCountyHoverEnd,
  onCountySelect,
  selectedCounty,
  showLeafletTooltip = true,
  tooltipLabel,
  tooltipValue,
}: CountyGeoJsonLayerProps) {
  const styleFor = (feature?: GeoJSON.Feature): PathOptions => {
    const county = feature ? countyFromFeature(feature) : null;
    const record = county ? COUNTY_DATA[county] : null;
    const selected = county === selectedCounty;

    return {
      color: selected ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.45)',
      fillColor: county && record ? getFillColor(county, record) : '#2a2a38',
      fillOpacity: county && record ? 0.88 : 0.22,
      opacity: 1,
      weight: selected ? 1.6 : 0.8,
    };
  };

  const onEachFeature = (feature: GeoJSON.Feature, layer: Layer) => {
    const county = countyFromFeature(feature);
    if (!county) return;
    const record = COUNTY_DATA[county];
    if (!record) return;
    const value = tooltipValue(county, record);

    if (showLeafletTooltip) {
      layer.bindTooltip(tooltipHtml(county, record, tooltipLabel, value), {
        className: 'climate-tooltip',
        direction: 'top',
        opacity: 1,
        sticky: true,
      });
    }

    const emitHover = (event: LeafletMouseEvent) => {
      onCountyHover?.({
        clientX: event.originalEvent.clientX,
        clientY: event.originalEvent.clientY,
        county,
        label: tooltipLabel,
        record,
        value,
      });
    };

    layer.on({
      click: () => onCountySelect(county),
      mouseout: () => {
        onCountyHoverEnd?.();
        if (isStyledLayer(layer)) {
          layer.setStyle(styleFor(feature));
        }
      },
      mousemove: emitHover,
      mouseover: (event: LeafletMouseEvent) => {
        emitHover(event);
        if (isStyledLayer(layer)) {
          layer.setStyle({
            color: '#ffffff',
            fillOpacity: 0.96,
            weight: 2,
          });
          layer.bringToFront();
        }
      },
    });
  };

  return (
    <GeoJSON
      key={layerKey}
      data={geoJSON as GeoJsonObject}
      onEachFeature={onEachFeature}
      style={styleFor}
    />
  );
}
