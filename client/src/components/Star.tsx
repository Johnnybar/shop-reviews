import React from "react";
import full from "../assets/star-full.png";
import empty from "../assets/star-empty.png";

interface StarProps {
  key: number;
  type: string;
}
const Star = ({ type }: StarProps) => {
  return (
    <img
      className={`${type}-star`}
      src={type === "full" ? full : empty}
      alt={`${type} star`}
    />
  );
};

export default Star;
