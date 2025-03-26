// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJimvEOwf-4LOs9JcfTvu4l2ttiOEW7JU",
  authDomain: "ai-generator-99f57.firebaseapp.com",
  projectId: "ai-generator-99f57",
  storageBucket: "ai-generator-99f57.firebasestorage.app",
  messagingSenderId: "791297965248",
  appId: "1:791297965248:web:e3f73eadd6edfd98b08125",
  measurementId: "G-LNHB0GKCYZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);