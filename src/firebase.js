// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsHhsPVmgxZuJoiZYsww8a7UQ7DP45pO4",
  authDomain: "auth-app-bf2a4.firebaseapp.com",
  projectId: "auth-app-bf2a4",
  storageBucket: "auth-app-bf2a4.firebasestorage.app",
  messagingSenderId: "359785361094",
  appId: "1:359785361094:web:468ed1a5d336a5b2c7b1c7",
  measurementId: "G-M2M9MWLZNV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
