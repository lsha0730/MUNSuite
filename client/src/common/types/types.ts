import { Directive } from "./directiveTypes";
import { Question } from "./questionTypes";

// Util
export type oneArgFn = (e: any) => void;

// Administrative
export enum AccountType {
  Starter = "Starter",
  Premium = "Premium",
}

export enum StaffPageKey {
  Delegations = "delegations",
  Editor = "editor",
  Inbox = "inbox",
  History = "history",
  Statistics = "statistics",
  Notes = "notes",
  Plan = "plan",
  Settings = "settings",
  Signout = "signout",
}

// Firebase Storage
export enum FBStorageFolder {
  Header = "header",
  Content = "content",
}

// Firebase Realtime Database
export type FirebaseDataDelegate = {
  delegations: Delegate[];
  form: Question[];
  pendings: Directive[];
  processed: Directive[];
  settings: Settings;
};

export type FirebaseDataStaff = FirebaseDataDelegate & {
  notes: Notes;
};

export enum FirebaseDataTarget {
  Delegations = "delegations",
  Form = "form",
  Pendings = "pendings",
  Processed = "processed",
  Notes = "notes",
  Settings = "settings",
}

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

export type DelegateID = string | number; // TODO: Wipe out all delegates identified by number

export type Delegate = {
  code: string;
  id: DelegateID;
  name: string;
};

export type IndividualNote = {
  delegate: string; // TODO: Identify notes by the delegate ID instead
  text: string;
};

export enum FormOperation { // TODO: Use enums throughout app
  Delete = "delete",
  Update = "update",
  MoveUp = "move_up",
  MoveDown = "move_down",
}

export type Option = {
  key: string;
  label: string;
};
