import * as admin from 'firebase-admin';

let app: admin.app.App;

export const initializeFirebase = () => {
  if (!app) {
    app = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }
  return app;
};

export const db = () => {
  if (!app) initializeFirebase();
  return admin.firestore();
};
