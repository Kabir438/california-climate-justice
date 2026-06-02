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
          <h2 className="text-3xl font-bold text-[var(--text-primary)]">About This Artifact</h2>
          <button
            className="rounded border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-white"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="mt-7 space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Definitions</h3>
            <dl className="mt-3 grid gap-3 text-sm leading-7 text-[var(--text-secondary)]">
              <div className="rounded-md border border-[var(--border)] bg-[var(--bg-2)] p-4">
                <dt className="font-semibold text-[var(--text-primary)]">Particulate Matter</dt>
                <dd className="mt-1">2.5 microns or smaller in diameter.</dd>
              </div>
              <div className="rounded-md border border-[var(--border)] bg-[var(--bg-2)] p-4">
                <dt className="font-semibold text-[var(--text-primary)]">Linguistically Isolated Household</dt>
                <dd className="mt-1">A household where no one over the age of 14 speaks English very well.</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-md border border-[var(--border)] bg-[var(--bg-2)] p-5">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Chen</h3>
            <blockquote className="mt-3 border-l-2 border-[var(--accent-critical)] pl-4 text-sm leading-7 text-[var(--text-secondary)]">
              Take Imperial County: 24 per cent of households there are linguistically isolated. It also has the
              state’s highest pollution burden score and 95 days a year in excess of 95 degrees.
            </blockquote>
          </section>

          <section className="rounded-md border border-[var(--border)] bg-[var(--bg-2)] p-5">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Baer</h3>
            <blockquote className="mt-3 border-l-2 border-[var(--accent-critical)] pl-4 text-sm leading-7 text-[var(--text-secondary)]">
              Inland Empire, where diesel trucks run over a million trips a week in counties that are 50 to 55 per
              cent Latino, I was seeing that treadmill laid out geographically. The r = 0.68 correlation between percent
              Latino and the CalEnviroScreen. This supports Baer’s argument that under capitalism, the costs of
              production get deposited onto the communities with the least power to refuse them.
            </blockquote>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Why This Medium</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
              An interactive map lets the audience discover the pattern themselves - which is more convincing than
              being told what to think.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Audience</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--text-secondary)]">
              <li>The artifact is aimed at college students and young adults of my own age.</li>
              <li>
                I put it together for people who know the gravity of climate change but have not necessarily made the
                link to housing, labor, race or political power.
              </li>
            </ul>
          </section>
        </div>
      </motion.section>
    </motion.div>
  );
}
