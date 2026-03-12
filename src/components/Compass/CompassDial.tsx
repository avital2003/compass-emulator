import React from 'react';

export const CompassDial: React.FC = () => {
  // Using a perfect 0 0 300 300 viewBox for crisp circular geometry
  const center = 150;
  
  // Radii
  const bezelRadius = 145;      // The heavy black outer border
  const whiteRingRadius = 140;  // The wide white track
  const blackCoreRadius = 100;  // The inner black center
  
  const renderTicksAndNumbers = () => {
    const elements = [];
    
    for (let i = 0; i < 360; i++) {
      const isTen = i % 10 === 0;
      const isFive = i % 5 === 0;
      
      // Ticks drawn from the outermost edge of the white ring (whiteRingRadius), pointing inwards
      // Ticks should go from y = 10 (150 - 140) and go downwards.
      const tickLength = isTen ? 12 : isFive ? 7 : 4;
      const tickWidth = isTen ? 3 : isFive ? 1 : 0.5;
      
      const rotation = `rotate(${i} ${center} ${center})`;
      
      elements.push(
        <line
          key={`tick-${i}`}
          x1={center}
          y1={center - whiteRingRadius}
          x2={center}
          y2={center - whiteRingRadius + tickLength}
          stroke="black"
          strokeWidth={tickWidth}
          transform={rotation}
        />
      );
      
      if (isTen) {
        // Ticks end at y=22. The black core starts at y=50.
        // We place the text comfortably in the middle of this white ring space.
        const textY = 35;
        let textStr = i.toString().padStart(3, '0');
        
        elements.push(
          <text
            key={`text-${i}`}
            x={center}
            y={textY}
            fill="black"
            fontSize="10"
            fontWeight="lighter"
            fontFamily="Arial, Helvetica, sans-serif"
            textAnchor="middle"
            alignmentBaseline="middle"
            // Rotate 180 degrees locally so the bottom of the number faces the outer edge
            transform={`rotate(${i} ${center} ${center}) rotate(180 ${center} ${textY})`}
          >
            {textStr}
          </text>
        );
      }
    }
    return elements;
  };

  return (
    <svg 
      width="100%"
      height="100%"
      viewBox="0 0 300 300" 
      className="compass-dial-svg"
    >
      <g>
        {/* Outer Bezel: Heavy rugged black border */}
        <circle 
          cx={center} cy={center} 
          r={bezelRadius} 
          fill="none" 
          stroke="black" 
          strokeWidth="10" 
        />
        
        {/* Outer Ring: Solid white ring for ticks and numbers */}
        <circle 
          cx={center} cy={center} 
          r={whiteRingRadius} 
          fill="#ffffff" 
        />
        
        {/* Inner Core: Solid pure black circle */}
        <circle cx={center} cy={center} r={blackCoreRadius} fill="#111111" />
        
        {/* Elements on the white ring */}
        {renderTicksAndNumbers()}
        
        {/* Crosshair: Thin grey horizontal/vertical lines crossing the black core */}
        <line x1={center - blackCoreRadius} y1={center} x2={center + blackCoreRadius} y2={center} stroke="#555555" strokeWidth="0.5" />
        <line x1={center} y1={center - blackCoreRadius} x2={center} y2={center + blackCoreRadius} stroke="#555555" strokeWidth="0.5" />
      </g>
    </svg>
  );
};
