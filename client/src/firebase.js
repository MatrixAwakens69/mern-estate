// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d23b1.firebaseapp.com",
  projectId: "mern-estate-d23b1",
  storageBucket: "mern-estate-d23b1.appspot.com",
  messagingSenderId: "409484307125",
  appId: "1:409484307125:web:4c604f2b5bf05b5b8b6cfc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
