import { useState, useContext } from "react";
import "./Editor.scoped.css";
import { appContext, staffContext } from "../../common/Context";
import { BiLink } from "react-icons/bi";
import Toggle from "../../common/components/toggle/Toggle";
import AddQuestion from "./add_question/AddQuestion";
import { firebaseWrite } from "../../common/utils/firebase";
import { FirebaseDataTarget, FormOperation } from "../../common/types/types";
import { v4 as uuid } from "uuid";
import { AllDelegations, QuestionTypes as QT, Question, QuestionID, QuestionTypeMap, StandardForm } from "../../common/types/questionTypes";
import { DEFAULT_FORM_BASES, DirectiveTitleLbl, DirectiveTypeLbl, SignatoriesLbl, SponsorsLbl } from "../../common/constants";
import { ControlProps, QuestionEditorPair } from "./QuestionEditorPair";
import Button from "../../common/components/input/Button";
import Notice from "../../common/components/notice/Notice";
import { checkStandardized, pasteToClipboard } from "../../common/utils/utils";

function Editor() {
  const { database, user } = useContext(appContext);
  const {
    firebaseData: { form, settings },
  } = useContext(staffContext);
  const formLink = `${window.location.host}/form/${user?.uid || ""}`;

  const [editing, setEditing] = useState<QuestionID | null>(null);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const standardized = checkStandardized(form)

  const controlProps: ControlProps = {
    editing, setEditing, updateForm, standardized
  }

  function forceStandardization() {
    if (!standardized) {
      const front = [
        makeNewBlock(QT.Header, true),
        makeNewBlock(QT.ShortText, true, DirectiveTitleLbl),
        makeNewBlock(QT.Radio, true, DirectiveTypeLbl),
        {...makeNewBlock(QT.SelectMultiple, true, SponsorsLbl), options: AllDelegations},
        {...makeNewBlock(QT.SelectMultiple, false,SignatoriesLbl), options: AllDelegations}
      ] as Question[];
      const newForm = front.concat(form)
      if (database && user) firebaseWrite(database, user.uid, FirebaseDataTarget.Form, newForm);
    }

    if (database && user) firebaseWrite(database, user.uid, FirebaseDataTarget.Settings, {
      ...settings,
      standardForm: standardized,
    });
  }

  function copyLink() {
    pasteToClipboard(formLink);
    setConfirmation(true);
    setTimeout(() => setConfirmation(false), 3000);
  }

  function makeNewBlock<T extends QT>(type: T, required?: boolean, heading?: string): QuestionTypeMap[T] {
    const baseBlock: Record<string, any> = {
      type,
      id: uuid(),
      subheading: "",
      required: required
    };
    if (heading) baseBlock.heading = heading
    const combined = Object.assign(DEFAULT_FORM_BASES[type], baseBlock) as Record<string, any>
    console.log(combined)
    return combined as QuestionTypeMap[T]
  }

  function addNewBlock(type: QT) {
    const newQ = makeNewBlock(type, false) as Question;
    const newForm = form.concat(newQ)
    if (database && user) firebaseWrite(database, user.uid, FirebaseDataTarget.Form, newForm);
  }

  function updateForm(op: FormOperation, id: QuestionID, newValue?: Question) {
    let copy = form
    const index = copy.findIndex(q => q.id === id)

    switch (op) {
      case FormOperation.Delete:
        copy = copy.filter(q => q.id !== id);
        break;
      case FormOperation.Update:
        if (newValue) copy = copy.map(q => q.id === id ? newValue : q);
        break;
      case FormOperation.MoveUp:
        if (index <= 0) return;
        const subjectUp = copy[index];
        const prevUp = copy[index - 1];
        copy[index - 1] = subjectUp;
        copy[index] = prevUp;
        if (editing === index) setEditing(editing - 1);
        break;
      case FormOperation.MoveDown:
        if (index < 0 || index >= copy.length) return;
        const subjectDown = copy[index];
        const nextDown = copy[index + 1];
        copy[index + 1] = subjectDown;
        copy[index] = nextDown;
        if (editing === index) setEditing(editing + 1);
        break;
      default:
        break;
    }
    
    if (database && user) firebaseWrite(database, user.uid, FirebaseDataTarget.Form, copy);
  }

  return (
    <div className="editor-container">
      <div className="main-UI">
        <div className="link-container">
          <Button type="light" size="md" padding="sm" onClick={copyLink}>
            <BiLink/>
            <p style={{ marginLeft: 5 }}>Share</p>
          </Button>
        </div>

        <div className="hat-UI">
          <div className="preview-hat">
            <p className="preview-hat-heading">[Delegation Name]</p>
            <p className="preview-hat-subheading">{settings.committee}</p>
          </div>

          <Toggle
            size="large"
            color="green"
            value={standardized}
            onValue={forceStandardization}
            label={{ on: "Standardized for MUN", off: "Custom Form" }}
          />
        </div>

        {form.map(question => <QuestionEditorPair question={question} controlProps={controlProps} />)}

        <AddQuestion addNewBlock={addNewBlock} />
      </div>

      <Notice
        message="Copied form link to clipboard"
        visible={confirmation}
        type="info"
      />
    </div>
  );
}

export default Editor