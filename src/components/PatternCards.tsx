const patterns = [
  {
    title: 'The Valley Burden',
    stat: 'r = 0.84',
    body: 'County % Latino and CalEnviroScreen score rise together across the agricultural spine of the state.',
  },
  {
    title: 'The Redlining Heat Spiral',
    stat: 'r = 0.71',
    body: 'HOLC grade and surface temperature track the way historic housing policy becomes present-day heat exposure.',
  },
  {
    title: 'The Healthcare Desert Compound',
    stat: 'Imperial',
    body: '0.4 physicians per 1K, 108°F July highs, 83% Latino, and extreme linguistic isolation in one county.',
  },
  {
    title: 'The Wildfire-Rural Paradox',
    stat: 'Plumas',
    body: '90 fire risk, 8% Latino, and 18% poverty: climate burdens hit poor communities broadly; injustice compounds hazards.',
  },
];

export function PatternCards() {
  return (
    <div className="scrollbar-thin flex min-w-[520px] flex-1 gap-3 overflow-x-auto">
      {patterns.map((pattern) => (
        <article
          className="min-w-[245px] rounded-md border border-[var(--border)] bg-[var(--bg-1)] p-4"
          key={pattern.title}
        >
          <div className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent-high)]">{pattern.stat}</div>
          <h3 className="mt-2 text-base font-semibold text-[var(--text-primary)]">{pattern.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{pattern.body}</p>
        </article>
      ))}
    </div>
  );
}
