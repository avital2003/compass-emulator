import React from 'react';
import '../styles/Compass.css';

interface ReadoutBoxProps {
  heading: number;
}

export const ReadoutBox: React.FC<ReadoutBoxProps> = ({ heading }) => {
  const displayHeading = Math.floor(((heading % 360) + 360) % 360).toString().padStart(3, '0');

  return (
    <div className="compass-readout">
      {displayHeading}
    </div>
  );
};
