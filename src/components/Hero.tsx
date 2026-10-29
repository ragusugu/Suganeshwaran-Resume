import { motion, useReducedMotion } from 'motion/react';
import { profile, stats } from '../content';
import { DataStreams } from './Backdrop';
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, SparkleIcon } from './Icons';
import { resumeUrl } from './Nav';
import { PipelineDiagram } from './PipelineDiagram';
import { Counter, EASE, Magnetic, MaskLine, Reveal } from './ui';

const socials = [
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { label: 'GitHub', href: profile.github, Icon: GithubIcon, external: true },
];

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-28"
    >
      <DataStreams />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal y={12} className="flex flex-wrap items-center gap-3">
          <p className="inline-flex items-center gap-3 rounded-full border border-line bg-surface/70 py-1.5 pl-3 pr-4 text-sm text-ink-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-tide/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tide" />
            </span>
            Open to global opportunities
          </p>
          <a
            href="#ai"
            className="group/ai inline-flex items-center gap-2 rounded-full border border-tide/40 bg-tide/10 py-1.5 pl-3 pr-4 text-sm font-medium text-tide-ink transition-colors hover:border-tide hover:bg-tide/15"
          >
            <SparkleIcon size={16} />
            Featured: AI Synthetic Data Generator
            <span aria-hidden="true" className="transition-transform duration-300 group-hover/ai:translate-x-0.5">
              →
            </span>
          </a>
        </Reveal>

        <h1
          id="hero-title"
          className="mt-7 font-display text-[clamp(2rem,9.5vw,6.75rem)] font-extrabold leading-[0.95] tracking-tight"
        >
          <MaskLine trigger="load" delay={0.1}>
            {profile.name}
            <span className="sr-only">, </span>
          </MaskLine>
          <MaskLine trigger="load" delay={0.24} className="text-ink-2">
            Data engineer<span className="sr-only">.</span>
          </MaskLine>
        </h1>

        <motion.span
          aria-hidden="true"
          className="medal-gradient mt-6 block h-1 w-40 origin-left rounded-full"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.75, duration: 1.1, ease: EASE }}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <Reveal delay={0.3}>
              <p className="max-w-2xl text-xl leading-relaxed text-ink md:text-2xl">{profile.lead}</p>
            </Reveal>
            <Reveal delay={0.5} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href={resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-base font-semibold text-bg transition-transform active:scale-95"
                >
                  <DownloadIcon size={18} />
                  Download résumé
                </a>
              </Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center rounded-full border border-line bg-surface/60 px-6 py-3.5 text-base font-semibold backdrop-blur-sm transition-colors hover:border-tide/50 active:scale-95"
              >
                See the projects
              </a>
              <ul className="ml-1 flex items-center gap-2">
                {socials.map(({ label, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-ink-2 transition-[transform,border-color,color] hover:-translate-y-0.5 hover:border-tide/50 hover:text-tide-ink active:scale-95"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.4}>
            <p className="max-w-xl leading-relaxed text-ink-2">{profile.summary}</p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-5 md:mt-12 md:px-8">
        <PipelineDiagram />

        <Reveal className="mt-12">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-surface/80 p-5 backdrop-blur-sm md:p-6">
                <dt className="order-2 mt-1 text-sm leading-snug text-ink-2">{stat.label}</dt>
                <dd className="font-display text-4xl font-bold tabular-nums tracking-tight lg:text-5xl">
                  <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
