import type { ClimateVariable, CountyDataMap, CountyName, SocialVariable, VariableLabel } from '../types';

export const COUNTY_DATA: CountyDataMap = {
  "Del Norte": {
    lat: 41.74, lng: -123.87, region: "Northern Coast",
    population: 27_000, areaSqMi: 1_008,
    pctLatino: 12, pctNonWhite: 32, povertyRate: 19, medianIncome: 43,
    pctUninsured: 14, pctLingIsolated: 5, pctRenters: 38,
    cesScore: 38, avgJulyHigh: 55, heatDays95: 0, unhealthyAirDays: 3,
    wildfireRisk: 62, floodRisk: 15, treeCanopy: 65, pm25: 7.2, seaLevelRisk: 4,
    note: "14% Native American (Yurok, Tolowa). Coastal fog keeps temps low but flood and wildfire risk are significant. Post-timber economy with persistent poverty."
  },
  "Humboldt": {
    lat: 40.70, lng: -123.87, region: "Northern Coast",
    population: 136_000, areaSqMi: 3_573,
    pctLatino: 12, pctNonWhite: 28, povertyRate: 19, medianIncome: 46,
    pctUninsured: 12, pctLingIsolated: 4, pctRenters: 45,
    cesScore: 40, avgJulyHigh: 62, heatDays95: 0, unhealthyAirDays: 5,
    wildfireRisk: 65, floodRisk: 18, treeCanopy: 68, pm25: 7.8, seaLevelRisk: 5,
    note: "6% Native American. Post-timber economy. High poverty despite natural beauty. Flood risk from multiple river systems."
  },
  "Mendocino": {
    lat: 39.50, lng: -123.44, region: "Northern Coast",
    population: 91_000, areaSqMi: 3_509,
    pctLatino: 22, pctNonWhite: 35, povertyRate: 17, medianIncome: 48,
    pctUninsured: 13, pctLingIsolated: 7, pctRenters: 40,
    cesScore: 44, avgJulyHigh: 82, heatDays95: 5, unhealthyAirDays: 8,
    wildfireRisk: 78, floodRisk: 10, treeCanopy: 58, pm25: 8.2, seaLevelRisk: 3,
    note: "Growing Latino farmworker population in Ukiah Valley. Inland temps spike dramatically vs. coast. High wildfire risk."
  },
  "Siskiyou": {
    lat: 41.59, lng: -122.54, region: "Northern Mountains",
    population: 44_000, areaSqMi: 6_287,
    pctLatino: 9, pctNonWhite: 22, povertyRate: 19, medianIncome: 44,
    pctUninsured: 14, pctLingIsolated: 3, pctRenters: 38,
    cesScore: 30, avgJulyHigh: 88, heatDays95: 8, unhealthyAirDays: 12,
    wildfireRisk: 80, floodRisk: 8, treeCanopy: 62, pm25: 7.5, seaLevelRisk: 0,
    note: "Declining rural economy. High wildfire risk in Klamath National Forest interface."
  },
  "Trinity": {
    lat: 40.65, lng: -123.10, region: "Northern Mountains",
    population: 13_000, areaSqMi: 3_179,
    pctLatino: 9, pctNonWhite: 22, povertyRate: 22, medianIncome: 42,
    pctUninsured: 16, pctLingIsolated: 2, pctRenters: 32,
    cesScore: 28, avgJulyHigh: 92, heatDays95: 12, unhealthyAirDays: 10,
    wildfireRisk: 88, floodRisk: 8, treeCanopy: 72, pm25: 7.0, seaLevelRisk: 0,
    note: "One of California's poorest, most isolated counties. 80% forested, extreme wildfire risk."
  },
  "Modoc": {
    lat: 41.59, lng: -120.73, region: "Northern Mountains",
    population: 9_000, areaSqMi: 3_944,
    pctLatino: 12, pctNonWhite: 20, povertyRate: 20, medianIncome: 41,
    pctUninsured: 16, pctLingIsolated: 3, pctRenters: 30,
    cesScore: 24, avgJulyHigh: 88, heatDays95: 8, unhealthyAirDays: 5,
    wildfireRisk: 72, floodRisk: 6, treeCanopy: 50, pm25: 6.5, seaLevelRisk: 0,
    note: "California's least populated county. Ranch economy, extreme isolation, minimal services."
  },
  "Lassen": {
    lat: 40.68, lng: -120.59, region: "Northern Mountains",
    population: 30_000, areaSqMi: 4_558,
    pctLatino: 14, pctNonWhite: 28, povertyRate: 16, medianIncome: 50,
    pctUninsured: 11, pctLingIsolated: 4, pctRenters: 32,
    cesScore: 26, avgJulyHigh: 88, heatDays95: 8, unhealthyAirDays: 8,
    wildfireRisk: 68, floodRisk: 6, treeCanopy: 52, pm25: 7.5, seaLevelRisk: 0,
    note: "Prison population significantly inflates non-white demographic count. High incarceration rates skew data interpretation."
  },
  "Plumas": {
    lat: 40.00, lng: -120.84, region: "Northern Mountains",
    population: 19_000, areaSqMi: 2_613,
    pctLatino: 8, pctNonWhite: 15, povertyRate: 18, medianIncome: 50,
    pctUninsured: 13, pctLingIsolated: 2, pctRenters: 28,
    cesScore: 22, avgJulyHigh: 88, heatDays95: 8, unhealthyAirDays: 12,
    wildfireRisk: 90, floodRisk: 5, treeCanopy: 72, pm25: 8.0, seaLevelRisk: 0,
    note: "The 2021 Dixie Fire — California's largest single-source fire ever at 963,000 acres — burned largely here. Highest wildfire risk in state."
  },
  "Shasta": {
    lat: 40.76, lng: -121.95, region: "Sacramento Valley",
    population: 181_000, areaSqMi: 3_786,
    pctLatino: 11, pctNonWhite: 22, povertyRate: 16, medianIncome: 52,
    pctUninsured: 12, pctLingIsolated: 3, pctRenters: 38,
    cesScore: 38, avgJulyHigh: 101, heatDays95: 28, unhealthyAirDays: 22,
    wildfireRisk: 82, floodRisk: 10, treeCanopy: 42, pm25: 9.5, seaLevelRisk: 0,
    note: "2018 Carr Fire burned into Redding city limits. High combined heat and wildfire burden."
  },
  "Tehama": {
    lat: 40.13, lng: -122.23, region: "Sacramento Valley",
    population: 65_000, areaSqMi: 2_951,
    pctLatino: 24, pctNonWhite: 32, povertyRate: 22, medianIncome: 46,
    pctUninsured: 15, pctLingIsolated: 7, pctRenters: 35,
    cesScore: 50, avgJulyHigh: 100, heatDays95: 32, unhealthyAirDays: 28,
    wildfireRisk: 78, floodRisk: 12, treeCanopy: 35, pm25: 10.2, seaLevelRisk: 0,
    note: "High agricultural poverty. July temps consistently 100°F+. Limited healthcare access — a preview of Central Valley conditions."
  },
  "Glenn": {
    lat: 39.60, lng: -122.39, region: "Sacramento Valley",
    population: 29_000, areaSqMi: 1_315,
    pctLatino: 32, pctNonWhite: 40, povertyRate: 19, medianIncome: 52,
    pctUninsured: 16, pctLingIsolated: 10, pctRenters: 32,
    cesScore: 52, avgJulyHigh: 99, heatDays95: 30, unhealthyAirDays: 30,
    wildfireRisk: 55, floodRisk: 18, treeCanopy: 28, pm25: 10.8, seaLevelRisk: 0,
    note: "High Latino farmworker population. Sacramento River flooding risk. 10% linguistically isolated — emergency alerts often inaccessible."
  },
  "Colusa": {
    lat: 39.18, lng: -122.24, region: "Sacramento Valley",
    population: 22_000, areaSqMi: 1_151,
    pctLatino: 50, pctNonWhite: 57, povertyRate: 20, medianIncome: 52,
    pctUninsured: 17, pctLingIsolated: 16, pctRenters: 32,
    cesScore: 56, avgJulyHigh: 100, heatDays95: 32, unhealthyAirDays: 35,
    wildfireRisk: 40, floodRisk: 22, treeCanopy: 20, pm25: 11.8, seaLevelRisk: 0,
    note: "50% Latino agricultural county. 16% linguistically isolated — Chen (2019) documents exactly this dynamic: language barriers prevent communities from accessing critical environmental information."
  },
  "Butte": {
    lat: 39.67, lng: -121.60, region: "Sacramento Valley",
    population: 211_000, areaSqMi: 1_636,
    pctLatino: 15, pctNonWhite: 25, povertyRate: 18, medianIncome: 51,
    pctUninsured: 12, pctLingIsolated: 4, pctRenters: 42,
    cesScore: 44, avgJulyHigh: 97, heatDays95: 26, unhealthyAirDays: 28,
    wildfireRisk: 85, floodRisk: 12, treeCanopy: 40, pm25: 10.0, seaLevelRisk: 0,
    note: "2018 Camp Fire: 85 deaths, 18,804 structures destroyed, town of Paradise erased. Deadliest wildfire in CA history. Low-income renters unable to recover."
  },
  "Sutter": {
    lat: 39.04, lng: -121.69, region: "Sacramento Valley",
    population: 99_000, areaSqMi: 603,
    pctLatino: 20, pctNonWhite: 38, povertyRate: 14, medianIncome: 60,
    pctUninsured: 11, pctLingIsolated: 8, pctRenters: 36,
    cesScore: 50, avgJulyHigh: 98, heatDays95: 28, unhealthyAirDays: 32,
    wildfireRisk: 28, floodRisk: 22, treeCanopy: 24, pm25: 11.2, seaLevelRisk: 0,
    note: "Yuba City. Significant Sikh Punjabi-American community. Sacramento River valley flood risk. Valley heat compounded by agricultural burning."
  },
  "Yuba": {
    lat: 39.27, lng: -121.35, region: "Sacramento Valley",
    population: 81_000, areaSqMi: 630,
    pctLatino: 18, pctNonWhite: 35, povertyRate: 19, medianIncome: 52,
    pctUninsured: 13, pctLingIsolated: 6, pctRenters: 38,
    cesScore: 52, avgJulyHigh: 98, heatDays95: 28, unhealthyAirDays: 32,
    wildfireRisk: 40, floodRisk: 20, treeCanopy: 28, pm25: 11.0, seaLevelRisk: 0,
    note: "Marysville. 1997 flood memory. Air quality impacted by Sacramento Valley agricultural burning and valley inversion layers."
  },
  "Sacramento": {
    lat: 38.57, lng: -121.47, region: "Sacramento Valley",
    population: 1_585_000, areaSqMi: 994,
    pctLatino: 22, pctNonWhite: 52, povertyRate: 16, medianIncome: 68,
    pctUninsured: 10, pctLingIsolated: 12, pctRenters: 48,
    cesScore: 62, avgJulyHigh: 97, heatDays95: 28, unhealthyAirDays: 35,
    wildfireRisk: 35, floodRisk: 18, treeCanopy: 22, pm25: 12.5, seaLevelRisk: 0,
    note: "State capital with profound internal inequality. South Sacramento's Black and Latino communities face urban heat island 7°F above affluent north Sacramento — a textbook redlining heat spiral."
  },
  "Yolo": {
    lat: 38.68, lng: -121.90, region: "Sacramento Valley",
    population: 220_000, areaSqMi: 1_013,
    pctLatino: 32, pctNonWhite: 48, povertyRate: 15, medianIncome: 72,
    pctUninsured: 10, pctLingIsolated: 10, pctRenters: 42,
    cesScore: 44, avgJulyHigh: 98, heatDays95: 30, unhealthyAirDays: 35,
    wildfireRisk: 28, floodRisk: 22, treeCanopy: 22, pm25: 11.5, seaLevelRisk: 0,
    note: "UC Davis research hub alongside Woodland farmworker community. Delta levee failure risk threatens 25 million Californians' drinking water supply — disproportionate burden on those who can't relocate."
  },
  "Sierra": {
    lat: 39.58, lng: -120.52, region: "Sierra Nevada",
    population: 3_000, areaSqMi: 953,
    pctLatino: 10, pctNonWhite: 15, povertyRate: 16, medianIncome: 55,
    pctUninsured: 12, pctLingIsolated: 2, pctRenters: 28,
    cesScore: 20, avgJulyHigh: 84, heatDays95: 5, unhealthyAirDays: 8,
    wildfireRisk: 82, floodRisk: 5, treeCanopy: 70, pm25: 7.2, seaLevelRisk: 0,
    note: "California's second-least-populated county. Snowpack-dependent water supply severely impacted by drought."
  },
  "Placer": {
    lat: 39.06, lng: -120.71, region: "Sierra Nevada",
    population: 412_000, areaSqMi: 1_503,
    pctLatino: 10, pctNonWhite: 18, povertyRate: 7, medianIncome: 95,
    pctUninsured: 7, pctLingIsolated: 3, pctRenters: 28,
    cesScore: 22, avgJulyHigh: 95, heatDays95: 25, unhealthyAirDays: 24,
    wildfireRisk: 65, floodRisk: 6, treeCanopy: 38, pm25: 9.8, seaLevelRisk: 0,
    note: "Tech-adjacent suburbs. High income buffers from climate burden. This is what Baer (2021) calls 'ecological modernization privilege' — wealth enables adaptation that systemic change would make universal."
  },
  "El Dorado": {
    lat: 38.78, lng: -120.52, region: "Sierra Nevada",
    population: 193_000, areaSqMi: 1_786,
    pctLatino: 9, pctNonWhite: 16, povertyRate: 10, medianIncome: 85,
    pctUninsured: 8, pctLingIsolated: 2, pctRenters: 28,
    cesScore: 24, avgJulyHigh: 95, heatDays95: 22, unhealthyAirDays: 22,
    wildfireRisk: 78, floodRisk: 5, treeCanopy: 52, pm25: 9.5, seaLevelRisk: 0,
    note: "2021 Caldor Fire forced 50,000 evacuations, nearly reaching South Lake Tahoe. Wealthier residents recover; renters and seasonal workers are displaced permanently."
  },
  "Nevada": {
    lat: 39.30, lng: -120.77, region: "Sierra Nevada",
    population: 103_000, areaSqMi: 974,
    pctLatino: 8, pctNonWhite: 14, povertyRate: 11, medianIncome: 68,
    pctUninsured: 10, pctLingIsolated: 2, pctRenters: 32,
    cesScore: 22, avgJulyHigh: 92, heatDays95: 18, unhealthyAirDays: 15,
    wildfireRisk: 82, floodRisk: 4, treeCanopy: 58, pm25: 9.0, seaLevelRisk: 0,
    note: "Grass Valley, Nevada City. Progressive community but aging and predominantly white. Extreme wildfire risk; insurance increasingly unavailable."
  },
  "Amador": {
    lat: 38.45, lng: -120.65, region: "Sierra Nevada",
    population: 41_000, areaSqMi: 593,
    pctLatino: 12, pctNonWhite: 20, povertyRate: 12, medianIncome: 62,
    pctUninsured: 11, pctLingIsolated: 3, pctRenters: 30,
    cesScore: 30, avgJulyHigh: 92, heatDays95: 18, unhealthyAirDays: 18,
    wildfireRisk: 80, floodRisk: 5, treeCanopy: 52, pm25: 9.0, seaLevelRisk: 0,
    note: "Gold country. Aging population. State FAIR Plan (insurer of last resort) subscribers up 300% in this region since 2020 as private insurers exit."
  },
  "Calaveras": {
    lat: 38.20, lng: -120.56, region: "Sierra Nevada",
    population: 46_000, areaSqMi: 1_020,
    pctLatino: 13, pctNonWhite: 20, povertyRate: 14, medianIncome: 60,
    pctUninsured: 12, pctLingIsolated: 3, pctRenters: 28,
    cesScore: 30, avgJulyHigh: 92, heatDays95: 18, unhealthyAirDays: 15,
    wildfireRisk: 82, floodRisk: 5, treeCanopy: 52, pm25: 8.8, seaLevelRisk: 0,
    note: "Angels Camp. High wildfire risk, home insurance increasingly unavailable. The climate-finance-race nexus: insurance deserts overlap with both wealthy fire-risk zones AND historically redlined urban zones."
  },
  "Tuolumne": {
    lat: 37.97, lng: -119.94, region: "Sierra Nevada",
    population: 54_000, areaSqMi: 2_236,
    pctLatino: 15, pctNonWhite: 22, povertyRate: 15, medianIncome: 56,
    pctUninsured: 12, pctLingIsolated: 4, pctRenters: 30,
    cesScore: 32, avgJulyHigh: 90, heatDays95: 15, unhealthyAirDays: 18,
    wildfireRisk: 85, floodRisk: 5, treeCanopy: 58, pm25: 8.5, seaLevelRisk: 0,
    note: "2013 Rim Fire: 257,000 acres. Sonora. Wildfire risk escalating as drought persists."
  },
  "Mariposa": {
    lat: 37.57, lng: -119.89, region: "Sierra Nevada",
    population: 17_000, areaSqMi: 1_451,
    pctLatino: 13, pctNonWhite: 20, povertyRate: 15, medianIncome: 52,
    pctUninsured: 13, pctLingIsolated: 3, pctRenters: 28,
    cesScore: 28, avgJulyHigh: 92, heatDays95: 18, unhealthyAirDays: 22,
    wildfireRisk: 88, floodRisk: 5, treeCanopy: 60, pm25: 9.2, seaLevelRisk: 0,
    note: "Yosemite gateway. 2022 Oak Fire burned 19,000 acres. Among highest wildfire risk scores of any non-desert CA county."
  },
  "Alpine": {
    lat: 38.60, lng: -119.82, region: "Sierra Nevada",
    population: 1_200, areaSqMi: 738,
    pctLatino: 10, pctNonWhite: 22, povertyRate: 10, medianIncome: 58,
    pctUninsured: 12, pctLingIsolated: 2, pctRenters: 25,
    cesScore: 18, avgJulyHigh: 75, heatDays95: 2, unhealthyAirDays: 5,
    wildfireRisk: 58, floodRisk: 5, treeCanopy: 68, pm25: 7.0, seaLevelRisk: 0,
    note: "California's least populated county (~1,200 residents). Snowpack loss threatens Tahoe-area water supply and regional tourism economy."
  },
  "Mono": {
    lat: 37.94, lng: -118.89, region: "Eastern Sierra",
    population: 14_000, areaSqMi: 3_044,
    pctLatino: 19, pctNonWhite: 28, povertyRate: 13, medianIncome: 58,
    pctUninsured: 14, pctLingIsolated: 5, pctRenters: 38,
    cesScore: 22, avgJulyHigh: 85, heatDays95: 5, unhealthyAirDays: 8,
    wildfireRisk: 55, floodRisk: 5, treeCanopy: 45, pm25: 7.5, seaLevelRisk: 0,
    note: "Mammoth Lakes. Eastern Sierra tourism economy. Mono Lake restoration — landmark 1994 environmental ruling — is a key precedent for community-led climate protection."
  },
  "Inyo": {
    lat: 36.51, lng: -117.41, region: "Eastern Sierra",
    population: 19_000, areaSqMi: 10_203,
    pctLatino: 20, pctNonWhite: 35, povertyRate: 14, medianIncome: 52,
    pctUninsured: 14, pctLingIsolated: 5, pctRenters: 35,
    cesScore: 34, avgJulyHigh: 105, heatDays95: 82, unhealthyAirDays: 12,
    wildfireRisk: 32, floodRisk: 4, treeCanopy: 12, pm25: 8.5, seaLevelRisk: 0,
    note: "13% Native American (Eastern Sierra Paiute, Shoshone). Death Valley reaches 130°F+. Bishop Paiute Tribe faces compound climate threat — extreme heat, water scarcity, minimal resources — with no political capital to demand protection."
  },
  "Lake": {
    lat: 39.10, lng: -122.75, region: "Northern Bay Area",
    population: 68_000, areaSqMi: 1_256,
    pctLatino: 20, pctNonWhite: 32, povertyRate: 22, medianIncome: 41,
    pctUninsured: 15, pctLingIsolated: 6, pctRenters: 38,
    cesScore: 62, avgJulyHigh: 95, heatDays95: 22, unhealthyAirDays: 28,
    wildfireRisk: 88, floodRisk: 10, treeCanopy: 45, pm25: 10.5, seaLevelRisk: 0,
    note: "2015 Valley Fire: 1,955 structures destroyed in 12 hours. Highest combined wildfire + poverty score of any Bay Area-adjacent county. Sulphur Bank Mine Superfund site contaminates Clear Lake — a majority-Latino fishing community."
  },
  "Sonoma": {
    lat: 38.53, lng: -122.89, region: "Bay Area",
    population: 494_000, areaSqMi: 1_576,
    pctLatino: 27, pctNonWhite: 36, povertyRate: 10, medianIncome: 80,
    pctUninsured: 9, pctLingIsolated: 8, pctRenters: 38,
    cesScore: 36, avgJulyHigh: 80, heatDays95: 8, unhealthyAirDays: 6,
    wildfireRisk: 72, floodRisk: 8, treeCanopy: 42, pm25: 8.5, seaLevelRisk: 3,
    note: "2017 Tubbs Fire killed 22, destroyed 5,300 structures. Latino farmworkers disproportionately lost housing — many were undocumented and ineligible for FEMA aid. An example of Baer's (2021) 'socioeconomic gap' compounding disaster vulnerability."
  },
  "Napa": {
    lat: 38.51, lng: -122.27, region: "Bay Area",
    population: 137_000, areaSqMi: 788,
    pctLatino: 35, pctNonWhite: 42, povertyRate: 9, medianIncome: 82,
    pctUninsured: 10, pctLingIsolated: 10, pctRenters: 38,
    cesScore: 38, avgJulyHigh: 88, heatDays95: 12, unhealthyAirDays: 8,
    wildfireRisk: 68, floodRisk: 8, treeCanopy: 38, pm25: 8.8, seaLevelRisk: 3,
    note: "35% Latino — predominantly wine industry workers with housing insecurity and smoke exposure during harvest season. County median income masks severe inequality between vineyard workers and winery owners."
  },
  "Marin": {
    lat: 38.09, lng: -122.73, region: "Bay Area",
    population: 259_000, areaSqMi: 520,
    pctLatino: 16, pctNonWhite: 24, povertyRate: 7, medianIncome: 115,
    pctUninsured: 5, pctLingIsolated: 4, pctRenters: 35,
    cesScore: 16, avgJulyHigh: 72, heatDays95: 2, unhealthyAirDays: 3,
    wildfireRisk: 65, floodRisk: 8, treeCanopy: 48, pm25: 6.8, seaLevelRisk: 6,
    note: "Wealthiest county in CA. 48% tree canopy = coolest urban air. Lowest CalEnviroScreen score in state. Yet high wildfire risk shows wealth doesn't fully insulate from climate hazard — supporting Baer's (2021) argument that systemic change is required."
  },
  "San Francisco": {
    lat: 37.77, lng: -122.42, region: "Bay Area",
    population: 874_000, areaSqMi: 47,
    pctLatino: 15, pctNonWhite: 55, povertyRate: 10, medianIncome: 130,
    pctUninsured: 4, pctLingIsolated: 12, pctRenters: 62,
    cesScore: 42, avgJulyHigh: 65, heatDays95: 0, unhealthyAirDays: 4,
    wildfireRisk: 15, floodRisk: 18, treeCanopy: 18, pm25: 8.5, seaLevelRisk: 8,
    note: "Highest median income in CA but extreme inequality. 12% linguistically isolated. Coastal flooding threatens SoMa and Mission districts — predominantly Latino/working-class areas — while Pacific Heights remains above the flood line."
  },
  "Contra Costa": {
    lat: 37.92, lng: -122.00, region: "Bay Area",
    population: 1_165_000, areaSqMi: 720,
    pctLatino: 24, pctNonWhite: 48, povertyRate: 9, medianIncome: 95,
    pctUninsured: 7, pctLingIsolated: 8, pctRenters: 38,
    cesScore: 52, avgJulyHigh: 88, heatDays95: 15, unhealthyAirDays: 18,
    wildfireRisk: 45, floodRisk: 10, treeCanopy: 32, pm25: 10.2, seaLevelRisk: 5,
    note: "Richmond (Chevron refinery): 2012 explosion sent 15,000 to ERs — largest environmental health emergency in Bay Area history. Cited in Chen (2019): Asian and Black residents in Richmond 'have organized time and time again to demand greater corporate accountability.' County CES average hides 99th-percentile Richmond census tracts."
  },
  "Alameda": {
    lat: 37.65, lng: -121.92, region: "Bay Area",
    population: 1_682_000, areaSqMi: 738,
    pctLatino: 22, pctNonWhite: 62, povertyRate: 10, medianIncome: 95,
    pctUninsured: 6, pctLingIsolated: 12, pctRenters: 48,
    cesScore: 55, avgJulyHigh: 74, heatDays95: 5, unhealthyAirDays: 12,
    wildfireRisk: 28, floodRisk: 15, treeCanopy: 24, pm25: 10.0, seaLevelRisk: 6,
    note: "West Oakland: diesel PM2.5 400% above state average. Life expectancy gap between West Oakland and Oakland Hills: 15 years. Black children in Oakland 3x more likely to be hospitalized for asthma (UCSF, 2022). A direct example of Baer's 'treadmill of production': Port of Oakland's logistics chains deposit their externalities in the adjacent community."
  },
  "Solano": {
    lat: 38.27, lng: -121.91, region: "Bay Area",
    population: 447_000, areaSqMi: 828,
    pctLatino: 24, pctNonWhite: 52, povertyRate: 12, medianIncome: 78,
    pctUninsured: 8, pctLingIsolated: 8, pctRenters: 42,
    cesScore: 48, avgJulyHigh: 88, heatDays95: 15, unhealthyAirDays: 20,
    wildfireRisk: 42, floodRisk: 12, treeCanopy: 24, pm25: 10.5, seaLevelRisk: 5,
    note: "Vallejo declared municipal bankruptcy 2008 — services collapsed in Black/Latino neighborhoods. Fairfield warehouse corridors driving diesel pollution. Suisun Bay ship-breaking creates toxic waste in low-income waterfront areas."
  },
  "San Mateo": {
    lat: 37.43, lng: -122.35, region: "Bay Area",
    population: 764_000, areaSqMi: 449,
    pctLatino: 26, pctNonWhite: 58, povertyRate: 6, medianIncome: 120,
    pctUninsured: 5, pctLingIsolated: 12, pctRenters: 40,
    cesScore: 30, avgJulyHigh: 70, heatDays95: 1, unhealthyAirDays: 4,
    wildfireRisk: 38, floodRisk: 12, treeCanopy: 28, pm25: 8.0, seaLevelRisk: 7,
    note: "Silicon Valley wealth corridor. North Fair Oaks (70% Latino, unincorporated) faces bay flooding risk with no city government to advocate for protection — invisible to policymakers, as Chen (2019) describes for linguistically isolated communities."
  },
  "Santa Clara": {
    lat: 37.35, lng: -121.96, region: "Bay Area",
    population: 1_936_000, areaSqMi: 1_291,
    pctLatino: 27, pctNonWhite: 65, povertyRate: 7, medianIncome: 130,
    pctUninsured: 6, pctLingIsolated: 14, pctRenters: 42,
    cesScore: 34, avgJulyHigh: 82, heatDays95: 8, unhealthyAirDays: 10,
    wildfireRisk: 32, floodRisk: 10, treeCanopy: 22, pm25: 9.5, seaLevelRisk: 4,
    note: "Highest median income among large CA counties. 14% linguistically isolated. East San Jose (75% Latino/Vietnamese, high density) versus Los Altos Hills. 14% of households cannot process English-language emergency alerts — exactly the information-access gap Chen (2019) documents."
  },
  "Santa Cruz": {
    lat: 37.05, lng: -121.98, region: "Central Coast",
    population: 270_000, areaSqMi: 445,
    pctLatino: 28, pctNonWhite: 38, povertyRate: 12, medianIncome: 82,
    pctUninsured: 9, pctLingIsolated: 8, pctRenters: 42,
    cesScore: 36, avgJulyHigh: 72, heatDays95: 2, unhealthyAirDays: 5,
    wildfireRisk: 52, floodRisk: 10, treeCanopy: 42, pm25: 8.2, seaLevelRisk: 5,
    note: "2020 CZU Lightning Complex Fire: 86,000 acres. Strawberry farmworkers (80% Latino) in Watsonville face pesticide exposure and fire smoke with no paid sick leave — the same farmworker labor vulnerability Baer (2021) identifies as a structural consequence of capitalist agriculture."
  },
  "San Benito": {
    lat: 36.60, lng: -121.08, region: "Central Coast",
    population: 64_000, areaSqMi: 1_389,
    pctLatino: 59, pctNonWhite: 66, povertyRate: 13, medianIncome: 72,
    pctUninsured: 11, pctLingIsolated: 15, pctRenters: 38,
    cesScore: 54, avgJulyHigh: 90, heatDays95: 18, unhealthyAirDays: 18,
    wildfireRisk: 55, floodRisk: 8, treeCanopy: 22, pm25: 9.8, seaLevelRisk: 0,
    note: "Hollister. 59% Latino agricultural county. Hot interior valley. 15% linguistically isolated — critical information-access gap per Chen (2019)."
  },
  "Monterey": {
    lat: 36.24, lng: -121.31, region: "Central Coast",
    population: 434_000, areaSqMi: 3_322,
    pctLatino: 57, pctNonWhite: 67, povertyRate: 14, medianIncome: 68,
    pctUninsured: 13, pctLingIsolated: 18, pctRenters: 44,
    cesScore: 58, avgJulyHigh: 72, heatDays95: 2, unhealthyAirDays: 8,
    wildfireRisk: 48, floodRisk: 12, treeCanopy: 28, pm25: 9.2, seaLevelRisk: 5,
    note: "Salinas Valley — 'Salad Bowl of the World.' 57% Latino. 18% linguistically isolated. Farmworkers have no federal right to shade or water breaks. Pesticide drift is routine. This is Baer's (2021) 'capitalist treadmill of production' applied to agricultural labor: externalities deposited in the bodies of the workers."
  },
  "San Luis Obispo": {
    lat: 35.40, lng: -120.61, region: "Central Coast",
    population: 283_000, areaSqMi: 3_299,
    pctLatino: 19, pctNonWhite: 28, povertyRate: 12, medianIncome: 74,
    pctUninsured: 8, pctLingIsolated: 5, pctRenters: 38,
    cesScore: 28, avgJulyHigh: 78, heatDays95: 5, unhealthyAirDays: 5,
    wildfireRisk: 55, floodRisk: 6, treeCanopy: 32, pm25: 8.0, seaLevelRisk: 4,
    note: "Cal Poly, coastal affluence. Relatively low burden. Diablo Canyon nuclear closure raises energy-transition equity questions."
  },
  "Santa Barbara": {
    lat: 34.74, lng: -119.74, region: "Central Coast",
    population: 448_000, areaSqMi: 2_737,
    pctLatino: 45, pctNonWhite: 55, povertyRate: 13, medianIncome: 76,
    pctUninsured: 11, pctLingIsolated: 14, pctRenters: 45,
    cesScore: 44, avgJulyHigh: 80, heatDays95: 8, unhealthyAirDays: 8,
    wildfireRisk: 62, floodRisk: 6, treeCanopy: 28, pm25: 9.0, seaLevelRisk: 4,
    note: "2018 Thomas Fire was at the time the largest in CA history. Primarily affluent Montecito affected by the mudslide — yet Santa Maria (predominantly Latino, agricultural) bore air quality impacts for months. Same disaster, different exposure."
  },
  "Ventura": {
    lat: 34.36, lng: -119.13, region: "Greater LA",
    population: 843_000, areaSqMi: 1_843,
    pctLatino: 43, pctNonWhite: 52, povertyRate: 9, medianIncome: 88,
    pctUninsured: 10, pctLingIsolated: 12, pctRenters: 38,
    cesScore: 40, avgJulyHigh: 82, heatDays95: 8, unhealthyAirDays: 12,
    wildfireRisk: 68, floodRisk: 6, treeCanopy: 22, pm25: 10.0, seaLevelRisk: 3,
    note: "Oxnard: 75% Latino, strawberry capital of CA. 2018 Woolsey Fire destroyed 1,643 structures. Port of Hueneme diesel pollution concentrated in Latino working-class neighborhoods."
  },
  "Los Angeles": {
    lat: 34.05, lng: -118.24, region: "Greater LA",
    population: 10_014_000, areaSqMi: 4_058,
    pctLatino: 49, pctNonWhite: 73, povertyRate: 15, medianIncome: 70,
    pctUninsured: 12, pctLingIsolated: 16, pctRenters: 53,
    cesScore: 72, avgJulyHigh: 90, heatDays95: 22, unhealthyAirDays: 42,
    wildfireRisk: 58, floodRisk: 8, treeCanopy: 18, pm25: 14.5, seaLevelRisk: 5,
    note: "Most populous county in the US. Bel Air: 43% tree canopy, avg temp 82°F. Watts: 3% tree canopy, avg temp 92°F. 100+ oil wells operating inside Wilmington residential neighborhood. Ports of LA/LB: 40% of US container imports. 16% linguistically isolated. This is Baer's (2021) treadmill of production and Chen's (2019) information-access gap operating simultaneously at continental scale."
  },
  "Orange": {
    lat: 33.72, lng: -117.75, region: "Greater LA",
    population: 3_186_000, areaSqMi: 798,
    pctLatino: 35, pctNonWhite: 57, povertyRate: 9, medianIncome: 92,
    pctUninsured: 10, pctLingIsolated: 14, pctRenters: 40,
    cesScore: 46, avgJulyHigh: 82, heatDays95: 12, unhealthyAirDays: 32,
    wildfireRisk: 35, floodRisk: 5, treeCanopy: 18, pm25: 12.5, seaLevelRisk: 4,
    note: "Santa Ana (78% Latino, 22% poverty) sits within one of CA's wealthiest counties. Urban heat island 6°F between Santa Ana and Irvine — same county, opposite climate realities."
  },
  "Riverside": {
    lat: 33.95, lng: -117.40, region: "Inland Empire",
    population: 2_418_000, areaSqMi: 7_208,
    pctLatino: 50, pctNonWhite: 64, povertyRate: 13, medianIncome: 70,
    pctUninsured: 12, pctLingIsolated: 14, pctRenters: 40,
    cesScore: 66, avgJulyHigh: 100, heatDays95: 55, unhealthyAirDays: 65,
    wildfireRisk: 48, floodRisk: 7, treeCanopy: 12, pm25: 15.5, seaLevelRisk: 0,
    note: "Fastest-growing county in CA. Amazon, Walmart, and logistics giants: 1 million+ diesel truck trips/week. Coachella Valley (80% Latino): 108°F summer highs. Farmworkers labor in heat with no federal protection. This is Baer's (2021) capitalist treadmill — global supply chains deposit their pollution costs directly onto the bodies of low-income communities of color."
  },
  "San Bernardino": {
    lat: 34.10, lng: -116.89, region: "Inland Empire",
    population: 2_181_000, areaSqMi: 20_057,
    pctLatino: 55, pctNonWhite: 72, povertyRate: 17, medianIncome: 62,
    pctUninsured: 14, pctLingIsolated: 15, pctRenters: 42,
    cesScore: 72, avgJulyHigh: 102, heatDays95: 65, unhealthyAirDays: 78,
    wildfireRisk: 52, floodRisk: 5, treeCanopy: 8, pm25: 16.2, seaLevelRisk: 0,
    note: "Largest county in the contiguous US by area. Only 8% tree canopy — no cooling infrastructure. American Lung Association: San Bernardino routinely ranks #1 most ozone-polluted US metro. 55% Latino, 17% poverty. The Jevons paradox Baer (2021) describes: efficiency gains in production are outpaced by the volume of production itself — and communities of color absorb the residual."
  },
  "San Diego": {
    lat: 33.00, lng: -116.73, region: "Southern California",
    population: 3_298_000, areaSqMi: 4_207,
    pctLatino: 34, pctNonWhite: 55, povertyRate: 11, medianIncome: 85,
    pctUninsured: 10, pctLingIsolated: 10, pctRenters: 42,
    cesScore: 44, avgJulyHigh: 78, heatDays95: 8, unhealthyAirDays: 15,
    wildfireRisk: 52, floodRisk: 5, treeCanopy: 20, pm25: 10.5, seaLevelRisk: 5,
    note: "Barrio Logan (93% Latino): sandwiched between I-5, the Coronado Bridge, and naval shipyards. 1970 community victory reclaimed a parking lot into Chicano Park — a landmark of collective environmental action that echoes Chen's (2019) argument that organized community action, not individual recycling, creates change."
  },
  "Imperial": {
    lat: 33.04, lng: -115.36, region: "Imperial Valley",
    population: 179_000, areaSqMi: 4_175,
    pctLatino: 83, pctNonWhite: 89, povertyRate: 23, medianIncome: 44,
    pctUninsured: 18, pctLingIsolated: 24, pctRenters: 40,
    cesScore: 90, avgJulyHigh: 108, heatDays95: 95, unhealthyAirDays: 68,
    wildfireRisk: 12, floodRisk: 12, treeCanopy: 4, pm25: 17.8, seaLevelRisk: 0,
    note: "HIGHEST CalEnviroScreen score in California. 83% Latino, $44K median income, 23% poverty, 108°F average July high, 95 days/year above 95°F. 24% linguistically isolated — Chen's (2019) warning made real: these families may face climate emergencies in a language the warning system doesn't speak. Salton Sea dust (PM2.5 + heavy metals from exposed lakebed) blankets the valley. The single county that most comprehensively illustrates the project thesis."
  },
  "San Joaquin": {
    lat: 37.93, lng: -121.27, region: "Central Valley",
    population: 779_000, areaSqMi: 1_391,
    pctLatino: 41, pctNonWhite: 64, povertyRate: 18, medianIncome: 62,
    pctUninsured: 11, pctLingIsolated: 12, pctRenters: 48,
    cesScore: 74, avgJulyHigh: 98, heatDays95: 28, unhealthyAirDays: 62,
    wildfireRisk: 22, floodRisk: 20, treeCanopy: 18, pm25: 13.5, seaLevelRisk: 0,
    note: "Stockton declared bankruptcy 2012 — services collapsed in Black and Latino neighborhoods. Delta levee failure: simultaneous levee breaks during an earthquake could contaminate drinking water for 25M Californians, disproportionately affecting those without resources to relocate or stockpile."
  },
  "Stanislaus": {
    lat: 37.55, lng: -120.99, region: "Central Valley",
    population: 552_000, areaSqMi: 1_495,
    pctLatino: 47, pctNonWhite: 58, povertyRate: 17, medianIncome: 60,
    pctUninsured: 13, pctLingIsolated: 14, pctRenters: 40,
    cesScore: 70, avgJulyHigh: 98, heatDays95: 30, unhealthyAirDays: 68,
    wildfireRisk: 22, floodRisk: 15, treeCanopy: 16, pm25: 14.2, seaLevelRisk: 0,
    note: "Modesto. Dairy farming capital — methane emissions + nitrate groundwater contamination. Foster (2010), as cited in Baer (2021): 'Soil destruction is occurring due to current agribusiness practices. Nitrogen run-off from the overuse of fertilizer is affecting lakes and rivers.' This is that county."
  },
  "Merced": {
    lat: 37.19, lng: -120.72, region: "Central Valley",
    population: 286_000, areaSqMi: 1_929,
    pctLatino: 57, pctNonWhite: 70, povertyRate: 23, medianIncome: 52,
    pctUninsured: 16, pctLingIsolated: 18, pctRenters: 42,
    cesScore: 78, avgJulyHigh: 100, heatDays95: 38, unhealthyAirDays: 78,
    wildfireRisk: 22, floodRisk: 18, treeCanopy: 14, pm25: 15.0, seaLevelRisk: 0,
    note: "UC Merced (opened 2005) sits in one of California's poorest counties. 18% linguistically isolated. During the 2021 heat dome, Merced County hospitals were overwhelmed — predominantly Latino farmworkers. No federal heat protection law for agricultural workers."
  },
  "Madera": {
    lat: 37.22, lng: -119.76, region: "Central Valley",
    population: 157_000, areaSqMi: 2_137,
    pctLatino: 58, pctNonWhite: 68, povertyRate: 21, medianIncome: 54,
    pctUninsured: 17, pctLingIsolated: 18, pctRenters: 38,
    cesScore: 76, avgJulyHigh: 102, heatDays95: 42, unhealthyAirDays: 82,
    wildfireRisk: 48, floodRisk: 10, treeCanopy: 12, pm25: 15.5, seaLevelRisk: 0,
    note: "58% Latino. Raisin capital — hand-harvested in 100°F+ heat. Children's asthma: 19%. 0.5 physicians per 1,000 residents — one of California's most severe healthcare deserts, bearing its most severe climate health burden."
  },
  "Fresno": {
    lat: 36.75, lng: -119.77, region: "Central Valley",
    population: 1_008_000, areaSqMi: 5_963,
    pctLatino: 55, pctNonWhite: 70, povertyRate: 24, medianIncome: 50,
    pctUninsured: 18, pctLingIsolated: 16, pctRenters: 45,
    cesScore: 82, avgJulyHigh: 104, heatDays95: 48, unhealthyAirDays: 88,
    wildfireRisk: 42, floodRisk: 12, treeCanopy: 10, pm25: 16.5, seaLevelRisk: 0,
    note: "West Fresno (92% Black/Latino): life expectancy 67 years. East Fresno: 80 years. 13-year within-city gap. Children's asthma: 22.6% vs. 8% state average. 0 full-service grocery stores in West Fresno. 2 parks vs. 28 in northwest Fresno. By 2050: 50+ days above 100°F. American Lung Association: Fresno among worst air quality cities in America every year."
  },
  "Kings": {
    lat: 36.07, lng: -119.82, region: "Central Valley",
    population: 152_000, areaSqMi: 1_391,
    pctLatino: 55, pctNonWhite: 67, povertyRate: 22, medianIncome: 52,
    pctUninsured: 18, pctLingIsolated: 16, pctRenters: 38,
    cesScore: 78, avgJulyHigh: 102, heatDays95: 45, unhealthyAirDays: 82,
    wildfireRisk: 30, floodRisk: 12, treeCanopy: 10, pm25: 16.0, seaLevelRisk: 0,
    note: "Kettleman City (97% Latino, pop. 1,500): largest hazardous waste facility west of the Mississippi. 1990s birth defect cluster. The 1987 UCC study Baer (2021) references — 'Toxic Wastes and Race' — found race the single strongest predictor of hazardous waste siting. Kettleman City is that finding made flesh."
  },
  "Tulare": {
    lat: 36.21, lng: -119.07, region: "Central Valley",
    population: 473_000, areaSqMi: 4_824,
    pctLatino: 60, pctNonWhite: 72, povertyRate: 25, medianIncome: 48,
    pctUninsured: 20, pctLingIsolated: 20, pctRenters: 38,
    cesScore: 84, avgJulyHigh: 103, heatDays95: 48, unhealthyAirDays: 92,
    wildfireRisk: 52, floodRisk: 10, treeCanopy: 10, pm25: 17.2, seaLevelRisk: 0,
    note: "WORST air quality county in CA. 60% Latino, 25% poverty, $48K median income. East Porterville: 1,500 domestic wells went dry in the 2012–2017 drought — families without running water for years. 92 unhealthy air days/year — children breathe hazardous air for 3 months annually. 20% linguistically isolated."
  },
  "Kern": {
    lat: 35.34, lng: -118.73, region: "Central Valley",
    population: 909_000, areaSqMi: 8_161,
    pctLatino: 55, pctNonWhite: 68, povertyRate: 22, medianIncome: 54,
    pctUninsured: 17, pctLingIsolated: 15, pctRenters: 40,
    cesScore: 80, avgJulyHigh: 104, heatDays95: 55, unhealthyAirDays: 90,
    wildfireRisk: 45, floodRisk: 8, treeCanopy: 8, pm25: 17.0, seaLevelRisk: 0,
    note: "Bakersfield: oil capital of CA. Active petroleum extraction in residential neighborhoods. 55 days/year above 95°F. Latino farmworkers documented working in AQI 200+ during 2020 wildfire season — no paid sick leave, no legal protection. Baer (2021): the capitalist treadmill of fossil fuel production deposits its externalities here."
  }
};

