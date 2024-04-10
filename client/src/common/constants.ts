import { DelegateAPI } from "../delegate_side/DelegateApp";
import { StaffAPI, StaffAccountInfo } from "../staff_side/StaffApp";
import { Directive } from "./types/directiveTypes";
import { Question, QuestionTypes as QT } from "./types/questionTypes";
import {
  FirebaseDataStaff,
  Delegate,
  Notes,
  Settings,
  AccountType,
  StaffPageKey,
} from "./types/types";
import defaultBanner from "./assets/images/default_banner.png";

// Links
export const CUSTOM_BACKEND_URL = "https://munsuite-backend.onrender.com";
export const LINCOLN_LINKEDIN =
  "https://www.linkedin.com/in/lincoln-seungha-lee/";
export const INQUIRY_EMAIL = "info@munsuite.com";
export const STRIPE_PURCHASE_LINK = "https://buy.stripe.com/bIY8z09RUfnPg0MeUU";

// Blank Types
export const BLANK_DELEGATIONS: Delegate[] = [];
export const BLANK_FORM: Question[] = [];
export const BLANK_PENDINGS: Directive[] = [];
export const BLANK_PROCESSED: Directive[] = [];
export const BLANK_NOTES: Notes = {
  individual: [],
  quick: "",
};
export const BLANK_SETTINGS: Settings = {
  conference: "MUNSuite",
  committee: "Committee",
  formOpen: true,
  standardForm: true,
};

export const BLANK_APPDATA: FirebaseDataStaff = {
  delegations: BLANK_DELEGATIONS,
  form: BLANK_FORM,
  pendings: BLANK_PENDINGS,
  processed: BLANK_PROCESSED,
  notes: BLANK_NOTES,
  settings: BLANK_SETTINGS,
};

export const BLANK_STAFF_ACCOUNT_INFO: StaffAccountInfo = {
  type: AccountType.Starter,
  expiration: "Error",
  email: null,
};

export const BLANK_HOST_ACCOUNT_INFO: StaffAccountInfo = {
  type: AccountType.Premium,
  expiration: "Error",
  email: null,
};

export const BLANK_STAFFAPI: StaffAPI = {
  userID: null,
  page: StaffPageKey.Delegations,
  setPage: (p) => {},
  accountInfo: BLANK_STAFF_ACCOUNT_INFO,
  setAccountInfo: (i) => {},
};

export const BLANK_DELEGATEAPI: DelegateAPI = {
  user: null,
  setUser: (u) => {},
  hostAccountInfo: BLANK_HOST_ACCOUNT_INFO,
};

// Plan Details
export const MAX_SUBMISSIONS = 100;

export const STARTER_FEATURES = [
  `Store up to ${MAX_SUBMISSIONS} submissions`,
  "Email support",
];

export const PREMIUM_FEATURES = [
  "Unlimited submissions storage",
  "Spreadsheet import delegates",
  "Export directives history & notes to csv",
  "Remove starter banner",
];

// Misc
export const DELCODE_LENGTH = 5;

// Default Form Fields
export const DEFAULT_OPTIONS = ["Option 1", "Option 2", "Option 3"];

export const DEFAULT_QTYPE_LABELS = {
  [QT.ShortText]: "Short Text",
  [QT.LongText]: "Long Text",
  [QT.Radio]: "Radio",
  [QT.MultipleChoice]: "Multiple Choice",
  [QT.SelectMultiple]: "Select Multiple",
  [QT.Dropdown]: "Dropdown",
  [QT.Content]: "Content Block",
  [QT.Header]: "Header",
};

export const DEFAULT_FORM_BASES: Record<QT, Object> = {
  header: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.Header]}`,
    imgLink: defaultBanner,
    imgName: "Default Banner",
    imgPath: "",
  },
  radio: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.Radio]}`,
    options: DEFAULT_OPTIONS,
  },
  multiplechoice: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.MultipleChoice]}`,
    options: DEFAULT_OPTIONS,
  },
  content: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.Content]}`,
    content: [
      {
        type: "image",
        heading: "Image Heading",
        value: defaultBanner,
        imgName: "Default Image",
        path: "",
      },
      {
        type: "text",
        heading: "Text Heading",
        value:
          "I am a body of text. Enter directions or descriptive information here!",
      },
    ],
  },
  shorttext: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.ShortText]}`,
    maxchars: false,
  },
  longtext: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.LongText]}`,
    maxchars: false,
  },
  dropdown: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.Dropdown]}`,
    options: DEFAULT_OPTIONS,
  },
  "select-multiple": {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.SelectMultiple]}`,
    options: DEFAULT_OPTIONS,
    max: false,
  },
};

export const DirectiveTitleLbl = "Directive Title";
export const DirectiveTypeLbl = "Directive Type";
export const SponsorsLbl = "Sponsors";
export const SignatoriesLbl = "Signatories";
