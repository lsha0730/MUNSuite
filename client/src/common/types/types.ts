import { Directive } from "./directiveTypes";
import { Question } from "./questionTypes";

export type AppData = {
  delegations: Delegations;
  form: Form;
  pendings: Pendings;
  processed: Processed;
  notes: Notes;
  settings: Settings;
};

export type Delegations = Delegate[];
export type Form = Question[];
export type Pendings = Directive[];
export type Processed = Directive[];
export type Notes = {
  individual: IndividualNote[];
  quick: string;
};
export type Settings = {
  committee: string;
  conference: string;
  formOpen: boolean;
  standardForm: boolean;
};

// Other
export type Delegate = {
  code: string;
  id: number;
  name: string;
};

export type IndividualNote = {
  delegate: string; // TODO: Identify notes by the delegate ID instead
  text: string;
};
