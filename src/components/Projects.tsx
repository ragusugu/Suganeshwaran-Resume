import { projects } from '../content';
import { ProjectArt } from './ProjectArt';
import { Chip, Reveal, SectionHeading, SpotlightCard } from './ui';

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="projects-title"
          title="Projects"
          lead="Three things I built end to end, from raw data to something people can use."
        />

        <div className="mt-14 flex flex-col gap-8 md:mt-16">
          {projects.map((project, index) => (
            <Reveal key={project.id}>
              <SpotlightCard>
                <article
                  aria-labelledby={`project-${project.id}`}
                  className="grid gap-8 p-6 md:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14"
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <h3
                      id={`project-${project.id}`}
                      className="font-display text-3xl font-bold tracking-tight md:text-4xl"
                    >
                      {project.title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-ink">{project.outcome}</p>
                    <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <li key={item}>
                          <Chip tone="tide">{item}</Chip>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 space-y-3.5">
                      {project.points.map((point) => (
                        <li key={point} className="flex gap-3.5 leading-relaxed text-ink-2">
                          <span
                            aria-hidden="true"
                            className="medal-gradient mt-2.5 h-0.5 w-3.5 shrink-0 rounded-full"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    aria-hidden="true"
                    className={`relative overflow-hidden rounded-2xl border border-line bg-bg/60 p-4 ${
                      index % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                  >
                    <div className="blueprint absolute inset-0 opacity-50" />
                    <div className="relative">
                      <ProjectArt id={project.id} />
                    </div>
                  </div>
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
