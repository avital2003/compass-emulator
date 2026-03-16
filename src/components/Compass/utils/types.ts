export interface TickData {
  value: number;
  length: number;
  width: number;
  hasText: boolean;
  rotation: string;
  y1: number;
  y2: number;
  textY: number;
  textRotation: string;
  label: string;
}

export interface CompassDataHook {
  heading: number;
}
