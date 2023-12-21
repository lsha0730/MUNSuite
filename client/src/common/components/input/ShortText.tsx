import { ForwardedRef, forwardRef } from "react";
import "./Input.scoped.css";
import ConditionalWrapper from "../misc/ConditionalWrapper";

type Props = {
  onEnter?: () => void;
  label?: string;
  type?: "text" | "password";
  placeholder?: string;
  style?: Record<string, string | number>;
};

const ShortText = forwardRef(
  (
    { onEnter, label, type = "text", placeholder, style }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
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
        <input
          ref={ref}
          type={type}
          className="shorttext"
          onKeyDown={(e) => {
            if (e.key === "Enter" && onEnter) onEnter();
          }}
          placeholder={placeholder}
          style={style}
        />
      </ConditionalWrapper>
    );
  }
);

export default ShortText;
