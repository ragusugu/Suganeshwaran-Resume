import { useTheme } from './hooks';
import { MotionProvider } from './motion';
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
    // MotionProvider follows the device's reduced-motion setting unless the visitor opts in to animations.
    <MotionProvider>
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
    </MotionProvider>
  );
}
