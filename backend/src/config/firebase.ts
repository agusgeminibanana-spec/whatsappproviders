import * as admin from 'firebase-admin';

let app: admin.app.App | undefined;

export const initializeFirebase = () => {
  if (app) return app;

  // If explicit Firebase service account vars are provided, use them (recommended for local dev)
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKeyRaw) {
    // In .env files you may need to escape newlines as \n
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
    try {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        } as any),
      });
      console.log('Initialized Firebase using FIREBASE_* environment variables.');
      return app;
    } catch (err) {
      console.warn('Failed to initialize Firebase with provided FIREBASE_* vars:', err);
    }
  }

  // Otherwise try Application Default Credentials (GOOGLE_APPLICATION_CREDENTIALS or ADC)
  try {
    app = admin.initializeApp();
    console.log('Initialized Firebase using Application Default Credentials (ADC).');
    return app;
  } catch (err) {
    console.warn('Firebase initialization failed (no credentials). Some features may be disabled.');
    return undefined as unknown as admin.app.App;
  }
};

export const db = () => {
  if (!app) initializeFirebase();
  if (app && typeof (admin as any).firestore === 'function') {
    return (admin as any).firestore();
  }
  console.warn('Firestore is not available. Returning undefined.');
  return undefined as any;
};
