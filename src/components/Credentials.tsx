import { certifications, education, profile } from '../content';
import { ArrowUpRightIcon, AwardIcon, CapIcon } from './Icons';
import { Reveal, SectionHeading, SpotlightCard } from './ui';

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading id="credentials-title" title="Credentials" />

        <div className="mt-14 grid gap-12 md:mt-16 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <Reveal className="flex min-h-11 items-center">
              <h3 className="font-display text-2xl font-semibold tracking-tight">Education</h3>
            </Reveal>
            <ul className="mt-6 space-y-4">
              {education.map((item, index) => (
                <li key={item.degree}>
                  <Reveal delay={index * 0.1}>
                    <SpotlightCard>
                      <div className="flex gap-4 p-5 md:p-6">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-tide/30 bg-tide/10 text-tide-ink">
                          <CapIcon />
                        </span>
                        <div>
                          <p className="font-mono text-xs text-ink-2">{item.years}</p>
                          <h4 className="mt-1 font-display text-lg font-semibold leading-snug">{item.degree}</h4>
                          <p className="mt-1 text-ink-2">{item.school}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Reveal className="flex min-h-11 flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold tracking-tight">Certifications and training</h3>
              <a
                href={profile.credentials}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-4 py-2 text-sm font-semibold transition-colors hover:border-tide/50"
              >
                Certificate copies
                <ArrowUpRightIcon size={16} />
                <span className="sr-only"> (opens Google Drive in a new tab)</span>
              </a>
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {certifications.map((cert, index) => (
                <li key={cert.name}>
                  <Reveal delay={(index % 2) * 0.08} className="h-full">
                    <SpotlightCard className="h-full">
                      <div className="flex h-full gap-4 p-5">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/10 text-gold">
                          <AwardIcon size={20} />
                        </span>
                        <div>
                          <h4 className="font-display text-base font-semibold leading-snug">{cert.name}</h4>
                          <p className="mt-1 text-sm text-ink-2">{cert.issuer}</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
