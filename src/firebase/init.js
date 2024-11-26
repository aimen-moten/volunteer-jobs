// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs3cK7Mwr4zeCROXvgimZBCDxo5RO2KV0",
  authDomain: "csc340-volunteer-b2ad9.firebaseapp.com",
  projectId: "csc340-volunteer-b2ad9",
  storageBucket: "csc340-volunteer-b2ad9.firebasestorage.app",
  messagingSenderId: "258937622614",
  appId: "1:258937622614:web:83a180f98c7258ff18abf7",
  measurementId: "G-8BNH4LL8MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };