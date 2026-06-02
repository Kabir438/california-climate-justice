export function getChoroColor(
  value: number,
  min: number,
  max: number,
  palette: 'social' | 'climate',
): string {
  const t = max === min ? 0 : Math.max(0, Math.min(1, (value - min) / (max - min)));
  if (palette === 'social') {
    const stops = ['#f0f9e8', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#084081'];
    return stops[Math.floor(t * (stops.length - 1))];
  }

  const stops = ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#f03b20', '#bd0026'];
  return stops[Math.floor(t * (stops.length - 1))];
}

export function getCorrelationColor(r: number): string {
  const clamped = Math.max(-1, Math.min(1, r));
  if (clamped < 0) {
    const t = Math.abs(clamped);
    return `rgb(${Math.round(240 - t * 190)}, ${Math.round(248 - t * 180)}, ${Math.round(255 - t * 95)})`;
  }
  const t = clamped;
  return `rgb(${Math.round(255 - t * 130)}, ${Math.round(245 - t * 205)}, ${Math.round(240 - t * 205)})`;
}

export const DENSITY_COLORS = ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#2171b5', '#08306b'];

export function getDensityColor(value: number, breaks: number[]): string {
  const bucket = breaks.findIndex((breakValue) => value <= breakValue);
  return DENSITY_COLORS[bucket === -1 ? DENSITY_COLORS.length - 1 : bucket];
}
