import { AnimatePresence, motion } from 'framer-motion';

interface IntroModalProps {
  onClose: () => void;
}

export function IntroModal({ onClose }: IntroModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[3000] flex items-center justify-center bg-[rgba(7,7,13,0.94)] px-6 backdrop-blur-md"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
      >
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[var(--border-bright)] bg-[var(--bg-1)] p-8 shadow-2xl md:p-12"
          initial={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-6xl">
            In California, the climate crisis has a zip code.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">
            This interactive map compares social vulnerability and environmental burden across all 58 California
            counties, showing how race, class, language access, and policy history shape who bears the climate crisis
            first and most intensely.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Split Comparison', 'Place demographic and climate variables side by side to see where burdens overlap.'],
              ['Bivariate Diff', 'Combine vulnerability and burden into a single double-exposure map of compound risk.'],
              ['Correlation', 'Test the thesis directly with scatter plots and a 56-cell correlation matrix.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-md border border-[var(--border)] bg-[var(--bg-2)] p-5">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-xs leading-5 text-[var(--text-muted)]">
              Data: CalEnviroScreen 4.0, US Census ACS, NOAA, CAL FIRE, ALA. Frameworks: Chen (2019), Baer (2021).
            </p>
            <button
              className="rounded-md bg-[var(--accent-critical)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/40 transition hover:brightness-110"
              onClick={onClose}
              type="button"
            >
              Explore the Map →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
