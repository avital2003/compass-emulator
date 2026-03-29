import React from "react";
import "../styles/Compass.css";
import { COMPASS_TRANSITION_DURATION_SEC } from "../utils/constants";

interface NeedleProps {
  accumulatedHeading: number;
}

export const Needle: React.FC<NeedleProps> = ({ accumulatedHeading }) => {
  return (
    <svg
      viewBox="0 0 300 300"
      className="compass-static-overlay"
      style={{
        transform: `rotate(${accumulatedHeading}deg)`,
        transition: `transform ${COMPASS_TRANSITION_DURATION_SEC}s cubic-bezier(0.25, 1, 0.5, 1)`,
      }}
    >
      <rect className="compass-needle" x="149" y="10" width="2" height="40" />
    </svg>
  );
};
