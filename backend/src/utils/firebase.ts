const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const auth = admin.auth();

module.exports = { db, auth };
