import React from 'react';
import { useCompassData } from './useCompassData';
import { CompassDial } from './CompassDial';
import './Compass.css';

export const Compass: React.FC = () => {
  const { heading } = useCompassData();
  const displayHeading = Math.floor(heading).toString().padStart(3, '0');

  return (
    <div className="compass-wrapper">
      <div className="compass-dial-container">
        
        {/* The Rotating Dial Component (now Static) */}
        <CompassDial />
        
        {/* Rotating Top Indicator Overlay */}
        <svg 
          viewBox="0 0 300 300" 
          className="compass-static-overlay"
          style={{
            transform: `rotate(${heading}deg)`,
            transformOrigin: '50% 50%',
            transition: 'transform 0.1s linear'
          }}
        >
          {/* Static Needle:
              A thin (2px) sharp red line perfectly positioned at 12 o'clock.
              Crosses the entire width of the white ring (from bezel inner edge y=10 to black core edge y=50)
              Without entering the black core itself. */}
          <rect
            x="149"
            y="10"
            width="2"
            height="40"
            fill="#ff0000"
          />
        </svg>

        {/* Static Digital Readout Box */}
        <div className="compass-readout">
          {displayHeading}
        </div>

      </div>
    </div>
  );
};
