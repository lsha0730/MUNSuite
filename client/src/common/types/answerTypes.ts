import { QuestionTypes } from "./questionTypes";

export type Answer =
  | ShortTextA
  | LongTextA
  | RadioA
  | SelectMultipleA
  | MultipleChoiceA
  | DropdownA;

export type ShortTextA = SingleStringA & {
  type: QuestionTypes.ShortText;
};

export type LongTextA = SingleStringA & {
  type: QuestionTypes.LongText;
};

export type RadioA = SingleStringA & {
  type: QuestionTypes.Radio;
};

export type SelectMultipleA = MultiStringA & {
  type: QuestionTypes.SelectMultiple;
};

export type MultipleChoiceA = MultiStringA & {
  type: QuestionTypes.MultipleChoice;
};

export type DropdownA = SingleStringA & {
  type: QuestionTypes.Dropdown;
};

type SingleStringA = {
  heading: string;
  value: string;
};

type MultiStringA = {
  heading: string;
  value: string[];
};
