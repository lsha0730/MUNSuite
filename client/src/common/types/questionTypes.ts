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
  maxchars: number | false; // TODO: Make number | null instead
};

export type RadioQ = QuestionBase & {
  required: boolean;
  options: string[];
};

export type SelectMultipleQ = QuestionBase & {
  required: boolean;
  max: number | false; // TODO: Make number | null instead
  options: string[] | "all-delegations";
};

export type MultipleChoiceQ = QuestionBase & {
  required: boolean;
  options: string[];
};

export type DropdownQ = QuestionBase & {
  required: boolean;
  options: string[];
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
  id: number;
  type: QuestionTypes;
  heading: string;
  subheading: string;
};