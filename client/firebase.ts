
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "premium-ember-475717-c9",
  appId: "1:1095959694703:web:63f45d993a502db6536c9a",
  databaseURL: "https://premium-ember-475717-c9-default-rtdb.firebaseio.com",
  storageBucket: "premium-ember-475717-c9.firebasestorage.app",
  apiKey: "AIzaSyCtVj27tqS7r2f5Mt7R3bseu8v3xJ2A30M",
  authDomain: "premium-ember-475717-c9.firebaseapp.com",
  messagingSenderId: "1095959694703"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
