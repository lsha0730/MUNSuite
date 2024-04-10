import { CSSProperties, ForwardedRef, forwardRef } from "react";
import "./Input.scoped.css";
import ConditionalWrapper from "../misc/ConditionalWrapper";
import { classNames } from "../../utils/utils";

type Props = {
  onEnter?: () => void;
  label?: string;
  type?: "text" | "password";
  bg?: "white" | "gray";
  placeholder?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
  [x: string]: unknown;
};

const ShortText = forwardRef(
  (
    {
      onEnter,
      label,
      type = "text",
      bg = "white",
      placeholder,
      style,
      fullWidth,
      ...other
    }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const fw = fullWidth ? "full_width" : "";
    const bg_color = `bg_${bg}`;

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
          className={classNames("shorttext", fw, bg_color)}
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
