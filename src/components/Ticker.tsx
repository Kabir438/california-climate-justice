const facts = [
  "72% of CA's most climate-burdened census tracts are communities of color — CalEPA 2021",
  'Pearson r = 0.84 between county % Latino and CalEnviroScreen score across all 58 CA counties',
  'Latino ag workers are 20× more likely to die from heat than other CA workers — CA Dept. of Industrial Relations',
  'West Fresno life expectancy: 67 years. East Fresno: 80 years. Same city.',
  '"It feels really unjust, that just because you don\'t speak English fluently... it doesn\'t mean you shouldn\'t know this information." — Andrea Chu, CAAEJ (Chen, 2019)',
  "Formerly redlined neighborhoods are on avg 2.6°C (4.7°F) hotter than 'A'-grade neighborhoods — Hoffman et al., Climate 2020",
  'Imperial County: 83% Latino, 108°F avg July high, 95 heat days/year, 23% poverty, 24% linguistically isolated',
  '"The capitalist drive for profit making results in a perpetual treadmill of production and consumption heavily reliant on fossil fuels." — Baer (2021)',
  'The 2012 Chevron Richmond explosion sent 15,000 residents to the ER — cited in Chen (2019)',
  '300+ Superfund sites in CA; 80% within 1 mile of low-income or minority community — EPA EJScreen 2022',
];

export function Ticker() {
  const line = facts.join(' · ');

  return (
    <div className="relative z-[1200] h-8 shrink-0 overflow-hidden border-t border-[var(--border)] bg-[var(--bg-1)] text-xs text-[var(--text-secondary)]">
      <div className="ticker-track mono flex h-full w-max items-center whitespace-nowrap">
        <span className="px-6">{line}</span>
        <span className="px-6" aria-hidden="true">{line}</span>
      </div>
    </div>
  );
}
