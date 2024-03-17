// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhz2Y-y9jnDYxCu14mCEZbLOyY7yoWlvs",
  authDomain: "react-c4-38e53.firebaseapp.com",
  projectId: "react-c4-38e53",
  storageBucket: "react-c4-38e53.appspot.com",
  messagingSenderId: "168996228778",
  appId: "1:168996228778:web:5b7d21fe18898660f90ad3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app );
export const auth = getAuth(app);
