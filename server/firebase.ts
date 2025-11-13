import admin from "firebase-admin";

// Initialize Firebase Admin SDK
// Make sure you have the GOOGLE_APPLICATION_CREDENTIALS environment variable set.
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
} catch (error) {
  console.error("Firebase Admin initialization error:", error);
}

export const db = admin.firestore();
