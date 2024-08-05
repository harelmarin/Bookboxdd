import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzqcWTToycq456nkmTfcjNp-8aCeJEQjk",
  authDomain: "bookbox-9f0ec.firebaseapp.com",
  projectId: "bookbox-9f0ec",
  storageBucket: "bookbox-9f0ec.appspot.com",
  messagingSenderId: "511890094962",
  appId: "1:511890094962:web:66c6c3e0d1b1754e5f3beb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
