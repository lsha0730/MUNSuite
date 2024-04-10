import Button from "../../../common/components/input/Button";
import { DEFAULT_QTYPE_LABELS, QTYPE_ICONS } from "../../../common/constants";
import { QuestionTypes as QT } from "../../../common/types/questionTypes";
import "./AddQuestion.scoped.css";

type Props = {
  addNewBlock: (key: QT) => void;
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
