// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "armarch-cms.firebaseapp.com",
  projectId: "armarch-cms",
  storageBucket: "armarch-cms.appspot.com",
  messagingSenderId: "141097870431",
  appId: "1:141097870431:web:4543050b83ea915a64a7ea",
  measurementId: "G-DHDMVTB0BR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);