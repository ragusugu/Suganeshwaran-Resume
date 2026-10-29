import { motion } from 'motion/react';
import { certificationGroups, education, profile, type CertificationGroup } from '../content';
import { ArrowUpRightIcon, CapIcon } from './Icons';
import { Chip, EASE, Reveal, SectionHeading, SpotlightCard } from './ui';

const total = certificationGroups.reduce((sum, group) => sum + group.items.length, 0);

// Desktop shows two columns with a similar number of rows each. Phones show the groups in their natural order,
// so each column wrapper uses `display: contents` there and every group carries an explicit `order`.
const columns: number[][] = [
  [0, 3],
  [1, 2],
];
const orderClass = ['order-1', 'order-2', 'order-3', 'order-4'];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const row = {
  hidden: { opacity: 0, x: 14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
};

function Group({ group }: { group: CertificationGroup }) {
  return (
    <SpotlightCard>
      <div className="p-5 md:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="font-display text-xl font-semibold tracking-tight">{group.title}</h4>
          <span className="font-mono text-xs text-ink-2">{group.items.length}</span>
        </div>
        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          className="mt-4 divide-y divide-line"
        >
          {group.items.map((cert) => (
            <motion.li key={cert.name} variants={row}>
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/row -mx-3 flex items-start justify-between gap-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-tide/10"
              >
                <span className="min-w-0">
                  <span className="block font-medium leading-snug">{cert.name}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-ink-2">{cert.issuer}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 pt-0.5 text-ink-2">
                  {cert.date && <span className="font-mono text-xs">{cert.date}</span>}
                  <ArrowUpRightIcon
                    size={16}
                    className="transition-transform duration-300 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-tide-ink"
                  />
                </span>
                <span className="sr-only"> (opens the certificate on Google Drive in a new tab)</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </SpotlightCard>
  );
}

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading id="credentials-title" title="Credentials" />

        <div className="mt-14 md:mt-16">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold tracking-tight">Education</h3>
          </Reveal>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {education.map((item, index) => (
              <li key={item.degree}>
                <Reveal delay={index * 0.1} className="h-full">
                  <SpotlightCard className="h-full">
                    <div className="flex h-full gap-4 p-5 md:p-6">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-tide/30 bg-tide/10 text-tide-ink">
                        <CapIcon />
                      </span>
                      <div>
                        <p className="font-mono text-xs text-ink-2">{item.years}</p>
                        <h4 className="mt-1 font-display text-lg font-semibold leading-snug">{item.degree}</h4>
                        <p className="mt-1 text-ink-2">{item.school}</p>
                        {item.note && (
                          <div className="mt-3">
                            <Chip tone="tide">{item.note}</Chip>
                          </div>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 md:mt-20">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">Certifications and training</h3>
              <p className="mt-2 text-ink-2">
                {total} certificates, newest first. Each one opens the original document.
              </p>
            </div>
            <a
              href={profile.credentials}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-tide/50"
            >
              Open the full folder
              <ArrowUpRightIcon size={16} />
              <span className="sr-only"> (opens Google Drive in a new tab)</span>
            </a>
          </Reveal>

          <div className="mt-8 grid items-start gap-5 lg:grid-cols-2">
            {columns.map((indexes, column) => (
              <div key={column} className="contents lg:flex lg:flex-col lg:gap-5">
                {indexes.map((i) => (
                  <Reveal key={certificationGroups[i].title} delay={0.05} className={orderClass[i]}>
                    <Group group={certificationGroups[i]} />
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
