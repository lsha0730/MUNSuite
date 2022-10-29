const functions = require("firebase-functions");
import {initializeApp} from "firebase/app";
import {getDatabase, get, ref} from "firebase/database";

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
const db = getDatabase(app);

exports.validateProductCode = functions.https.onRequest((request, response) => {
  const inputCode = request.body.text;

  get(ref(db, "appdata/productCodes/valid"))
      .then((snapshot) => {
        if (snapshot.exists()) {
        // Validate code
          const codeIsValid = snapshot.val().includes(inputCode);
          response.send(codeIsValid);
        } else {
        // No codes available
          response.send(false);
        }
      })
      .catch((error) => {
        console.error(error);
        response.send(false);
      });
});
