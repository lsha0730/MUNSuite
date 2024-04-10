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

  return <>{components[question.type]}</>;
};

const HeaderPair = ({
  id,
  imgLink,
  imgName,
  imgPath,
  heading,
  subheading,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & HeaderQ) => {
  return (
    <div className="preview-editor-pair">
      <Header
        variant="staff"
        key={`preview${id}`}
        id={id}
        imgPath={imgPath}
        imgLink={imgLink}
        heading={heading}
        subheading={subheading}
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized && id === 0}
      />
      <HeaderEditor
        key={`editor${id}${editing}`}
        id={id}
        imgPath={imgPath}
        imgLink={imgLink}
        imgName={imgName}
        heading={heading}
        subheading={subheading}
        editing={editing}
        updateForm={updateForm}
        locked={standardized && id === 0}
      />
    </div>
  );
};

const RadioPair = ({
  id,
  required,
  heading,
  subheading,
  options,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & RadioQ) => {
  return (
    <div className="preview-editor-pair">
      <Radio
        variant="staff"
        key={`preview${id}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        options={options || []}
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized && id == 2}
      />
      <RadioEditor
        key={`editor${id}${editing}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        options={options || []}
        editing={editing}
        updateForm={updateForm}
        locked={standardized && id == 2}
      />
    </div>
  );
};

const MultipleChoicePair = ({
  id,
  required,
  heading,
  subheading,
  options,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & MultipleChoiceQ) => {
  return (
    <div className="preview-editor-pair">
      <MultipleChoice
        variant="staff"
        key={`preview${id}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        options={options || []}
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized}
      />
      <MultiplechoiceEditor
        key={`editor${id}${editing}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        options={options || []}
        editing={editing}
        updateForm={updateForm}
        locked={standardized}
      />
    </div>
  );
};

const ContentPair = ({
  id,
  heading,
  subheading,
  content,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & ContentQ) => {
  return (
    <div className="preview-editor-pair">
      <Content
        variant="staff"
        key={`preview${id}`}
        id={id}
        heading={heading}
        subheading={subheading}
        content={content || []}
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized}
      />
      <ContentEditor
        key={`editor${id}${editing}`}
        id={id}
        heading={heading}
        subheading={subheading}
        content={content || []}
        editing={editing}
        updateForm={updateForm}
        locked={standardized}
      />
    </div>
  );
};

const ShortTextPair = ({
  id,
  required,
  heading,
  subheading,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & ShortTextQ) => {
  return (
    <div className="preview-editor-pair">
      <ShortText
        variant="staff"
        key={`preview${id}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized && id == 1}
      />
      <ShorttextEditor
        key={`editor${id}${editing}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        editing={editing}
        updateForm={updateForm}
        locked={standardized && id == 1}
      />
    </div>
  );
};

const LongTextPair = ({
  id,
  required,
  heading,
  subheading,
  maxchars,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & LongTextQ) => {
  return (
    <div className="preview-editor-pair">
      <LongText
        variant="staff"
        key={`preview${id}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        maxchars={maxchars || false}
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized}
      />
      <LongtextEditor
        key={`editor${id}${editing}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        maxchars={maxchars || false}
        editing={editing}
        updateForm={updateForm}
        locked={standardized}
      />
    </div>
  );
};

const DropdownPair = ({
  id,
  required,
  heading,
  subheading,
  options,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & DropdownQ) => {
  const {
    firebaseData: { delegations },
  } = useContext(staffContext);

  return (
    <div className="preview-editor-pair">
      <Dropdown
        variant="staff"
        key={`preview${id}${delegations.length}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        options={
          options === AllDelegations
            ? delegations.map((del) => del.name)
            : options || []
        }
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized}
      />
      <DropdownEditor
        key={`editor${id}${editing}${delegations.length}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        options={options || []}
        editing={editing}
        updateForm={updateForm}
        locked={standardized}
      />
    </div>
  );
};

const SelectMultiplePair = ({
  id,
  required,
  heading,
  subheading,
  max,
  options,
  editing,
  setEditing,
  updateForm,
  standardized,
}: ControlProps & SelectMultipleQ) => {
  const {
    firebaseData: { delegations },
  } = useContext(staffContext);

  return (
    <div className="preview-editor-pair">
      <SelectMultiple
        variant="staff"
        key={`preview${id}${options ? options.length : 0}${delegations.length}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        max={max}
        options={
          options === "all-delegations"
            ? delegations.map((del) => del.name)
            : options || []
        }
        editing={editing}
        setEditing={setEditing}
        updateForm={updateForm}
        locked={standardized && (id == 3 || id == 4)}
      />
      <SelectmultipleEditor
        key={`editor${id}${editing}${delegations.length}`}
        id={id}
        required={required}
        heading={heading}
        subheading={subheading}
        max={max}
        options={options || []}
        editing={editing}
        updateForm={updateForm}
        locked={standardized && (id == 3 || id == 4)}
      />
    </div>
  );
};
