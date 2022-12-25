"use strict";
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://munsuite-d1d0c-default-rtdb.firebaseio.com",
});
// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const auth = admin.auth();
module.exports = { db, auth };
