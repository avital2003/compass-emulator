import { useState, useEffect } from 'react';
import { useMockData, UPDATE_INTERVAL_MS, MAX_HEADING_DEGREES } from '../utils/constants';

export function useCompassData() {
  const [heading, setHeading] = useState<number>(0);

  useEffect(() => {
    if (useMockData) {
      const interval = setInterval(() => {
        setHeading((prev) => (prev + 1));
      }, UPDATE_INTERVAL_MS);

      return () => clearInterval(interval);
    } else {
      // Real protocol implementation placeholder
    }
  }, []);

  return { heading };
}
