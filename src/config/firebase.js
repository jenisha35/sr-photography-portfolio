import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ FIXED
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCpq8_Tx2Khq8fkGMBdvkvekq8k3XUuvhw",
  authDomain: "sr-photography-7b499.firebaseapp.com",
  databaseURL: "https://sr-photography-7b499-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ REQUIRED!
  projectId: "sr-photography-7b499",
  storageBucket: "sr-photography-7b499.appspot.com", // ✅ fixed
  messagingSenderId: "1044365303201",
  appId: "1:1044365303201:web:069bb59e152d1fc0b1bfe0",
  measurementId: "G-7XKSX4MZ64"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
