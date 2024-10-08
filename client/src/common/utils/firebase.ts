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
import { FBStorageFolder, FirebaseDataTarget } from "../types/types";
import { filterFalsies } from "./utils";
import { BLANK_APPDATA } from "../constants";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref as storageref,
  uploadBytes,
} from "firebase/storage";
import { ChangeEvent } from "react";
import { v4 as uuid } from "uuid";
import { File } from "../types/questionTypes";

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
  const firebaseConfig = JSON.parse(
    process.env.REACT_APP_FIREBASE_CONFIG || "{}"
  );
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

export async function firebaseUpload(
  file: Blob | Uint8Array | ArrayBuffer,
  location: string
) {
  const storage = getStorage();
  await uploadBytes(storageref(storage, location), file);
  const url = await getDownloadURL(storageref(storage, location));

  return url;
}

export async function firebaseDelete(location: string) {
  const storage = getStorage();
  await deleteObject(storageref(storage, location));
}

export async function firebaseUploadOnChange(
  e: ChangeEvent<HTMLInputElement>,
  userID: string,
  folder: FBStorageFolder
) {
  if (!e.target.files?.[0]) return;
  const file = e.target.files[0];
  const fileID = uuid();
  const location = `appdata/${userID}/livedata/${folder}/${fileID}.${file.type.slice(
    6
  )}`;
  const url = await firebaseUpload(file, location);

  return {
    name: file.name,
    link: url,
    path: location,
  } as File;
}
