import { ForwardedRef, ReactNode, forwardRef } from "react";
import "./Input.scoped.css";

type Props = {
  label?: string | ReactNode;
};

const Checkbox = forwardRef(
  ({ label }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="checkbox_container">
        {label && <p className="label">{label}</p>}
        <input ref={ref} className="checkbox" type="checkbox" />
      </div>
    );
  }
);

export default Checkbox;
