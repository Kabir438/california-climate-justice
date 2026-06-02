import { motion } from 'framer-motion';

interface AboutPanelProps {
  onClose: () => void;
}

export function AboutPanel({ onClose }: AboutPanelProps) {
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
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">The Theory Behind the Map</h2>
          <button
            className="rounded border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-white"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="mt-7 space-y-6">
          <section className="rounded-md border border-[var(--border)] bg-[var(--bg-2)] p-5">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Chen (2019): information access is justice</h3>
            <blockquote className="mt-3 border-l-2 border-[var(--accent-critical)] pl-4 text-sm leading-7 text-[var(--text-secondary)]">
              "It feels really unjust, that just because you don't speak English fluently... it doesn't mean you
              shouldn't know this information."
            </blockquote>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              The map treats linguistic isolation as a climate vulnerability because warnings, evacuation orders, air
              quality alerts, and public hearings are only protective when communities can access them.
            </p>
          </section>

          <section className="rounded-md border border-[var(--border)] bg-[var(--bg-2)] p-5">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Baer (2021): the treadmill of production</h3>
            <blockquote className="mt-3 border-l-2 border-[var(--accent-critical)] pl-4 text-sm leading-7 text-[var(--text-secondary)]">
              "The capitalist drive for profit making results in a perpetual treadmill of production and consumption
              heavily reliant on fossil fuels."
            </blockquote>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              The bivariate map spatializes that treadmill: logistics corridors, refineries, industrial agriculture, and
              housing inequality appear as overlapping climate and health burdens.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Why This Medium</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
              An interactive digital map enables systems thinking through exploration. Instead of reading a list of
              disconnected examples, viewers can directly see overlapping burdens and then test relationships through
              live correlation views.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Audience</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
              This artifact is designed for college students and young adults who understand that climate change is
              serious, but have not yet connected it to race, class, language access, and structural policy.
            </p>
          </section>
        </div>
      </motion.section>
    </motion.div>
  );
}
