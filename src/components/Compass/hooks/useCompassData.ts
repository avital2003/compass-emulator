import { useState, useEffect } from "react";
import {
  useMockData,
  UPDATE_INTERVAL_MS,
  FULL_CIRCLE_DEG,
  HALF_CIRCLE_DEG,
  MATH_OFFSET_DEG,
  WS_RECONNECT_DELAY_MS,
  ENABLE_TELEMETRY,
} from "../utils/constants";

export const calculateShortestPathDelta = (
  currentHeading: number,
  targetHeading: number,
): number => {
  const currentNormalized =
    ((currentHeading % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) % FULL_CIRCLE_DEG;
  return (
    ((targetHeading - currentNormalized + MATH_OFFSET_DEG) % FULL_CIRCLE_DEG) -
    HALF_CIRCLE_DEG
  );
};

export interface TelemetryPayload {
  angle: number;
}

export const isTelemetryPayload = (data: any): data is TelemetryPayload => {
  return (
    data !== null &&
    typeof data === "object" &&
    typeof data.angle === "number"
  );
};

declare global {
  interface Window {
    updateCompass?: (targetHeading: number) => void;
    h?: number;
  }
}

export function useCompassData() {
  const [accumulatedHeading, setAccumulatedHeading] = useState<number>(0);

  useEffect(() => {
    const dispatchNewHeading = (targetHeading: number) => {
      setAccumulatedHeading(
        (prev) => prev + calculateShortestPathDelta(prev, targetHeading),
      );
    };

    window.updateCompass = dispatchNewHeading;
    Object.defineProperty(window, "h", {
      set: dispatchNewHeading,
      configurable: true,
    });

    let intervalId: number;
    let socket: WebSocket;
    let reconnectTimeoutId: number;

    if (useMockData) {
      intervalId = window.setInterval(() => {
        setAccumulatedHeading((prev) => prev + 1);
      }, UPDATE_INTERVAL_MS);
    } else if (ENABLE_TELEMETRY) {
      const connectWebSocket = () => {
        socket = new WebSocket("ws://localhost:8080/telemetry");

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (isTelemetryPayload(data)) {
              dispatchNewHeading(data.angle);
            }
          } catch {}
        };

        socket.onclose = () => {
          reconnectTimeoutId = window.setTimeout(
            connectWebSocket,
            WS_RECONNECT_DELAY_MS,
          );
        };

        socket.onerror = () => {
          socket.close();
        };
      };

      connectWebSocket();
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
      if (reconnectTimeoutId) window.clearTimeout(reconnectTimeoutId);
      if (socket) {
        socket.onclose = null;
        socket.onerror = null;
        socket.close();
      }
      delete window.updateCompass;
      delete window.h;
    };
  }, []);

  return { accumulatedHeading };
}