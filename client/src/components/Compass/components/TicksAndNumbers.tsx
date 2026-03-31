import React from "react";
import { generateTicks } from "../utils/mathUtils";
import { compassCenter } from "../utils/constants";
import "../styles/Compass.css";

export const TicksAndNumbers: React.FC = React.memo(() => {
  const ticks = generateTicks();

  return (
    <>
      {ticks.map((tick) => (
        <g key={`tick-group-${tick.value}`}>
          <line
            className="compass-tick"
            x1={compassCenter}
            y1={tick.y1}
            x2={compassCenter}
            y2={tick.y2}
            strokeWidth={tick.width}
            transform={tick.rotation}
          />
          {tick.hasText && (
            <text
              className="compass-tick-text"
              x={compassCenter}
              y={tick.textY}
              transform={tick.textRotation}
            >
              {tick.label}
            </text>
          )}
        </g>
      ))}
    </>
  );
});
