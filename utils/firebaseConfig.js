// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "portfolio-crafter.firebaseapp.com",
  projectId: "portfolio-crafter",
  storageBucket: "portfolio-crafter.firebasestorage.app",
  messagingSenderId: "957740650560",
  appId: "1:957740650560:web:d3ec42cb607771a49a4fa5",
  measurementId: "G-97KSVPPQ5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app);