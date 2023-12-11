import { BsExclamation, BsInfoCircle, BsX } from "react-icons/bs";
import "./Notice.scoped.css";
import { classNames, getTextWidth } from "../../utils/utils";

type Props = {
  message: string;
  visible: boolean;
  type?: "error" | "warning" | "info";
};

const ICONS = {
  error: BsX,
  warning: BsExclamation,
  info: BsInfoCircle,
};

const Notice = ({ message, visible, type = "info" }: Props) => {
  const Icon = ICONS[type];
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const boxWidth = getTextWidth(message, 16) + 120;

  return (
    <div
      className={classNames("container", type)}
      style={{ right: visible ? "3rem" : `${-boxWidth}px` }}
    >
      <Icon className={`${type}_icon`} />
      <p>
        <span className="type">{`${displayType}: `}</span>
        {message}
      </p>
    </div>
  );
};

export default Notice;
