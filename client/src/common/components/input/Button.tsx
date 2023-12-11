import { MouseEventHandler, ReactNode } from "react";
import "./Input.scoped.css";

type Props = {
  onClick: MouseEventHandler;
  innerText: string;
  label?: string | ReactNode;
};

const Button = ({ onClick, innerText, label }: Props) => {
  return (
    <div className="container">
      {label && <p className="label">{label}</p>}
      <button className="button" onClick={onClick}>
        {innerText}
      </button>
    </div>
  );
};

export default Button;
