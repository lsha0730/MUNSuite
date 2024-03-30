import { QuestionTypes as QT } from "../../../common/types/questionTypes";
import "./AddQuestion.scoped.css";

const OPTIONS = [
  { key: QT.ShortText, label: "Short Text" },
  { key: QT.LongText, label: "Long Text" },
  { key: QT.Radio, label: "Radio" },
  { key: QT.MultipleChoice, label: "Multiple Choice" },
  { key: QT.SelectMultiple, label: "Select Multiple" },
  { key: QT.Dropdown, label: "Dropdown" },
  { key: QT.Content, label: "Content Block" },
  { key: QT.Header, label: "Header" },
];

type Props = {
  addNewBlock: (key: QT) => void;
};

function AddQuestion({ addNewBlock }: Props) {
  return (
    <div className="container">
      <p className="text">Add Block</p>
      <div className="options-container">
        {OPTIONS.map((e) => (
          <div
            className="btt"
            onClick={() => {
              addNewBlock(e.key);
            }}
          >
            {e.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddQuestion;
