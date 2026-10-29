import { useMotion } from '../motion';

/** Shown only to visitors whose device asks for reduced motion: explains why the page is still and offers a switch. */
export function MotionNotice() {
  const { systemReduced, optedIn, setOptedIn } = useMotion();
  if (!systemReduced) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-line bg-surface/80 px-4 py-2.5 text-sm text-ink-2 backdrop-blur-sm sm:inline-flex">
      <span>{optedIn ? 'Animations are on.' : 'Animations are off because your device asks for reduced motion.'}</span>
      <button
        type="button"
        onClick={() => setOptedIn(!optedIn)}
        className="font-semibold text-tide-ink underline decoration-tide/40 underline-offset-4 transition-colors hover:decoration-tide"
      >
        {optedIn ? 'Turn off' : 'Turn on animations'}
      </button>
    </div>
  );
}
