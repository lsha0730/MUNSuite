import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import React, { createContext } from "react";
import { AccountType, FirebaseData } from "./types/types";
import { StaffAppAPI } from "../staff_side/StaffApp";
import { BLANK_APPDATA, BLANK_STAFFAPPAPI } from "./constants";
import { Database } from "firebase/database";
import { Analytics } from "firebase/analytics";

interface AppContext {
  firebaseAPI: {
    app: FirebaseApp | null;
    auth: Auth | null;
    database: Database | null;
    analytics: Analytics | null;
    user: User | null;
  };
  isPortrait: boolean;
}
const DEFAULT_APPCONTEXT = {
  firebaseAPI: {
    app: null,
    auth: null,
    database: null,
    analytics: null,
    user: null
  },
  isPortrait: false,
};

interface StaffContext {
  staffAppAPI: StaffAppAPI;
  firebaseData: FirebaseData;
}
const DEFAULT_STAFFCONTEXT: StaffContext = {
  staffAppAPI: BLANK_STAFFAPPAPI,
  firebaseData: BLANK_APPDATA,
};

// TODO: Add type declarations for del and staff contexts
export const appContext = createContext<AppContext>(DEFAULT_APPCONTEXT);
export const staffContext = createContext<StaffContext>(DEFAULT_STAFFCONTEXT);
export const delegateContext = createContext<any>({});
