import { CLIMATE_VARIABLES, COUNTY_DATA, INVERTED_VARIABLES, SOCIAL_VARIABLES } from '../data/countyData';
import type { BivariateBucket, ClimateVariable, CountyName, CountyRecord, SocialVariable } from '../types';
import { normalize, pearsonR } from './statistics';

type NumericCountyKey = SocialVariable | ClimateVariable | 'seaLevelRisk';

const allCounties = Object.values(COUNTY_DATA);
const countyNames = Object.keys(COUNTY_DATA);

function cleanCountyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/city and county of/g, '')
    .replace(/county of/g, '')
    .replace(/county/g, '')
    .replace(/[^a-z]/g, '');
}

const COUNTY_ALIASES: Record<string, CountyName> = {
  sanfranciscocityandcounty: 'San Francisco',
  cityandcountyofsanfrancisco: 'San Francisco',
};

export function resolveCountyName(rawName: string | undefined): CountyName | null {
  if (!rawName) return null;
  const cleaned = cleanCountyName(rawName);
  if (COUNTY_ALIASES[cleaned]) return COUNTY_ALIASES[cleaned];

  const exact = countyNames.find((name) => cleanCountyName(name) === cleaned);
  if (exact) return exact;

  return (
    countyNames.find((name) => {
      const known = cleanCountyName(name);
      return cleaned.includes(known) || known.includes(cleaned);
    }) ?? null
  );
}

export function getCountyValue(county: CountyRecord, key: SocialVariable | ClimateVariable): number {
  return county[key];
}

export function getRange(key: NumericCountyKey): { min: number; max: number } {
  const vals = allCounties.map((county) => county[key]);
  return { min: Math.min(...vals), max: Math.max(...vals) };
}

export function getStateAverage(key: SocialVariable | ClimateVariable): number {
  return allCounties.reduce((sum, county) => sum + county[key], 0) / allCounties.length;
}

export function valuesFor(key: SocialVariable | ClimateVariable): number[] {
  return allCounties.map((county) => county[key]);
}

export function correlationFor(xVar: SocialVariable, yVar: ClimateVariable): number {
  return pearsonR(valuesFor(xVar), valuesFor(yVar));
}

export function socialVulnerabilityScore(county: CountyRecord): number {
  const weights: [NumericCountyKey, number][] = [
    ['povertyRate', 0.3],
    ['pctNonWhite', 0.25],
    ['medianIncome', 0.2],
    ['pctUninsured', 0.15],
    ['pctLingIsolated', 0.1],
  ];

  return (
    weights.reduce((score, [key, weight]) => {
      const { min, max } = getRange(key);
      let norm = normalize(county[key], min, max);
      if (INVERTED_VARIABLES.has(key)) norm = 1 - norm;
      return score + norm * weight;
    }, 0) * 100
  );
}

export function climateBurdenScore(county: CountyRecord): number {
  const weights: [NumericCountyKey, number][] = [
    ['cesScore', 0.3],
    ['unhealthyAirDays', 0.22],
    ['heatDays95', 0.18],
    ['pm25', 0.12],
    ['wildfireRisk', 0.1],
    ['floodRisk', 0.08],
  ];

  return (
    weights.reduce((score, [key, weight]) => {
      const { min, max } = getRange(key);
      return score + normalize(county[key], min, max) * weight;
    }, 0) * 100
  );
}

export function getBivariateBucket(county: CountyRecord): BivariateBucket {
  const social = socialVulnerabilityScore(county);
  const climate = climateBurdenScore(county);
  const bucket = (v: number): 0 | 1 | 2 => (v < 33 ? 0 : v < 66 ? 1 : 2);

  return {
    socialBucket: bucket(social),
    climateBucket: bucket(climate),
    combinedScore: (social + climate) / 2,
  };
}

export function sortedBurdenRankings() {
  return Object.entries(COUNTY_DATA)
    .map(([county, record]) => {
      const socialScore = socialVulnerabilityScore(record);
      const climateScore = climateBurdenScore(record);
      return {
        county,
        record,
        socialScore,
        climateScore,
        combinedScore: (socialScore + climateScore) / 2,
      };
    })
    .sort((a, b) => b.combinedScore - a.combinedScore);
}

export function variableValueLabel(key: SocialVariable | ClimateVariable, value: number): string {
  if (key === 'medianIncome') return `$${value.toFixed(0)}K`;
  if (key === 'avgJulyHigh') return `${value.toFixed(0)}°F`;
  if (key === 'pm25') return `${value.toFixed(1)} μg/m³`;
  if (key === 'heatDays95' || key === 'unhealthyAirDays') return `${value.toFixed(0)} days`;
  if (key === 'cesScore' || key === 'wildfireRisk') return value.toFixed(0);
  return `${value.toFixed(0)}%`;
}

export function correlationInterpretation(r: number, xLabel: string, yLabel: string): string {
  const direction = r >= 0 ? 'positive' : 'negative';
  const strength = Math.abs(r) >= 0.65 ? 'Strong' : Math.abs(r) >= 0.35 ? 'Moderate' : 'Weak';
  const trend = r >= 0 ? 'increases' : 'decreases';
  return `${strength} ${direction} correlation — as ${xLabel} increases, ${yLabel} ${trend}.`;
}

export const BIVARIATE_COLORS: string[][] = [
  ['#e8f4f8', '#b0d0e8', '#74a9cf'],
  ['#fef0d9', '#d4b9da', '#d7301f'],
  ['#fdcc8a', '#e34a33', '#49006a'],
];

export const REGION_COLORS: Record<string, string> = {
  'Northern Coast': '#7bdff2',
  'Northern Mountains': '#80ed99',
  'Sacramento Valley': '#f9c74f',
  'Sierra Nevada': '#90be6d',
  'Eastern Sierra': '#b8c0ff',
  'Bay Area': '#4cc9f0',
  'Northern Bay Area': '#4895ef',
  'Central Coast': '#43aa8b',
  'Greater LA': '#f94144',
  'Inland Empire': '#f3722c',
  'Southern California': '#f8961e',
  'Imperial Valley': '#9b5de5',
  'Central Valley': '#e63946',
};

export const VARIABLE_GROUPS = {
  social: SOCIAL_VARIABLES,
  climate: CLIMATE_VARIABLES,
};
