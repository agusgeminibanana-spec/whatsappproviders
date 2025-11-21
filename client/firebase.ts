// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtVj27tqS7r2f5Mt7R3bseu8v3xJ2A30M",
  authDomain: "premium-ember-475717-c9.firebaseapp.com",
  databaseURL: "https://premium-ember-475717-c9-default-rtdb.firebaseio.com",
  projectId: "premium-ember-475717-c9",
  storageBucket: "premium-ember-475717-c9.firebasestorage.app",
  messagingSenderId: "1095959694703",
  appId: "1:1095959694703:web:3f542e72b638c58f536c9a",
  measurementId: "G-41CPKH23HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, googleProvider, db };
