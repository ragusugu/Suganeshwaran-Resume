import { MotionConfig } from 'motion/react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

interface MotionState {
  /** The device or browser asks for reduced motion. */
  systemReduced: boolean;
  /** The visitor chose to see the animations anyway. */
  optedIn: boolean;
  /** Animations are off right now: the device asks for less motion and the visitor has not opted in. */
  reduced: boolean;
  setOptedIn: (value: boolean) => void;
}

const MotionContext = createContext<MotionState>({
  systemReduced: false,
  optedIn: false,
  reduced: false,
  setOptedIn: () => {},
});

function readOptIn(): boolean {
  try {
    return localStorage.getItem('motion') === 'on';
  } catch {
    return false;
  }
}

/**
 * Animations follow the device's reduced-motion setting by default. A visitor with that setting on can still
 * switch them on for this site (the choice is remembered), so nobody has to change system settings to see it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [systemReduced, setSystemReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );
  const [optedIn, setOptedInState] = useState(readOptIn);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => setSystemReduced(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setOptedIn = useCallback((value: boolean) => {
    setOptedInState(value);
    try {
      if (value) localStorage.setItem('motion', 'on');
      else localStorage.removeItem('motion');
    } catch {
      /* storage unavailable: the choice lasts for this visit */
    }
  }, []);

  // The CSS reduced-motion rules switch themselves off when this attribute is set (see index.css).
  useEffect(() => {
    if (optedIn) document.documentElement.dataset.motion = 'full';
    else delete document.documentElement.dataset.motion;
  }, [optedIn]);

  const reduced = systemReduced && !optedIn;
  const value = useMemo(
    () => ({ systemReduced, optedIn, reduced, setOptedIn }),
    [systemReduced, optedIn, reduced, setOptedIn],
  );

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotion(): MotionState {
  return useContext(MotionContext);
}

/** True when animations should be off. Use this instead of reading the device setting directly. */
export function useReducedMotion(): boolean {
  return useContext(MotionContext).reduced;
}
