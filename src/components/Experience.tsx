import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { job, jobEntries } from '../content';
import { CheckIcon } from './Icons';
import { EASE, Reveal, SectionHeading } from './ui';

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 70%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="experience-title" title="Experience" />
            <Reveal delay={0.1} className="mt-8">
              <div className="rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur-sm md:p-7">
                <p className="font-mono text-xs text-ink-2">{job.period}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight">{job.title}</h3>
                <p className="mt-1 text-lg font-semibold text-tide-ink">{job.company}</p>
                <p className="mt-3 leading-relaxed text-ink-2">{job.tagline}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute bottom-4 left-[15px] top-4 w-px bg-line" />
          <motion.span
            aria-hidden="true"
            className="medal-gradient absolute bottom-4 left-[14px] top-4 w-[3px] origin-top rounded-full"
            style={{ scaleY: reduce ? 1 : fill }}
          />
          {jobEntries.map((entry, index) => (
            <li key={entry.topic} className="relative pb-10 pl-14 last:pb-0">
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0.5 grid h-8 w-8 place-items-center rounded-full border border-tide/50 bg-bg text-tide-ink"
                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ type: 'spring', duration: 0.6, bounce: 0.3, delay: 0.05 }}
              >
                <CheckIcon size={16} />
              </motion.span>
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 + index * 0.02 }}
              >
                <h3 className="font-mono text-xs font-medium text-ink-2">{entry.topic}</h3>
                <p className="mt-2 text-lg leading-relaxed text-ink">{entry.text}</p>
                {entry.link && (
                  <a
                    href={entry.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-tide-ink underline decoration-tide/40 underline-offset-4 transition-colors hover:decoration-tide"
                  >
                    {entry.link.label}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
