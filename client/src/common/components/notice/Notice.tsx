import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { BsExclamation, BsInfoCircle, BsX } from "react-icons/bs";
import "./Notice.scoped.css";
import { classNames } from "../../utils/utils";

type Props = {
  message: string | ReactNode;
  type?: "error" | "warning" | "info";
  timeout?: number;
};

const ICONS = {
  error: BsX,
  warning: BsExclamation,
  info: BsInfoCircle,
};

const DEFAULT_TIMEOUT_MS = 4000;

const Notice = ({
  message,
  type = "info",
  timeout = DEFAULT_TIMEOUT_MS,
}: Props) => {
  const Icon = ICONS[type];
  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dynamicOffset = (ref.current?.offsetWidth || 0) + 30

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, timeout);
  }, []);

  return (
    <div
      className={classNames("container", type)}
      style={{ right: visible ? "3rem" : `${-dynamicOffset}px` }}
      ref={ref}
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
