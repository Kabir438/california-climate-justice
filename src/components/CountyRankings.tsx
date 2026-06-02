import type { CountyName } from '../types';
import { sortedBurdenRankings, variableValueLabel } from '../utils/scoring';

interface CountyRankingsProps {
  onCountySelect: (county: CountyName) => void;
}

export function CountyRankings({ onCountySelect }: CountyRankingsProps) {
  const rankings = sortedBurdenRankings();

  return (
    <div className="min-w-[520px] flex-1 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--bg-1)]">
      <div className="border-b border-[var(--border)] px-4 py-3">
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">County rankings</h2>
        <p className="text-xs text-[var(--text-muted)]">Sorted by combined social vulnerability and climate burden.</p>
      </div>
      <div className="scrollbar-thin max-h-[218px] overflow-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="sticky top-0 bg-[var(--bg-2)] text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <tr>
              <th className="px-3 py-2">Rank</th>
              <th className="px-3 py-2">County</th>
              <th className="px-3 py-2">Region</th>
              <th className="px-3 py-2 text-right">Social</th>
              <th className="px-3 py-2 text-right">Climate</th>
              <th className="px-3 py-2 text-right">Combined</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((row, index) => (
              <tr
                className={`cursor-pointer border-t border-[var(--border)] transition hover:bg-[rgba(255,255,255,0.06)] ${
                  index < 5 ? 'bg-[rgba(230,57,70,0.12)] shadow-[inset_3px_0_0_var(--accent-critical)]' : ''
                }`}
                key={row.county}
                onClick={() => onCountySelect(row.county)}
              >
                <td className="mono px-3 py-2 text-[var(--text-muted)]">{index + 1}</td>
                <td className="px-3 py-2 font-semibold text-[var(--text-primary)]">{row.county}</td>
                <td className="px-3 py-2 text-[var(--text-secondary)]">{row.record.region}</td>
                <td className="mono px-3 py-2 text-right">{variableValueLabel('cesScore', row.socialScore)}</td>
                <td className="mono px-3 py-2 text-right">{variableValueLabel('cesScore', row.climateScore)}</td>
                <td className="mono px-3 py-2 text-right font-semibold text-[var(--accent-critical)]">
                  {variableValueLabel('cesScore', row.combinedScore)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
