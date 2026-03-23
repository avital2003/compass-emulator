import { useState, useEffect } from 'react';
import { useMockData, UPDATE_INTERVAL_MS } from '../utils/constants';

declare global {
  interface Window {
    updateCompass?: (targetHeading: number) => void;
    h?: number;
  }
}

export function useCompassData() {
  const [heading, setHeading] = useState<number>(0);

  useEffect(() => {
    // Phase 1: Shortest Path Calculation
    const handleNewHeading = (targetHeading: number) => {
      setHeading((prevHeading) => {
        // Find current normalized angle in 0-359 space
        const currentNormalized = ((prevHeading % 360) + 360) % 360;
        
        // Calculate shortest path delta
        const delta = ((targetHeading - currentNormalized + 540) % 360) - 180;
        
        // Accumulate smoothly to avoid jumping from 360 to 0
        return prevHeading + delta;
      });
    };

    // Phase 2: Expose global API
    window.updateCompass = handleNewHeading;
    Object.defineProperty(window, 'h', { set: handleNewHeading, configurable: true });

    // Phase 3: Mock Data
    if (useMockData) {
      const interval = setInterval(() => {
        setHeading((prev) => prev + 1);
      }, UPDATE_INTERVAL_MS);

      return () => {
        clearInterval(interval);
        delete window.updateCompass;
        delete window.h;
      };
    } else {
      return () => {
        delete window.updateCompass;
        delete window.h;
      };
    }
  }, []);

  return { heading };
}