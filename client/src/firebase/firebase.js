// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyBNSgiipULPWiIRkZ9IMJKBVyM073biQ0k",
  authDomain: "fb-pickbook-otp.firebaseapp.com",
  projectId: "fb-pickbook-otp",
  storageBucket: "fb-pickbook-otp.appspot.com",
  messagingSenderId: "563425330032",
  appId: "1:563425330032:web:e1917996019f87281485b5",
  measurementId: "G-HQQNHZWC7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);


export { auth };
