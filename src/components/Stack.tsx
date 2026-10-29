import { motion } from 'motion/react';
import { stackGroups } from '../content';
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

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:mt-16">
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
