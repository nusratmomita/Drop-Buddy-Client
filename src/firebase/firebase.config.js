// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvFIhPRF8ItzJgL84oBKirxRONiV9KQ-M",
  authDomain: "dropbuddy-67592.firebaseapp.com",
  projectId: "dropbuddy-67592",
  storageBucket: "dropbuddy-67592.firebasestorage.app",
  messagingSenderId: "758503569337",
  appId: "1:758503569337:web:1a8e4dd289bb5a7cca2868"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);