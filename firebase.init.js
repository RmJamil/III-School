// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANZjcOMtJZfj8QZN-ZI3lMcuAZcyIkyyQ",
  authDomain: "edumanage-7ea3c.firebaseapp.com",
  projectId: "edumanage-7ea3c",
  storageBucket: "edumanage-7ea3c.firebasestorage.app",
  messagingSenderId: "946741759267",
  appId: "1:946741759267:web:0bd452e5d6fe4c149ad096"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export default app;