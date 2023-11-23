// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnFZjSIO0g5a530gl6NIly8oSnemMg7_k",
  authDomain: "idea-5a667.firebaseapp.com",
  projectId: "idea-5a667",
  storageBucket: "idea-5a667.appspot.com",
  messagingSenderId: "451529654960",
  appId: "1:451529654960:web:ce7b345e7ef5b48009b175",
  measurementId: "G-00C53HFF3E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);