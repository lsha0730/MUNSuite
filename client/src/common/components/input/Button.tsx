import React, { MouseEventHandler, ReactNode } from "react";
import "./Input.scoped.css";
import { classNames } from "../../utils/utils";
import ConditionalWrapper from "../misc/ConditionalWrapper";

export type ButtonType =
  | "bricked"
  | "black"
  | "black_secondary"
  | "dark"
  | "dark_secondary"
  | "light"
  | "light_secondary"
  | "white"
  | "white_secondary"
  | "white_outlined"
  | "gray"
  | "yellow"
  | "red";

type Props = {
  onClick: MouseEventHandler;
  label?: string | ReactNode;
  wrapperStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  type?: ButtonType;
  size?: "md" | "lg";
  padding?: "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  fullWidth?: boolean;
  children: ReactNode;
};

const Button = ({
  onClick,
  label,
  wrapperStyle,
  style,
  type = "dark",
  size = "md",
  padding,
  align = "center",
  fullWidth,
  children,
}: Props) => {
  const pd = `p_${padding || size}`;
  const fw = fullWidth ? "full_width" : "";

  return (
    <ConditionalWrapper
      condition={Boolean(label)}
      wrapper={(c) => (
        <div className={classNames("container", fw)} style={wrapperStyle}>
          {c}
        </div>
      )}
    >
      {label && <p className="label">{label}</p>}
      <button
        className={classNames("button", type, size, pd, fw, align)}
        onClick={onClick}
        style={style}
      >
        {children}
      </button>
    </ConditionalWrapper>
  );
};

export default Button;
