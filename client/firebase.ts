import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtVj27tqS7r2f5Mt7R3bseu8v3xJ2A30M",
  authDomain: "premium-ember-475717-c9.firebaseapp.com",
  databaseURL: "https://premium-ember-475717-c9-default-rtdb.firebaseio.com",
  projectId: "premium-ember-475717-c9",
  storageBucket: "premium-ember-475717-c9.firebasestorage.app",
  messagingSenderId: "1095959694703",
  appId: "1:1095959694703:web:2062ad88423815b3536c9a",
  measurementId: "G-5M7XBTKGS0"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, googleProvider, db };