export const VARIABLE_LABELS: VariableLabel = {
  pctLatino: '% Latino/Hispanic',
  pctNonWhite: '% People of Color',
  povertyRate: 'Poverty Rate (%)',
  medianIncome: 'Median Income ($K)',
  pctUninsured: '% Uninsured',
  pctLingIsolated: '% Linguistically Isolated',
  pctRenters: '% Renters',
  cesScore: 'CalEnviroScreen Score',
  avgJulyHigh: 'Avg July High (°F)',
  heatDays95: 'Days Above 95°F/year',
  unhealthyAirDays: 'Unhealthy Air Days/year',
  wildfireRisk: 'Wildfire Risk Score',
  floodRisk: 'Flood Risk (%)',
  treeCanopy: 'Tree Canopy (%)',
  pm25: 'PM2.5 (μg/m³)',
};

export const SOCIAL_VARIABLES = [
  'pctLatino',
  'pctNonWhite',
  'povertyRate',
  'medianIncome',
  'pctUninsured',
  'pctLingIsolated',
  'pctRenters',
] as const satisfies readonly SocialVariable[];

export const CLIMATE_VARIABLES = [
  'cesScore',
  'avgJulyHigh',
  'heatDays95',
  'unhealthyAirDays',
  'wildfireRisk',
  'floodRisk',
  'treeCanopy',
  'pm25',
] as const satisfies readonly ClimateVariable[];

export const INVERTED_VARIABLES = new Set<string>(['medianIncome', 'treeCanopy']);

export const POPULATION_ESTIMATES: Record<CountyName, number> = Object.fromEntries(
  Object.entries(COUNTY_DATA).map(([county, record]) => [county, record.population]),
) as Record<CountyName, number>;
