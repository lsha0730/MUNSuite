import { FirebaseApp } from "firebase/app";
import { Auth, User } from "firebase/auth";
import { createContext } from "react";

interface AppContext {
  app: FirebaseApp;
  auth: Auth;
  user: User;
  signOut: () => void;
  isPortrait: boolean;
}

// TODO: Add type declarations for del and staff contexts
export const appContext = createContext<AppContext | null>(null);
export const delegateContext = createContext({});
export const staffContext = createContext({});
