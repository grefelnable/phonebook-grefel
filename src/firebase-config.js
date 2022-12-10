import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr6YXxfwuu3fXEC1VEjuopym_9tVOFUv0",
  authDomain: "general-database-3e377.firebaseapp.com",
  projectId: "general-database-3e377",
  storageBucket: "general-database-3e377.appspot.com",
  messagingSenderId: "278520692418",
  appId: "1:278520692418:web:87fb8739e27c581179455b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
