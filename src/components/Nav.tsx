import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { navItems, profile } from '../content';
import { useActiveSection, type Theme } from '../hooks';
import { CloseIcon, DownloadIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';
import { EASE } from './ui';

export const resumeUrl = `${import.meta.env.BASE_URL}${profile.resume}`;
const sectionIds = navItems.map((item) => item.id);

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 text-ink-2 transition-colors hover:text-ink active:scale-95"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="grid place-items-center"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Nav({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <a href="#top" aria-label={`${profile.name}, back to top`} className="group flex items-center gap-3">
            <span aria-hidden="true" className="flex h-6 items-end gap-[3px]">
              <span className="h-2.5 w-[5px] rounded-sm bg-bronze transition-[height] duration-300 group-hover:h-3.5" />
              <span className="h-4 w-[5px] rounded-sm bg-silver transition-[height] duration-300 group-hover:h-5" />
              <span className="h-6 w-[5px] rounded-sm bg-gold transition-[height] duration-300 group-hover:h-[1.65rem]" />
            </span>
            <span className="whitespace-nowrap font-display text-lg font-semibold tracking-tight">{profile.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative block px-3 py-2 text-sm font-medium transition-colors ${
                      active === item.id ? 'text-ink' : 'text-ink-2 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="medal-gradient absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                        transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              href={resumeUrl}
              download
              className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-bg transition-transform hover:scale-[1.03] active:scale-95 md:inline-flex"
            >
              <DownloadIcon size={16} />
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/60 lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          className="medal-gradient absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{ scaleX: progress }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overscroll-contain bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-5 pb-10 pt-8">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.06, duration: 0.5, ease: EASE }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-line py-4 font-display text-3xl font-semibold tracking-tight"
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-lg text-ink-2">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={resumeUrl}
                download
                className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-base font-semibold text-bg"
              >
                <DownloadIcon size={18} />
                Download résumé
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
