import { useEffect, useRef } from 'react';

export function useRenderTiming(label: string) {
  const startRef = useRef(performance.now()); // capture time when component starts rendering

  useEffect(() => {
    const now = performance.now(); // capture time after component has committed to the screen
    const duration = now - startRef.current;
    console.log(`⏱️ [${label}] rendered in ${duration.toFixed(2)} ms`);
  }, []);
}
