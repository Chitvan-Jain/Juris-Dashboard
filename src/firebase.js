import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqg3jCBhHOqpXv1XGkc4sH4zra4jQ5UF4",
  authDomain: "juris-maximo-229c8.firebaseapp.com",
  projectId: "juris-maximo-229c8",
  storageBucket: "juris-maximo-229c8.firebasestorage.app",
  messagingSenderId: "733262969618",
  appId: "1:733262969618:web:3b6c63106fb17b3f1e91cb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
