import React from "react";
import "../styles/Compass.css";
import { FULL_CIRCLE_DEG } from "../utils/constants";

interface ReadoutBoxProps {
  accumulatedHeading: number;
}

export const ReadoutBox: React.FC<ReadoutBoxProps> = ({
  accumulatedHeading,
}) => {
  const displayHeading = Math.floor(
    ((accumulatedHeading % FULL_CIRCLE_DEG) + FULL_CIRCLE_DEG) %
      FULL_CIRCLE_DEG,
  )
    .toString()
    .padStart(3, "0");

  return <div className="compass-readout">{displayHeading}</div>;
};
