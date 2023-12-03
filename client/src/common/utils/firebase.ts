import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth, signOut } from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router-dom";

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
