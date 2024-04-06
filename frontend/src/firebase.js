// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-2f9c7.firebaseapp.com",
  projectId: "mern-real-estate-2f9c7",
  storageBucket: "mern-real-estate-2f9c7.appspot.com",
  messagingSenderId: "185042484947",
  appId: "1:185042484947:web:a39e4b77e4ced2e6059e26",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
