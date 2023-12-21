import { useState } from "react";
import "./Delbar.scoped.css";
import { classNames, pasteToClipboard } from "../../../common/utils/utils";
import Notice from "../../../common/components/notice/Notice";
import { Delegate } from "../../../common/types/types";

type Props = {
  delegate: Delegate;
  onClick: (d: Delegate) => void;
  selected: boolean;
};

const Delbar = ({ delegate, onClick, selected }: Props) => {
  const [notification, setNotification] = useState<boolean>(false);

  return (
    <div className="container">
      <div
        className={classNames("bar", selected ? "selected" : "")}
        onClick={() => {
          onClick(delegate);
        }}
      >
        <p className="name">{delegate.name}</p>
      </div>

      <div
        className={classNames(
          "code",
          selected ? "code_selected" : "code_unselected"
        )}
        onClick={copyCode}
      >
        <p>{delegate.code}</p>
      </div>

      <Notice
        message="Copied code to clipboard"
        visible={notification}
        type="info"
      />
    </div>
  );

  function copyCode() {
    pasteToClipboard(delegate.code);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 3000);
  }
};

export default Delbar;
