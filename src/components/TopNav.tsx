import type { AppMode } from '../types';

interface TopNavProps {
  mode: AppMode;
  onAbout: () => void;
  onModeChange: (mode: AppMode) => void;
  onSources: () => void;
}

const modes: Array<{ label: string; shortLabel: string; subtitle?: string; value: AppMode }> = [
  { label: 'Split Comparison', shortLabel: 'Split', value: 'split' },
  { label: 'Bivariate Diff', shortLabel: 'Diff', value: 'diff' },
  { label: 'Correlation', shortLabel: 'Corr', value: 'correlation' },
  {
    label: 'Rural Hypothesis',
    shortLabel: 'Rural',
    subtitle: 'Why do some poor counties escape climate burden?',
    value: 'density',
  },
];

export function TopNav({ mode, onAbout, onModeChange, onSources }: TopNavProps) {
  return (
    <header className="z-[1200] flex h-16 shrink-0 items-center gap-2 overflow-hidden border-b border-[var(--border)] bg-[rgba(15,15,26,0.96)] px-3 backdrop-blur md:justify-between md:px-6">
      <div className="w-24 shrink-0 md:w-auto">
        <div className="truncate text-base font-bold tracking-wide text-[var(--text-primary)] md:text-xl">
          <span className="md:hidden">Burden Map</span>
          <span className="hidden md:inline">The Geography of Burden</span>
        </div>
        <div className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--text-muted)] md:block">
          California Climate Justice Comparison Map
        </div>
      </div>

      <nav className="flex h-full min-w-0 flex-1 items-center gap-1 self-stretch overflow-x-auto px-1 md:flex-none md:px-2">
        {modes.map(({ label, shortLabel, subtitle, value }) => (
          <button
            className={`flex h-full min-w-fit flex-col items-center justify-center whitespace-nowrap border-b-2 px-2 text-[11px] font-semibold transition md:px-4 md:text-sm lg:px-5 ${
              mode === value
                ? 'border-[var(--accent-critical)] text-[var(--text-primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            key={value}
            onClick={() => onModeChange(value)}
            type="button"
          >
            <span className="md:hidden">{shortLabel}</span>
            <span className="hidden md:inline">{label}</span>
            {subtitle && (
              <span className="mt-0.5 hidden max-w-[220px] truncate text-[8px] font-medium normal-case tracking-normal text-[var(--text-muted)] xl:block">
                {subtitle}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="hidden shrink-0 items-center gap-1 sm:flex md:gap-2">
        <button
          className="rounded border border-[var(--border)] px-2 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-bright)] hover:text-[var(--text-primary)] md:px-3"
          onClick={onAbout}
          type="button"
        >
          About
        </button>
        <button
          className="rounded border border-[var(--border)] px-2 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-bright)] hover:text-[var(--text-primary)] md:px-3"
          onClick={onSources}
          type="button"
        >
          Sources
        </button>
      </div>
    </header>
  );
}
