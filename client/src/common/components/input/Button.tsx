import { MouseEventHandler, ReactNode } from "react";
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
  | "white_outlined";

type Props = {
  onClick: MouseEventHandler;
  innerText: string;
  label?: string | ReactNode;
  style?: Record<string, string | number>;
  type?: ButtonType;
  size?: "md" | "lg";
  wide?: boolean;
  full?: boolean;
};

const Button = ({
  onClick,
  innerText,
  label,
  style,
  type = "dark",
  size = "md",
  wide,
  full,
}: Props) => {
  const toggleClasses = ["wide", "full"].filter((_, i) => [wide, full][i]);

  return (
    <ConditionalWrapper
      condition={Boolean(label)}
      wrapper={(c) => (
        <div className="container" style={style}>
          {c}
        </div>
      )}
    >
      {label && <p className="label">{label}</p>}
      <button
        className={classNames("button", type, size, ...toggleClasses)}
        onClick={onClick}
      >
        {innerText}
      </button>
    </ConditionalWrapper>
  );
};

export default Button;
