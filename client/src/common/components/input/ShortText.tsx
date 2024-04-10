import { ForwardedRef, forwardRef } from "react";
import "./Input.scoped.css";
import ConditionalWrapper from "../misc/ConditionalWrapper";
import { classNames } from "../../utils/utils";

type Props = {
  onEnter?: () => void;
  label?: string;
  type?: "text" | "password";
  placeholder?: string;
  style?: Record<string, string | number>;
  fullWidth?: boolean;
  [x: string]: unknown;
};

const ShortText = forwardRef(
  (
    {
      onEnter,
      label,
      type = "text",
      placeholder,
      style,
      fullWidth,
      ...other
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const fw = fullWidth ? "full_width" : "";
    return (
      <ConditionalWrapper
        condition={Boolean(label)}
        wrapper={(c) => (
          <div className={classNames("container", fw)} style={style}>
            {c}
          </div>
        )}
      >
        {label && <p className="label">{label}</p>}
        <input
          ref={ref}
          type={type}
          className={classNames("shorttext", fw)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onEnter) onEnter();
          }}
          placeholder={placeholder}
          style={style}
          {...other}
        />
      </ConditionalWrapper>
    );
  }
);

export default ShortText;
