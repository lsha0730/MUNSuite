import "./QmodButtons.scoped.css";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FormOperation } from "../../../types/types";
import { QuestionID } from "../../../types/questionTypes";

type Props = {
  id: QuestionID;
  onClick: (op: FormOperation, id: QuestionID) => void;
};

const QmodButtons = ({ id, onClick }: Props) => {
  return (
    <div className="container">
      <div onClick={() => onClick(FormOperation.MoveUp, id)}>
        <IoIosArrowUp className="mover" />
      </div>
      <div onClick={() => onClick(FormOperation.MoveDown, id)}>
        <IoIosArrowDown className="mover" />
      </div>
      <div onClick={() => onClick(FormOperation.Delete, id)}>
        <FaTrash className="deleter" />
      </div>
    </div>
  );
};

export default QmodButtons;
