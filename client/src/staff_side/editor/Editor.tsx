import { useState, useContext } from "react";
import "./Editor.scoped.css";
import { appContext, staffContext } from "../../common/Context";
import { BiLink } from "react-icons/bi";
import AddQuestion from "./add_question/AddQuestion";
import { firebaseWrite } from "../../common/utils/firebase";
import { FirebaseDataTarget, FormOperation } from "../../common/types/types";
import {
  QuestionTypes as QT,
  Question,
  QuestionID,
} from "../../common/types/questionTypes";
import { STANDARD_FORM_START } from "../../common/constants";
import { QuestionEditorPair } from "./QuestionEditorPair";
import Button from "../../common/components/input/Button";
import Notice from "../../common/components/notice/Notice";
import {
  checkStandardized,
  makeQuestion,
  pasteToClipboard,
} from "../../common/utils/utils";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaGavel } from "react-icons/fa";
import Tooltip from "../../common/components/tooltip/Tooltip";

const STANDARDIZATION_INFO = `A 'Standard' form starts with questions regarding the directive title, type, sponsors, and signatories. Submissions using this standard form will be formatted in a more easily readable manner in your inbox compared to freeform submissions.`;

function Editor() {
  const { database, user } = useContext(appContext);
  const {
    firebaseData: { form, settings },
  } = useContext(staffContext);
  const formLink = `${window.location.host}/form/${user?.uid || ""}`;

  const [editing, setEditing] = useState<QuestionID | null>(0);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const standardized = checkStandardized(form);

  const controlProps = {
    editing,
    setEditing,
    updateForm,
    standardized,
  };

  function forceStandardization() {
    if (!standardized) {
      const newForm = STANDARD_FORM_START.concat(form);
      if (database && user)
        firebaseWrite(database, user.uid, FirebaseDataTarget.Form, newForm);
    }

    if (database && user)
      firebaseWrite(database, user.uid, FirebaseDataTarget.Settings, {
        ...settings,
        standardForm: standardized,
      });
  }

  function copyLink() {
    pasteToClipboard(formLink);
    setConfirmation(true);
    setTimeout(() => setConfirmation(false), 3000);
  }

  function addQuestion(type: QT) {
    const newQ = makeQuestion(type, false) as Question;
    const newForm = form.concat(newQ);
    if (database && user)
      firebaseWrite(database, user.uid, FirebaseDataTarget.Form, newForm);
  }

  function updateForm(op: FormOperation, id: QuestionID, newValue?: Question) {
    let copy = form;
    const index = copy.findIndex((q) => q.id === id);

    switch (op) {
      case FormOperation.Delete:
        copy = copy.filter((q) => q.id !== id);
        break;
      case FormOperation.Update:
        if (newValue) copy = copy.map((q) => (q.id === id ? newValue : q));
        break;
      case FormOperation.MoveUp:
        if (index <= 0) return;
        const subjectUp = copy[index];
        const prevUp = copy[index - 1];
        copy[index - 1] = subjectUp;
        copy[index] = prevUp;
        if (editing === index) {
          const prev = form[index - 1]?.id || null
          setEditing(prev)
        }
        break;
      case FormOperation.MoveDown:
        if (index < 0 || index >= copy.length) return;
        const subjectDown = copy[index];
        const nextDown = copy[index + 1];
        copy[index + 1] = subjectDown;
        copy[index] = nextDown;
        if (editing === index) {
          const next = form[index + 1]?.id || null
          setEditing(next)
        }
        break;
      default:
        break;
    }

    if (database && user)
      firebaseWrite(database, user.uid, FirebaseDataTarget.Form, copy);
  }

  return (
    <div className="editor-container">
      <div className="main-UI">
        <div className="link-container">
          <Button type="light" size="md" padding="sm" onClick={copyLink}>
            <BiLink />
            <p style={{ marginLeft: 5 }}>Share</p>
          </Button>
        </div>

        <div className="hat-UI">
          <div className="hat-left">
            <p className="heading">[Delegation Name]</p>
            <p className="subheading">{settings.committee}</p>
          </div>

          <div className="hat-right">
            <Tooltip
              message={STANDARDIZATION_INFO}
              maxWidth={400}
              direction="left"
            />
            <Button
              onClick={forceStandardization}
              size="md"
              padding="sm"
              type={standardized ? "bricked" : "light_secondary"}
            >
              <div className="icon-text">
                {standardized ? <BsFillPatchCheckFill /> : <FaGavel />}
                <p>
                  {standardized
                    ? "Currently Standardized"
                    : "Standardize Format"}
                </p>
              </div>
            </Button>
          </div>
        </div>

        {form.map((question) => (
          <QuestionEditorPair question={question} controlProps={controlProps} />
        ))}

        <AddQuestion addNewBlock={addQuestion} />
      </div>

      <Notice
        message="Copied form link to clipboard"
        visible={confirmation}
        type="info"
      />
    </div>
  );
}

export default Editor;
