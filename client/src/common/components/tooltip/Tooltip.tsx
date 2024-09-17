import { BsFillQuestionCircleFill } from "react-icons/bs";
import "./Tooltip.scoped.css";
import Hoverable from "../hover/Hoverable";
import { getTextWidth } from "../../utils/utils";
import { useState } from "react";

type Props = {
  message: string;
  direction: "top" | "bottom" | "left" | "right";
  maxWidth?: number;
};

const GAP = 10;

const Tooltip = ({ message, direction, maxWidth }: Props) => {
  const messageWidth = maxWidth || getTextWidth(message, 12);
  const positions = {
    top: { top: -GAP },
    bottom: { bottom: -GAP },
    left: { left: -(messageWidth + GAP) },
    right: { right: -(messageWidth + GAP) },
  };

  return (
    <Hoverable
      message={message}
      pos={positions[direction]}
      messageStyle={{ maxWidth, textWrap: "balance" }}
    >
      <BsFillQuestionCircleFill className="icon" />
    </Hoverable>
  );
};

export default Tooltip;
