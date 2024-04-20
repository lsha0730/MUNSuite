import "./FileUpload.scoped.css";
import { ChangeEventHandler, useRef } from "react";
import { File } from "../../../types/questionTypes";
import Button from "../button/Button";
import { MdUpload } from "react-icons/md";

type Props = {
  file: File;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
};

const FileUpload = ({ file, onChange, label }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  function openFileDialogue() {
    if (inputRef.current) inputRef.current.click();
  }

  return (
    <div className="container">
      {label && <p className="label">{label}</p>}

      <div className="input">
        <p className="filename">{file.name}</p>

        <Button size="sm" type="light" onClick={openFileDialogue}>
          <MdUpload />
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
