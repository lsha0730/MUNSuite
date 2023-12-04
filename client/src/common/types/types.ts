import { Directive } from "./directiveTypes";
import { Question } from "./questionTypes";

// Util
export type oneArgFn = (e: any) => void;

// Administrative
export enum AccountType {
  Starter = "Starter",
  Premium = "Premium",
}

// Firebase Realtime Database
export type AppData = {
  delegations: Delegations;
  form: Form;
  pendings: Pendings;
  processed: Processed;
  notes: Notes;
  settings: Settings;
};

export enum AppDataTarget {
  Delegations = "delegations",
  Form = "form",
  Pendings = "pendings",
  Processed = "processed",
  Notes = "notes",
  Settings = "settings",
}

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

export type Delegate = {
  code: string;
  id: number;
  name: string;
};

export type IndividualNote = {
  delegate: string; // TODO: Identify notes by the delegate ID instead
  text: string;
};
