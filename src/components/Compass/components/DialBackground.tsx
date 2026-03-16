import React from 'react';
import { compassCenter, compassRadii } from '../utils/constants';
import '../styles/Compass.css';

export const DialBackground: React.FC = () => {
  return (
    <>
      <circle
        className="compass-bezel"
        cx={compassCenter}
        cy={compassCenter}
        r={compassRadii.bezel}
      />
      <circle
        className="compass-white-ring"
        cx={compassCenter}
        cy={compassCenter}
        r={compassRadii.whiteRing}
      />
      <circle
        className="compass-black-core"
        cx={compassCenter}
        cy={compassCenter}
        r={compassRadii.blackCore}
      />

      <line
        className="compass-crosshair"
        x1={compassCenter - compassRadii.blackCore}
        y1={compassCenter}
        x2={compassCenter + compassRadii.blackCore}
        y2={compassCenter}
      />
      <line
        className="compass-crosshair"
        x1={compassCenter}
        y1={compassCenter - compassRadii.blackCore}
        x2={compassCenter}
        y2={compassCenter + compassRadii.blackCore}
      />
    </>
  );
};
