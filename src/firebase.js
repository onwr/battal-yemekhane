import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxe5kmXD8ClLs8TOF84h6e0BMNZVCs0u0",
  authDomain: "battalyemekhane.firebaseapp.com",
  projectId: "battalyemekhane",
  storageBucket: "battalyemekhane.appspot.com",
  messagingSenderId: "391702591939",
  appId: "1:391702591939:web:8dcc6498506d02a054a576",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
