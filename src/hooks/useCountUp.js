import { useEffect, useRef, useState } from "react";

// Animates a number counting up from 0 to `target` once `start` becomes true.
export function useCountUp(target, start, suffix = "") {
  const [value, setValue] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!start || done.current) return;
    done.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf;
    let startTime = null;
    const step = (ts) => {
      startTime = startTime ?? ts;
      const progress = Math.min(1, (ts - startTime) / 1100);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);

  return value + suffix;
}
