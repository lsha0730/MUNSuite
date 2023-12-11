import { MouseEventHandler, ReactNode } from "react";
import "./Input.scoped.css";

type Props = {
  onClick: MouseEventHandler;
  innerText: string;
  label?: string | ReactNode;
  style?: Record<string, string | number>;
};

const Button = ({ onClick, innerText, label, style }: Props) => {
  return (
    <div className="container" style={style}>
      {label && <p className="label">{label}</p>}
      <button className="button" onClick={onClick}>
        {innerText}
      </button>
    </div>
  );
};

export default Button;
