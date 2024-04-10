import { FaHeading } from "react-icons/fa";
import Button from "../../../common/components/input/Button";
import { DEFAULT_QTYPE_LABELS } from "../../../common/constants";
import { QuestionTypes as QT } from "../../../common/types/questionTypes";
import "./AddQuestion.scoped.css";
import { BsImages, BsTextLeft } from "react-icons/bs";
import {
  MdArrowDropDownCircle,
  MdCheckBox,
  MdOutlineRadioButtonChecked,
  MdShortText,
} from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";

type Props = {
  addNewBlock: (key: QT) => void;
};

const QTYPE_ICONS = {
  [QT.ShortText]: MdShortText,
  [QT.LongText]: BsTextLeft,
  [QT.Radio]: MdOutlineRadioButtonChecked,
  [QT.MultipleChoice]: MdCheckBox,
  [QT.SelectMultiple]: BiSolidAddToQueue,
  [QT.Dropdown]: MdArrowDropDownCircle,
  [QT.Content]: BsImages,
  [QT.Header]: FaHeading,
};

function AddQuestion({ addNewBlock }: Props) {
  const options = Object.values(QT);

  return (
    <div className="container">
      <p className="text">Add New</p>
      <div className="options-container">
        {options.map((qt: QT) => (
          <AddNewButton
            qt={qt}
            onClick={() => {
              addNewBlock(qt);
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AddNewButton({ qt, onClick }: { qt: QT; onClick: () => void }) {
  const Icon = QTYPE_ICONS[qt];
  return (
    <Button onClick={onClick} type="light" padding="sm">
      <div className="button_icon_pair">
        <Icon />
        {DEFAULT_QTYPE_LABELS[qt]}
      </div>
    </Button>
  );
}

export default AddQuestion;
