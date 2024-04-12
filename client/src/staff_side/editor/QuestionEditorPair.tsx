import "./Editor.scoped.css";
import {
  Content,
  Header,
  LongText,
  MultipleChoice,
  Radio,
  SelectMultiple,
  ShortText,
  Dropdown,
} from "../../common/components/form";
import {
  ContentEditor,
  DropdownEditor,
  HeaderEditor,
  LongtextEditor,
  MultiplechoiceEditor,
  RadioEditor,
  SelectmultipleEditor,
  ShorttextEditor,
} from "./editor_components";
import {
  AllDelegations,
  ContentQ,
  DropdownQ,
  HeaderQ,
  LongTextQ,
  MultipleChoiceQ,
  QuestionTypes as QT,
  Question,
  QuestionID,
  RadioQ,
  SelectMultipleQ,
  ShortTextQ,
} from "../../common/types/questionTypes";
import { Dispatch, SetStateAction, useContext } from "react";
import { staffContext } from "../../common/Context";
import { FormOperation } from "../../common/types/types";

export type ControlProps = {
  editing: QuestionID | null;
  setEditing: Dispatch<SetStateAction<QuestionID | null>>;
  updateForm: (op: FormOperation, id: QuestionID, newValue?: Question) => void;
  standardized: boolean;
};

type Props = {
  controlProps: ControlProps;
  question: Question;
};

export const QuestionEditorPair = ({ controlProps, question }: Props) => {
  const components = {
    [QT.Header]: <HeaderPair {...controlProps} {...question as HeaderQ} />,
    [QT.Radio]: <RadioPair {...controlProps} {...question as RadioQ} />,
    [QT.MultipleChoice]: (
      <MultipleChoicePair {...controlProps} {...question as MultipleChoiceQ} />
    ),
    [QT.Content]: <ContentPair {...controlProps} {...question as ContentQ} />,
    [QT.ShortText]: (
      <ShortTextPair {...controlProps} {...question as ShortTextQ} />
    ),
    [QT.LongText]: (
      <LongTextPair {...controlProps} {...question as LongTextQ} />
    ),
    [QT.Dropdown]: (
      <DropdownPair {...controlProps} {...question as DropdownQ} />
    ),
    [QT.SelectMultiple]: (
      <SelectMultiplePair {...controlProps} {...question as SelectMultipleQ} />
    ),
  };

  return <div className="preview-editor-pair">{components[question.type]}</div>;
};

const HeaderPair = (props: ControlProps & HeaderQ) => {
  const { id } = props;
  return (
    <>
      <Header variant="staff" key={`preview${id}`} {...props} />
      <HeaderEditor key={`editor${id}`} {...props} />
    </>
  );
};

const RadioPair = (props: ControlProps & RadioQ) => {
  const { id } = props;
  return (
    <>
      <Radio variant="staff" key={`preview${id}`} {...props} />
      <RadioEditor key={`editor${id}`} {...props} />
    </>
  );
};

const MultipleChoicePair = (props: ControlProps & MultipleChoiceQ) => {
  const { id } = props;
  return (
    <>
      <MultipleChoice variant="staff" key={`preview${id}`} {...props} />
      <MultiplechoiceEditor key={`editor${id}`} {...props} />
    </>
  );
};

const ContentPair = (props: ControlProps & ContentQ) => {
  const { id } = props;
  return (
    <>
      <Content variant="staff" key={`preview${id}`} {...props} />
      <ContentEditor key={`editor${id}`} {...props} />
    </>
  );
};

const ShortTextPair = (props: ControlProps & ShortTextQ) => {
  const { id } = props;
  return (
    <>
      <ShortText variant="staff" key={`preview${id}`} {...props} />
      <ShorttextEditor key={`editor${id}`} {...props} />
    </>
  );
};

const LongTextPair = (props: ControlProps & LongTextQ) => {
  const { id } = props;
  return (
    <>
      <LongText variant="staff" key={`preview${id}`} {...props} />
      <LongtextEditor key={`editor${id}`} {...props} />
    </>
  );
};

const DropdownPair = (props: ControlProps & DropdownQ) => {
  const {
    firebaseData: { delegations },
  } = useContext(staffContext);
  const { id, options } = props;

  return (
    <>
      <Dropdown
        variant="staff"
        key={`preview${id}${delegations.length}`}
        {...props}
        options={
          options === AllDelegations
            ? delegations.map((d) => ({ key: d.id, label: d.name }))
            : options || []
        }
      />
      <DropdownEditor key={`editor${id}`} {...props} />
    </>
  );
};

const SelectMultiplePair = (props: ControlProps & SelectMultipleQ) => {
  const {
    firebaseData: { delegations },
  } = useContext(staffContext);
  const { id, options } = props;

  return (
    <>
      <SelectMultiple
        variant="staff"
        key={`preview${id}`}
        {...props}
        options={
          options === AllDelegations
            ? delegations.map((d) => ({ key: d.id, label: d.name }))
            : options || []
        }
      />
      <SelectmultipleEditor key={`editor${id}`} {...props} />
    </>
  );
};
