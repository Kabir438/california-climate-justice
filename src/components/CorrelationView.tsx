import type { ClimateVariable, SocialVariable } from '../types';
import { CLIMATE_VARIABLES, SOCIAL_VARIABLES, VARIABLE_LABELS } from '../data/countyData';
import { CorrelationMatrix } from './CorrelationMatrix';
import { ScatterPlot } from './ScatterPlot';

interface CorrelationViewProps {
  climateVar: ClimateVariable;
  onClimateVarChange: (value: ClimateVariable) => void;
  onSocialVarChange: (value: SocialVariable) => void;
  socialVar: SocialVariable;
}

export function CorrelationView({
  climateVar,
  onClimateVarChange,
  onSocialVarChange,
  socialVar,
}: CorrelationViewProps) {
  return (
    <section className="flex h-full flex-col bg-[var(--bg-0)] p-4">
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--bg-1)] p-3">
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
          X
          <select
            className="rounded border border-[var(--border)] bg-[var(--bg-2)] px-3 py-2 text-sm normal-case tracking-normal text-[var(--text-primary)]"
            onChange={(event) => onSocialVarChange(event.target.value as SocialVariable)}
            value={socialVar}
          >
            {SOCIAL_VARIABLES.map((variable) => (
              <option key={variable} value={variable}>{VARIABLE_LABELS[variable]}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Y
          <select
            className="rounded border border-[var(--border)] bg-[var(--bg-2)] px-3 py-2 text-sm normal-case tracking-normal text-[var(--text-primary)]"
            onChange={(event) => onClimateVarChange(event.target.value as ClimateVariable)}
            value={climateVar}
          >
            {CLIMATE_VARIABLES.map((variable) => (
              <option key={variable} value={variable}>{VARIABLE_LABELS[variable]}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid min-h-0 min-w-0 flex-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <div className="min-h-0 min-w-0 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--bg-1)]">
          <ScatterPlot climateVar={climateVar} socialVar={socialVar} />
        </div>
        <CorrelationMatrix
          climateVar={climateVar}
          onSelect={(social, climate) => {
            onSocialVarChange(social);
            onClimateVarChange(climate);
          }}
          socialVar={socialVar}
        />
      </div>
    </section>
  );
}
