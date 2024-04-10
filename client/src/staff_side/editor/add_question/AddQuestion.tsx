import Button from "../../../common/components/input/Button";
import { DEFAULT_QTYPE_LABELS } from "../../../common/constants";
import { QuestionTypes } from "../../../common/types/questionTypes";
import "./AddQuestion.scoped.css";

type Props = {
  addNewBlock: (key: QuestionTypes) => void;
};

function AddQuestion({ addNewBlock }: Props) {
  const options = Object.values(QuestionTypes);

  return (
    <div className="container">
      <p className="text">Add Block</p>
      <div className="options-container">
        {options.map((qt: QuestionTypes) => (
          <Button
            onClick={() => {
              addNewBlock(qt);
            }}
            type="light"
            padding="sm"
          >
            {DEFAULT_QTYPE_LABELS[qt]}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default AddQuestion;
