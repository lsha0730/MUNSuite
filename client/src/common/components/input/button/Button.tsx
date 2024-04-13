import React, { ReactNode, useState } from "react";
import "../Input.scoped.css";
import "./Button.scoped.css";
import { classNames } from "../../../utils/utils";
import ConditionalWrapper from "../../misc/ConditionalWrapper";

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
  value?: boolean;
  onClick?: (buttonDown: boolean) => void;
  label?: string | ReactNode;
  wrapperStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  type?: ButtonType;
  size?: "tiny" | "sm" | "md" | "lg";
  padding?: "tiny" | "sm" | "md" | "lg";
  align?: "left" | "center" | "right";
  fullWidth?: boolean;
  isBinary?: boolean;
  children: ReactNode;
};

const BINARY_EXCLUSIONS = ["bricked"];

const Button = ({
  value,
  onClick,
  label,
  wrapperStyle,
  style,
  type = "dark",
  size = "md",
  padding,
  align = "center",
  fullWidth,
  isBinary,
  children,
}: Props) => {
  const padding_cn = `p_${padding || size}`;
  const fullWidth_cn = fullWidth ? "full_width" : "";
  const type_cn =
    isBinary && value && !BINARY_EXCLUSIONS.includes(type)
      ? `${type}_pressed`
      : type;

  return (
    <ConditionalWrapper
      condition={Boolean(label)}
      wrapper={(c) => (
        <div
          className={classNames("container", fullWidth_cn)}
          style={wrapperStyle}
        >
          {c}
        </div>
      )}
    >
      {label && <p className="label">{label}</p>}
      <button
        className={classNames(
          "button",
          type_cn,
          size,
          padding_cn,
          fullWidth_cn,
          align
        )}
        onClick={(e) => {
          if (onClick) onClick(!value);
        }}
        style={style}
      >
        {children}
      </button>
    </ConditionalWrapper>
  );
};

export default Button;
