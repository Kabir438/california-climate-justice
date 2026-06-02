export type Region =
  | 'Northern Coast'
  | 'Northern Mountains'
  | 'Sacramento Valley'
  | 'Sierra Nevada'
  | 'Eastern Sierra'
  | 'Bay Area'
  | 'Northern Bay Area'
  | 'Central Coast'
  | 'Greater LA'
  | 'Inland Empire'
  | 'Southern California'
  | 'Imperial Valley'
  | 'Central Valley';

export interface CountyRecord {
  lat: number;
  lng: number;
  region: Region;
  population: number;
  areaSqMi: number;
  pctLatino: number;
  pctNonWhite: number;
  povertyRate: number;
  medianIncome: number;
  pctUninsured: number;
  pctLingIsolated: number;
  pctRenters: number;
  cesScore: number;
  avgJulyHigh: number;
  heatDays95: number;
  unhealthyAirDays: number;
  wildfireRisk: number;
  floodRisk: number;
  treeCanopy: number;
  pm25: number;
  seaLevelRisk: number;
  note: string;
}

export type CountyName = string;
export type CountyDataMap = Record<CountyName, CountyRecord>;

export type SocialVariable =
  | 'pctLatino'
  | 'pctNonWhite'
  | 'povertyRate'
  | 'medianIncome'
  | 'pctUninsured'
  | 'pctLingIsolated'
  | 'pctRenters';

export type ClimateVariable =
  | 'cesScore'
  | 'avgJulyHigh'
  | 'heatDays95'
  | 'unhealthyAirDays'
  | 'wildfireRisk'
  | 'floodRisk'
  | 'treeCanopy'
  | 'pm25';

export type AppMode = 'split' | 'diff' | 'correlation' | 'density';

export interface BivariateBucket {
  socialBucket: 0 | 1 | 2;
  climateBucket: 0 | 1 | 2;
  combinedScore: number;
}

export interface CorrelationResult {
  r: number;
  xVar: SocialVariable;
  yVar: ClimateVariable;
}

export interface ScatterPoint {
  county: CountyName;
  x: number;
  y: number;
  region: Region;
  population: number;
}

export type VariableLabel = Record<SocialVariable | ClimateVariable, string>;
