// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT6V1o5TFU9QVbbIG5X2B389ZtHIMmmUI",
  authDomain: "email-password-login-16d10.firebaseapp.com",
  projectId: "email-password-login-16d10",
  storageBucket: "email-password-login-16d10.firebasestorage.app",
  messagingSenderId: "966528304587",
  appId: "1:966528304587:web:006130ba796990beede24e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);