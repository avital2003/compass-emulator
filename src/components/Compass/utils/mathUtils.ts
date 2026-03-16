import { TickData } from './types';
import { MAX_HEADING_DEGREES, compassCenter, compassRadii, tickConfig } from './constants';

export const generateTicks = (): TickData[] => {
  return Array.from({ length: MAX_HEADING_DEGREES }).map((_, index) => {
    const isTen = index % 10 === 0;
    const isFive = index % 5 === 0;

    const length = isTen
      ? tickConfig.tenDegLength
      : isFive
      ? tickConfig.fiveDegLength
      : tickConfig.oneDegLength;

    const width = isTen
      ? tickConfig.tenDegWidth
      : isFive
      ? tickConfig.fiveDegWidth
      : tickConfig.oneDegWidth;

    const y1 = compassCenter - compassRadii.whiteRing;
    const y2 = y1 + length;
    const rotation = `rotate(${index} ${compassCenter} ${compassCenter})`;
    const textRotation = `${rotation} rotate(180 ${compassCenter} ${tickConfig.textRadiusOffset})`;
    const label = index.toString().padStart(3, '0');

    return {
      value: index,
      length,
      width,
      hasText: isTen,
      rotation,
      y1,
      y2,
      textY: tickConfig.textRadiusOffset,
      textRotation,
      label,
    };
  });
};
