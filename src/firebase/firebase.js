import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyCmoFsPOWBnO0NsWQ65YosfxJTB7CIqZSo",
//   authDomain: "onechain-c0e66.firebaseapp.com",
//   projectId: "onechain-c0e66",
//   storageBucket: "onechain-c0e66.appspot.com",
//   messagingSenderId: "777431754707",
//   appId: "1:777431754707:web:d8be21e2c5a7f6619f3126",
//   measurementId: "G-BJZ0PJ6LDW"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBuxSgDJpgZlbclGMnw3WEoxVx7slrNm3Q",
  authDomain: "qlsvonechain.firebaseapp.com",
  projectId: "qlsvonechain",
  storageBucket: "qlsvonechain.appspot.com",
  messagingSenderId: "395102729332",
  appId: "1:395102729332:web:e7cb8630a4d130c4e78d21",
  measurementId: "G-QG68VTW1LY"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const storage = firebase.storage()

export default db;