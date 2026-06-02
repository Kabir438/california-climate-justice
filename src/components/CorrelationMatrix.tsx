import type { ClimateVariable, SocialVariable } from '../types';
import { CLIMATE_VARIABLES, SOCIAL_VARIABLES, VARIABLE_LABELS } from '../data/countyData';
import { getCorrelationColor } from '../utils/colorScales';
import { correlationFor } from '../utils/scoring';

interface CorrelationMatrixProps {
  climateVar: ClimateVariable;
  onSelect: (social: SocialVariable, climate: ClimateVariable) => void;
  socialVar: SocialVariable;
}

export function CorrelationMatrix({ climateVar, onSelect, socialVar }: CorrelationMatrixProps) {
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col rounded-md border border-[var(--border)] bg-[var(--bg-1)]">
      <div className="border-b border-[var(--border)] p-4">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Correlation matrix</h2>
        <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
          Click a cell to update the scatter plot. Dark red indicates a strong positive relationship.
        </p>
      </div>

      <div className="scrollbar-thin min-h-0 flex-1 overflow-auto p-4">
        <div
          className="grid min-w-[540px] gap-1"
          style={{ gridTemplateColumns: `150px repeat(${CLIMATE_VARIABLES.length}, 42px)` }}
        >
          <div />
          {CLIMATE_VARIABLES.map((climate) => (
            <div
              className="h-24 -rotate-45 origin-bottom-left text-[10px] leading-3 text-[var(--text-muted)]"
              key={climate}
            >
              {VARIABLE_LABELS[climate]}
            </div>
          ))}

          {SOCIAL_VARIABLES.map((social) => (
            <div className="contents" key={social}>
              <div className="flex h-10 items-center pr-2 text-xs text-[var(--text-secondary)]">
                {VARIABLE_LABELS[social]}
              </div>
              {CLIMATE_VARIABLES.map((climate) => {
                const r = correlationFor(social, climate);
                const active = social === socialVar && climate === climateVar;
                return (
                  <button
                    className={`mono h-10 w-10 rounded border text-[10px] font-semibold transition hover:scale-105 ${
                      active ? 'border-white ring-2 ring-[var(--accent-critical)]' : 'border-[rgba(255,255,255,0.16)]'
                    }`}
                    key={`${social}-${climate}`}
                    onClick={() => onSelect(social, climate)}
                    style={{ background: getCorrelationColor(r), color: Math.abs(r) > 0.45 ? '#ffffff' : '#101018' }}
                    title={`r = ${r.toFixed(2)} between ${VARIABLE_LABELS[social]} and ${VARIABLE_LABELS[climate]}`}
                    type="button"
                  >
                    {r.toFixed(2)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
