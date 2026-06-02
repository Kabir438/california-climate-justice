export function pearsonR(xs: number[], ys: number[]): number {
  const pairs = xs
    .map((x, i) => [x, ys[i]] as const)
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));

  const n = pairs.length;
  if (n === 0) return 0;

  const meanX = pairs.reduce((sum, [x]) => sum + x, 0) / n;
  const meanY = pairs.reduce((sum, [, y]) => sum + y, 0) / n;
  const num = pairs.reduce((sum, [x, y]) => sum + (x - meanX) * (y - meanY), 0);
  const denX = Math.sqrt(pairs.reduce((sum, [x]) => sum + (x - meanX) ** 2, 0));
  const denY = Math.sqrt(pairs.reduce((sum, [, y]) => sum + (y - meanY) ** 2, 0));

  return denX && denY ? num / (denX * denY) : 0;
}

export function normalize(value: number, min: number, max: number): number {
  return max === min ? 0 : (value - min) / (max - min);
}

export function quantileBreaks(values: number[], bucketCount: number): number[] {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (bucketCount <= 1 || sorted.length === 0) return [];

  return Array.from({ length: bucketCount - 1 }, (_, index) => {
    const position = ((index + 1) / bucketCount) * (sorted.length - 1);
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    const fraction = position - lower;
    return sorted[lower] + (sorted[upper] - sorted[lower]) * fraction;
  });
}

export function linearRegression(xs: number[], ys: number[]): { m: number; b: number } {
  const pairs = xs
    .map((x, i) => [x, ys[i]] as const)
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));

  const n = pairs.length;
  if (n === 0) return { m: 0, b: 0 };

  const sumX = pairs.reduce((sum, [x]) => sum + x, 0);
  const sumY = pairs.reduce((sum, [, y]) => sum + y, 0);
  const sumXY = pairs.reduce((sum, [x, y]) => sum + x * y, 0);
  const sumX2 = pairs.reduce((sum, [x]) => sum + x * x, 0);
  const denominator = n * sumX2 - sumX ** 2;

  if (denominator === 0) return { m: 0, b: sumY / n };

  const m = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY - m * sumX) / n;
  return { m, b };
}
