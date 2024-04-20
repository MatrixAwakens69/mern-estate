// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-estate-badf1.firebaseapp.com",
  projectId: "mern-estate-badf1",
  storageBucket: "mern-estate-badf1.appspot.com",
  messagingSenderId: "841930600078",
  appId: "1:841930600078:web:fdc8967bb991750198a3df",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
