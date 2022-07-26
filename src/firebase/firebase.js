import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD-PzWjX55I8Ik91QLmdYK-Nxj2F_leZ0Y",
  authDomain: "qlsvonechain-56845.firebaseapp.com",
  projectId: "qlsvonechain-56845",
  storageBucket: "qlsvonechain-56845.appspot.com",
  messagingSenderId: "144384087280",
  appId: "1:144384087280:web:340ba5efd7fddbdec6de35",
  measurementId: "G-C1Q7Z4RYF7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const storage = firebase.storage()

export default db;