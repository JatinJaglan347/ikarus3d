import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Replace with your Firebase credentials
const firebaseConfig = {
    apiKey: "AIzaSyBefzcYUG7HBHS0WY1cU_pu4d5lA5LK3M0",
    authDomain: "ikraus3d.firebaseapp.com",
    projectId: "ikraus3d",
    storageBucket: "ikraus3d.firebasestorage.app",
    messagingSenderId: "575370284299",
    appId: "1:575370284299:web:6dfbfff0b525e4f6de260e",
    measurementId: "G-0K2B4ZQH24"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs };
