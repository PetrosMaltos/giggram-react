// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR-ViuYKvxtuCfPDZwq2DHsHby9B4NPC0",
  authDomain: "giggram-4aa20.firebaseapp.com",
  projectId: "giggram-4aa20",
  storageBucket: "giggram-4aa20.appspot.com",
  messagingSenderId: "299723601231",
  appId: "1:299723601231:web:039f135c8fc9ce541c813a",
  measurementId: "G-5865DYTVB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot };
