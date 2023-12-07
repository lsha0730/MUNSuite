import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import React, { createContext } from "react";
import { FirebaseData } from "./types/types";
import { StaffAPI } from "../staff_side/StaffApp";
import { BLANK_APPDATA, BLANK_STAFFAPI } from "./constants";
import { Database } from "firebase/database";
import { Analytics } from "firebase/analytics";

interface AppContext {
  app: FirebaseApp | null;
  auth: Auth | null;
  database: Database | null;
  analytics: Analytics | null;
  user: User | null;
  isPortrait: boolean;
}
const DEFAULT_APPCONTEXT = {
  app: null,
  auth: null,
  database: null,
  analytics: null,
  user: null,
  isPortrait: false,
};

interface StaffContext {
  staffAPI: StaffAPI;
  firebaseData: FirebaseData;
}
const DEFAULT_STAFFCONTEXT: StaffContext = {
  staffAPI: BLANK_STAFFAPI,
  firebaseData: BLANK_APPDATA,
};

// TODO: Add type declarations for del and staff contexts
export const appContext = createContext<AppContext>(DEFAULT_APPCONTEXT);
export const staffContext = createContext<StaffContext>(DEFAULT_STAFFCONTEXT);
export const delegateContext = createContext<any>({});
