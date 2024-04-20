import {
  CSSProperties,
  FC,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  ReactNode,
} from "react";
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
  width?: number;
  height?: number;
  fullWidth?: boolean;
  flexGrow?: boolean;
  component?: "input" | "textarea";
  [x: string]: unknown;
};

const TextInput = forwardRef(
  (
    {
      onEnter,
      label,
      type = "text",
      bg = "white",
      placeholder,
      style,
      width,
      height,
      fullWidth,
      flexGrow,
      component = "input",
      ...other
    }: Props,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fw = fullWidth ? "full_width" : "";
    const fg = flexGrow ? "flex_grow" : "";
    const bg_color = `bg_${bg}`;
    const inputProps = {
      type,
      className: classNames(component, fw, fg, bg_color),
      onKeyDown: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === "Enter" && onEnter) onEnter();
      },
      placeholder,
      style: Object.assign(
        {
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
        },
        style
      ),
      ...other,
    };

    return (
      <ConditionalWrapper
        condition={Boolean(label)}
        wrapper={(c) => (
          <div className={classNames("container", fw, fg)} style={style}>
            {c}
          </div>
        )}
      >
        {label && <p className="label">{label}</p>}
        {component === "input" ? (
          <input ref={ref as ForwardedRef<HTMLInputElement>} {...inputProps} />
        ) : (
          <textarea
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            {...inputProps}
          />
        )}
      </ConditionalWrapper>
    );
  }
);

export default TextInput;
