import React from 'react';
import '../styles/Compass.css';

interface NeedleProps {
  heading: number;
}

export const Needle: React.FC<NeedleProps> = ({ heading }) => {
  return (
    <svg 
      viewBox="0 0 300 300" 
      className="compass-static-overlay"
      style={{
        transform: `rotate(${heading}deg)`,
        transformOrigin: '50% 50%',
        transition: 'transform 0.1s linear'
      }}
    >
      <rect
        className="compass-needle"
        x="149"
        y="10"
        width="2"
        height="40"
      />
    </svg>
  );
};
