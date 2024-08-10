// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-dd08a.firebaseapp.com",
  projectId: "real-estate-dd08a",
  storageBucket: "real-estate-dd08a.appspot.com",
  messagingSenderId: "5045886062",
  appId: "1:5045886062:web:8d3a2cbb83158582b01a7f"
};

// Debugging to check if API key is being loaded correctly
console.log(firebaseConfig.apiKey);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
