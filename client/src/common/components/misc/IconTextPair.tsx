import { ReactNode } from "react";
import "./MiscComponents.scoped.css";

type Props = {
  icon: ReactNode;
  text: ReactNode | string;
};

const IconTextPair = ({ icon, text }: Props) => {
  return (
    <div className="pair">
      <div className="icon">{icon}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default IconTextPair;
