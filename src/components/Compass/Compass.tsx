import React from "react";
import { useCompassData } from "./hooks/useCompassData";
import { DialBackground } from "./components/DialBackground";
import { TicksAndNumbers } from "./components/TicksAndNumbers";
import { Needle } from "./components/Needle";
import { ReadoutBox } from "./components/ReadoutBox";
import "./styles/Compass.css";

export const Compass: React.FC = () => {
  const { accumulatedHeading } = useCompassData();

  return (
    <div className="compass-wrapper">
      <div className="compass-dial-container">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 300"
          className="compass-dial-svg"
        >
          <g>
            <DialBackground />
            <TicksAndNumbers />
          </g>
        </svg>

        <Needle accumulatedHeading={accumulatedHeading} />
        <ReadoutBox accumulatedHeading={accumulatedHeading} />
      </div>
    </div>
  );
};
