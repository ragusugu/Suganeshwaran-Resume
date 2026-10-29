import { MotionConfig } from 'motion/react';
import { useTheme } from './hooks';
import { Backdrop } from './components/Backdrop';
import { Contact, Footer } from './components/Contact';
import { Credentials } from './components/Credentials';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Stack } from './components/Stack';
import { SyntheticData } from './components/SyntheticData';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    // reducedMotion="user" turns off transform and layout animations for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-bg"
      >
        Skip to content
      </a>
      <Backdrop />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <SyntheticData />
        <Experience />
        <Projects />
        <Stack />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
