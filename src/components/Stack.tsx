import { motion } from 'motion/react';
import { aiStack, stackGroups } from '../content';
import { SparkleIcon } from './Icons';
import { Chip, EASE, Reveal, SectionHeading, SpotlightCard } from './ui';

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.12 } },
};
const chip = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="stack-title"
          title="Stack"
          lead="Grouped by where each tool sits in a pipeline, from getting data in to getting it in front of people."
        />

        <Reveal className="mt-14 md:mt-16">
          <SpotlightCard className="border-tide/30 bg-tide/5">
            <div className="grid gap-5 p-6 md:p-8 lg:grid-cols-[1fr_1.6fr] lg:items-center">
              <div>
                <h3 className="flex items-center gap-2.5 font-display text-2xl font-semibold tracking-tight">
                  <SparkleIcon className="text-tide-ink" />
                  {aiStack.title}
                </h3>
                <p className="mt-1 text-ink-2">{aiStack.note}</p>
                <a
                  href="#ai"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-tide-ink underline decoration-tide/40 underline-offset-4 transition-colors hover:decoration-tide"
                >
                  See the generator in action
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <ul className="flex flex-wrap gap-2">
                {aiStack.items.map((item) => (
                  <li key={item}>
                    <Chip tone="tide">{item}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((group, index) => (
            <Reveal key={group.title} delay={(index % 3) * 0.08}>
              <SpotlightCard className="h-full">
                <div className="p-6 md:p-7">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{group.title}</h3>
                  <p className="mt-1 text-sm text-ink-2">{group.note}</p>
                  <motion.ul
                    variants={list}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    className="mt-5 flex flex-wrap gap-2"
                  >
                    {group.items.map((item) => (
                      <motion.li key={item} variants={chip}>
                        <Chip>{item}</Chip>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
