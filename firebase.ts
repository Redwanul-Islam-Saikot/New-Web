import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrPv1nw-YHa3F27lXMy330ZXqmdiBcDFg",
  authDomain: "weather-admin-app-924af.firebaseapp.com",
  projectId: "weather-admin-app-924af",
  storageBucket: "weather-admin-app-924af.firebasestorage.app",
  messagingSenderId: "896148885284",
  appId: "1:896148885284:web:1c30d7c81271a6658ede41",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);