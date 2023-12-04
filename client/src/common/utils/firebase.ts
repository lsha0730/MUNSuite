import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { Database, onValue, ref } from "firebase/database";
import { AppDataTarget } from "../types/types";
import { filterFalsies } from "./utils";

const DB_ARRAY_NODES = [
  AppDataTarget.Delegations,
  AppDataTarget.Form,
  AppDataTarget.Pendings,
  AppDataTarget.Processed,
];
const DB_OBJECT_NODES = [AppDataTarget.Notes, AppDataTarget.Settings];

const DB_DEFAULT_VALUES = {
  delegations: [],
  form: [],
  pendings: [],
  processed: [],
  notes: {
    individual: [],
    quick: "",
  },
  settings: {
    conference: "MUNSuite",
    committee: "Committee",
  },
};

/**
 * Sets up firebase functionality for the whole app.
 *
 * @returns The default app, analytics, auth objects Firebase returns upon setup.
 */
export function configureFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDlwJk3ZyuuQEz9xH71E16luTakuOBCfzg",
    authDomain: "munsuite-d1d0c.firebaseapp.com",
    databaseURL: "https://munsuite-d1d0c-default-rtdb.firebaseio.com",
    projectId: "munsuite-d1d0c",
    storageBucket: "munsuite-d1d0c.appspot.com",
    messagingSenderId: "679459991121",
    appId: "1:679459991121:web:dc8aadabadab0e13309270",
    measurementId: "G-41D98K4YRG",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();

  return { app, analytics, auth };
}

type Target = {
  target: AppDataTarget;
  onValue: (data: any[] | Record<string, any>) => void;
};

/**
 * Creates firebase realtime-database subscriptions for specified database nodes
 */
export function setUpFirebaseListeners(
  db: Database,
  baseURL: string,
  targets: Target[]
) {
  for (const { target, onValue: callback } of targets) {
    const dbRef = ref(db, `${baseURL}/${target}`);
    const isArrayNode = DB_ARRAY_NODES.includes(target);

    onValue(dbRef, (snapshot) => {
      const node = snapshot.val();
      const cleaned = isArrayNode
        ? filterFalsies(node || DB_DEFAULT_VALUES[target])
        : Object.assign(DB_DEFAULT_VALUES[target], node);
      callback(cleaned);
    });
  }
}
