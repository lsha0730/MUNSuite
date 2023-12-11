import { ForwardedRef, forwardRef } from "react";
import "./Input.scoped.css";

type Props = {
  onEnter?: () => void;
  label?: string;
  type?: "text" | "password";
  style?: Record<string, string | number>;
};

const ShortText = forwardRef(
  (
    { onEnter, label, type = "text", style }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className="container" style={style}>
        {label && <p className="label">{label}</p>}
        <input
          ref={ref}
          type={type}
          className="shorttext"
          onKeyDown={(e) => {
            if (e.key === "Enter" && onEnter) onEnter();
          }}
        />
      </div>
    );
  }
);

export default ShortText;
