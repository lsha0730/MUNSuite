import { MouseEventHandler, ReactNode } from "react";
import "./Input.scoped.css";

type Props = {
  onClick: MouseEventHandler;
  label?: string | ReactNode;
};

const Button = ({ onClick, label }: Props) => {
  return (
    <div className="container">
      {label && <p className="label">{label}</p>}
      <button className="button" onClick={onClick}>
        Log In
      </button>
    </div>
  );
};

export default Button;
