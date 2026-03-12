import { useState, useEffect } from 'react';

// Toggle this flat to switch between Mock and Real protocol
const USE_MOCK = true;

/**
 * Isolated data layer hook for Compass heading data.
 * Supplies dynamic heading [0-359].
 */
export function useCompassData() {
  const [heading, setHeading] = useState<number>(0);

  useEffect(() => {
    if (USE_MOCK) {
      // ------------------------------------------------------------------
      // MOCK MODE: Simple deterministic rotation simulating aircraft turn
      // ------------------------------------------------------------------
      const interval = setInterval(() => {
        setHeading((prev) => (prev + 1) % 360);
      }, 100);

      // Clean up on component unmount
      return () => clearInterval(interval);

    } else {
      // ------------------------------------------------------------------
      // REAL PROTOCOL MOCK-UP: Placeholder for WebSocket / API
      // ------------------------------------------------------------------
      // Example implementation pattern:
      /*
      const socket = new WebSocket('wss://aircraft-telemetry.local/data');
      
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (typeof data.heading === 'number' && !isNaN(data.heading)) {
            // Ensure bounds between 0 and 359
            const safeHeading = Math.abs(data.heading) % 360;
            setHeading(safeHeading);
          } else {
            console.error("Invalid heading format received from protocol", data.heading);
          }
        } catch (error) {
          console.error("Error parsing compass telemetry:", error);
        }
      };

      return () => socket.close();
      */
    }
  }, []);

  return { heading };
}
