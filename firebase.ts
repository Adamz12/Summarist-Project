import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYAnmNwG15QBeawMdYBe_Kxd4WeGrGMcQ",
  authDomain: "summarist-project.firebaseapp.com",
  projectId: "summarist-project",
  storageBucket: "summarist-project.appspot.com",
  messagingSenderId: "324305981099",
  appId: "1:324305981099:web:4a19d2e8849fb19a03f1ee",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export default app;
export { auth, db, googleProvider };
