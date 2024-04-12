import { Option } from "./types";

export enum QuestionTypes { // TODO: Use enums throughout codebase
  Header = "header",
  ShortText = "shorttext",
  LongText = "longtext",
  Radio = "radio",
  SelectMultiple = "select-multiple", // TODO: make select_multiple or queue
  MultipleChoice = "multiplechoice", // TODO: make multiple_choice
  Dropdown = "dropdown",
  Content = "content",
}

export type QuestionID = string | number; // TODO: restrict to strings
export type MaxCap = number | null; // TODO: Make number | null instead

export type QuestionTypeMap = {
  [key in QuestionTypes]: key extends QuestionTypes.Header
    ? HeaderQ
    : key extends QuestionTypes.ShortText
    ? ShortTextQ
    : key extends QuestionTypes.LongText
    ? LongTextQ
    : key extends QuestionTypes.Radio
    ? RadioQ
    : key extends QuestionTypes.SelectMultiple
    ? SelectMultipleQ
    : key extends QuestionTypes.MultipleChoice
    ? MultipleChoiceQ
    : key extends QuestionTypes.Dropdown
    ? DropdownQ
    : key extends QuestionTypes.Content
    ? ContentQ
    : never
};

export type Question =
  | HeaderQ
  | ShortTextQ
  | LongTextQ
  | RadioQ
  | SelectMultipleQ
  | MultipleChoiceQ
  | DropdownQ
  | ContentQ;

export type HeaderQ = QuestionBase & {
  imgLink: string;
  imgName: string;
  imgPath: string;
};

export type ShortTextQ = QuestionBase & {
  required: boolean;
};

export type LongTextQ = QuestionBase & {
  required: boolean;
  maxchars: MaxCap;
};

export type RadioQ = QuestionBase & {
  required: boolean;
  options: Option[];
};

export type SelectMultipleQ = QuestionBase & {
  required: boolean;
  max: MaxCap;
  options: DelOptions;
};

export type MultipleChoiceQ = QuestionBase & {
  required: boolean;
  options: Option[];
};

export type DropdownQ = QuestionBase & {
  required: boolean;
  options: DelOptions;
};

export type ContentQ = QuestionBase & {
  content: ContentItem[];
};
export type ContentItem = ImageContent | TextContent;
export enum ContentType { // TODO: Use enums throughout codebase
  Image = "image",
  Text = "text",
}
export type ImageContent = {
  type: ContentType.Image;
  heading: string;
  imgName: string;
  path: string;
  value: string;
};
export type TextContent = {
  type: ContentType.Text;
  heading: string;
  value: string;
};

export type QuestionBase = {
  id: QuestionID;
  type: QuestionTypes;
  heading: string;
  subheading: string;
};

export const AllDelegations: "all-delegations" = "all-delegations";
export type DelOptions = Option[] | typeof AllDelegations;

export type StandardForm = [
  HeaderQ,
  ShortTextQ,
  RadioQ,
  SelectMultipleQ,
  SelectMultipleQ,
  ...Question[]
];
