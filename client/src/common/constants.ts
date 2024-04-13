import { DelegateAPI } from "../delegate_side/DelegateApp";
import { StaffAPI, StaffAccountInfo } from "../staff_side/StaffApp";
import { Directive } from "./types/directiveTypes";
import {
  Question,
  QuestionTypes as QT,
  AllDelegations,
  File,
} from "./types/questionTypes";
import {
  FirebaseDataStaff,
  Delegate,
  Notes,
  Settings,
  AccountType,
  StaffPageKey,
  Option,
} from "./types/types";
import defaultBanner from "./assets/images/default_banner.png";

import { BsImages, BsTextLeft } from "react-icons/bs";
import {
  MdArrowDropDownCircle,
  MdCheckBox,
  MdOutlineRadioButtonChecked,
  MdShortText,
} from "react-icons/md";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FaHeading } from "react-icons/fa";
import { FC } from "react";
import { makeQuestion } from "./utils/utils";

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
export const DEFAULT_OPTIONS: Option[] = [
  {
    key: "op1",
    label: "Option 1",
  },
  {
    key: "op2",
    label: "Option 2",
  },
  {
    key: "op3",
    label: "Option 3",
  },
];

export const DEFAULT_QTYPE_LABELS: Record<QT, string> = {
  [QT.ShortText]: "Short Text",
  [QT.LongText]: "Long Text",
  [QT.Radio]: "Radio",
  [QT.MultipleChoice]: "Multiple Choice",
  [QT.SelectMultiple]: "Select Multiple",
  [QT.Dropdown]: "Dropdown",
  [QT.Content]: "Content Block",
  [QT.Header]: "Header",
};

export const QTYPE_ICONS: Record<QT, FC> = {
  [QT.ShortText]: MdShortText,
  [QT.LongText]: BsTextLeft,
  [QT.Radio]: MdOutlineRadioButtonChecked,
  [QT.MultipleChoice]: MdCheckBox,
  [QT.SelectMultiple]: BiSolidAddToQueue,
  [QT.Dropdown]: MdArrowDropDownCircle,
  [QT.Content]: BsImages,
  [QT.Header]: FaHeading,
};

export const DEFAULT_IMG_FILE: File = {
  link: defaultBanner,
  name: "Default Banner",
  path: "",
};

export const DEFAULT_FORM_BASES: Record<QT, Object> = {
  header: {
    heading: `New ${DEFAULT_QTYPE_LABELS[QT.Header]}`,
    image: DEFAULT_IMG_FILE,
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
        image: DEFAULT_IMG_FILE,
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

export const STANDARD_FORM_START = [
  makeQuestion(QT.Header, true),
  makeQuestion(QT.ShortText, true, DirectiveTitleLbl),
  makeQuestion(QT.Radio, true, DirectiveTypeLbl),
  {
    ...makeQuestion(QT.SelectMultiple, true, SponsorsLbl),
    options: AllDelegations,
  },
  {
    ...makeQuestion(QT.SelectMultiple, false, SignatoriesLbl),
    options: AllDelegations,
  },
] as Question[];
