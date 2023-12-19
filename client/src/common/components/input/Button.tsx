import { MouseEventHandler, ReactNode } from "react";
import "./Input.scoped.css";
import { classNames } from "../../utils/utils";

export type ButtonType =
  | "black"
  | "black_secondary"
  | "dark"
  | "dark_secondary"
  | "light"
  | "light_secondary"
  | "white"
  | "white_secondary";

type Props = {
  onClick: MouseEventHandler;
  innerText: string;
  label?: string | ReactNode;
  style?: Record<string, string | number>;
  type?: ButtonType;
  size?: "md" | "lg";
  wide?: boolean;
};

const Button = ({
  onClick,
  innerText,
  label,
  style,
  type = "dark",
  size = "md",
  wide,
}: Props) => {
  return (
    <div className="container" style={style}>
      {label && <p className="label">{label}</p>}
      <button
        className={classNames("button", type, size, wide ? "wide" : "")}
        onClick={onClick}
      >
        {innerText}
      </button>
    </div>
  );
};

export default Button;
