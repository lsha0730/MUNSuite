import { ForwardedRef, ReactNode, forwardRef } from "react";
import "./Input.scoped.css";

type Props = {
  label?: string | ReactNode;
  style?: Record<string, string | number>;
};

const Checkbox = forwardRef(
  ({ label, style }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="checkbox_container" style={style}>
        {label && <p className="label">{label}</p>}
        <input ref={ref} className="checkbox" type="checkbox" />
      </div>
    );
  }
);

export default Checkbox;
