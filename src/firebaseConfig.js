// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//for  google authentication
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxYDLFUj8o8MV2ZnDcLOSg22zLPel-7ZM",
  authDomain: "chatapp-63371.firebaseapp.com",
  projectId: "chatapp-63371",
  storageBucket: "chatapp-63371.appspot.com",
  messagingSenderId: "719510023795",
  appId: "1:719510023795:web:e81d94ab5ba0e16f87c406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
//Connection to Firebase DB
export const db = getFirestore(app);
