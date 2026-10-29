import { useEffect, useRef, useState } from 'react';
import { profile } from '../content';
import { CheckIcon, CopyIcon, DownloadIcon, GithubIcon, LinkedinIcon, PhoneIcon } from './Icons';
import { resumeUrl } from './Nav';
import { Magnetic, MaskLine, Reveal } from './ui';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable; the address is still a normal link */
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2
          id="contact-title"
          className="max-w-5xl font-display text-[clamp(2.1rem,6.6vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight"
        >
          <MaskLine>Let&rsquo;s build something</MaskLine>
          <MaskLine delay={0.1}>reliable together.</MaskLine>
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            Seeking high-impact data engineering roles worldwide.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
          <a
            href={`mailto:${profile.email}`}
            className="font-display text-[clamp(1.35rem,4.4vw,3rem)] font-semibold tracking-tight underline decoration-tide/40 decoration-2 underline-offset-[10px] transition-colors hover:decoration-tide"
          >
            {profile.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-label="Copy email address"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface/60 px-4 text-sm font-semibold transition-colors hover:border-tide/50 active:scale-95"
          >
            {copied ? <CheckIcon size={16} className="text-tide-ink" /> : <CopyIcon size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </Reveal>

        <Reveal delay={0.28} className="mt-10 flex flex-wrap items-center gap-3">
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
          {[
            { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon, external: true },
            { label: 'GitHub', href: profile.github, Icon: GithubIcon, external: true },
            { label: profile.phone, href: profile.phoneHref, Icon: PhoneIcon, external: false },
          ].map(({ label, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-3.5 text-base font-semibold backdrop-blur-sm transition-[transform,border-color] hover:-translate-y-0.5 hover:border-tide/50 active:scale-95"
            >
              <Icon size={18} />
              {label}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-ink-2 md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location} · Languages: {profile.languages.join(', ')}
        </p>
        <a
          href="#top"
          className="inline-flex w-fit items-center gap-1.5 font-medium text-ink transition-colors hover:text-tide-ink"
        >
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
