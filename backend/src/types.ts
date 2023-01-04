export type RegistrationObject = {
  email: string;
  password: string;
  confirmPassword: string;
  confName: string;
  commName: string;
  productCode: string;
};

export type UserDataTarget =
  | "delegations"
  | "form"
  | "pendings"
  | "processed"
  | "notes"
  | "settings";

export type UTCString =
  `${string}-${string}-${string} ${string}:${string}:${string} UTC`;

export type CodesLog = {
  [code: string]: UTCString;
};

export type OrderDetails = {
  timestamp: UTCString;
  checkoutID: string;
  customerID: string;
  paymentIntentID: string;
  email: string;
  name: string;
  country: string;
  paid: number; // 10.00 for $10.00
  currency: string;
  quantity: number;
};
