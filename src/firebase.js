import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDIvE--E4Lp9GNsr7Y1ku8oGtfkCkFV8Zk",
  authDomain: "yemekhane-bmtal.firebaseapp.com",
  projectId: "yemekhane-bmtal",
  storageBucket: "yemekhane-bmtal.appspot.com",
  messagingSenderId: "590746372522",
  appId: "1:590746372522:web:821fc56143672262ef03d3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
