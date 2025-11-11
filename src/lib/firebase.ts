// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDphdKGm0vDOqadfJm8VRJCwyxELMb0ScI",
  authDomain: "realestate-insights-app.firebaseapp.com",
  projectId: "studio-9718007109-7754b",
  storageBucket: "studio-9718007109-7754b.appspot.com",
  messagingSenderId: "16298081463",
  appId: "1:16298081463:web:4d5d41315846a7e02d6132"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
