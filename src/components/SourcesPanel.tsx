import { motion } from 'framer-motion';

interface SourcesPanelProps {
  onClose: () => void;
}

const sources = [
  'Chen, Michelle. 2019. Course reading on environmental justice, language access, and organized community action.',
  'Baer, Hans A. 2021. Course reading on climate justice, ecological modernization, and the capitalist treadmill of production.',
  'California Office of Environmental Health Hazard Assessment. CalEnviroScreen 4.0.',
  'United States Census Bureau. American Community Survey county demographic and socioeconomic estimates.',
  'NOAA climate normals and extreme heat indicators.',
  'CAL FIRE wildfire hazard and historical fire context.',
  'American Lung Association air quality rankings and unhealthy air day context.',
  'EPA EJScreen 2022 environmental justice screening references.',
  'Hoffman, Jeremy S., Shandas, Vivek, and Pendleton, Nicholas. 2020. Climate study on formerly redlined neighborhoods and surface temperature.',
  'County-level dataset curated for this academic visualization from the prompt-provided artifact values.',
];

export function SourcesPanel({ onClose }: SourcesPanelProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[2600] flex items-center justify-center bg-[rgba(7,7,13,0.86)] p-6 backdrop-blur"
      initial={{ opacity: 0 }}
    >
      <motion.section
        animate={{ y: 0, opacity: 1 }}
        className="scrollbar-thin max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-[var(--border-bright)] bg-[var(--bg-1)] p-7 shadow-2xl"
        initial={{ y: 18, opacity: 0 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">Sources</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Primary theoretical frameworks first.</p>
          </div>
          <button
            className="rounded border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-white"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <ol className="mono mt-7 space-y-4 text-sm leading-7 text-[var(--text-secondary)]">
          {sources.map((source, index) => (
            <li className="rounded border border-[var(--border)] bg-[var(--bg-2)] p-4" key={source}>
              <span className="text-[var(--text-muted)]">{String(index + 1).padStart(2, '0')}.</span> {source}
            </li>
          ))}
        </ol>
      </motion.section>
    </motion.div>
  );
}
