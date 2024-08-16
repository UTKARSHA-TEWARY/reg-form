// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBEQzKkhG4X_g0M_yzl7cLe8u77HmjzEkA",
  authDomain: "regform-c04cf.firebaseapp.com",
  projectId: "regform-c04cf",
  storageBucket: "regform-c04cf.appspot.com",
  messagingSenderId: "1073666455404",
  appId: "1:1073666455404:web:06bebad9f20b83250fe549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };



