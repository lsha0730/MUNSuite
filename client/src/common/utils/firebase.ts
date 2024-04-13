import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  Database,
  getDatabase,
  onValue,
  ref as dbref,
  set,
} from "firebase/database";
import { FirebaseDataTarget } from "../types/types";
import { filterFalsies } from "./utils";
import { BLANK_APPDATA } from "../constants";
import {
  getDownloadURL,
  getStorage,
  ref as storageref,
  uploadBytes,
} from "firebase/storage";

const DB_ARRAY_NODES = [
  FirebaseDataTarget.Delegations,
  FirebaseDataTarget.Form,
  FirebaseDataTarget.Pendings,
  FirebaseDataTarget.Processed,
];
const DB_OBJECT_NODES = [FirebaseDataTarget.Notes, FirebaseDataTarget.Settings];

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
  const auth = getAuth();
  const database = getDatabase(app);
  const analytics = getAnalytics(app);

  return { app, auth, database, analytics };
}

type Target = {
  target: FirebaseDataTarget;
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
    const dbRef = dbref(db, `${baseURL}/${target}`);
    const isArrayNode = DB_ARRAY_NODES.includes(target);

    onValue(dbRef, (snapshot) => {
      const node = snapshot.val();
      const cleaned = isArrayNode
        ? filterFalsies(node || BLANK_APPDATA[target])
        : Object.assign(BLANK_APPDATA[target], node);
      callback(cleaned);
    });
  }
}

/**
 * Overwrites target node with the provided value
 */
export function firebaseWrite(
  db: Database,
  userID: string,
  target: FirebaseDataTarget,
  content: any
) {
  const dbRef = dbref(db, `appdata/${userID}/livedata/${target}`);
  set(dbRef, content);
}

export async function firebaseUpload(file: File, location: string) {
  const storage = getStorage();
  await uploadBytes(storageref(storage, location), file);
  const url = await getDownloadURL(storageref(storage, location));

  return url;
}
