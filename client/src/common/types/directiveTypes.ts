export type Directive = StandardDirective | CustomDirective;

export type StandardDirective = DirectiveBase & {
  standard: true;
  title: string;
  type: string;
  sponsors: string[];
  signatories: string[];
};

export type CustomDirective = DirectiveBase & {
  standard: false;
};

type DirectiveBase = {
  submissionID: number; // TODO: Make this just 'id'
  author: string;
  body: any[];
  standard: boolean; // TODO: Make 'isStandard'
  status: "Passed" | "Pending" | "Failed";
  feedback?: string;
};
