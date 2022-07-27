import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCfKS_wun8zAAJeYezVtgRQaeWfOHqw33c",
  authDomain: "onchain-7c3cc.firebaseapp.com",
  databaseURL: "https://onchain-7c3cc-default-rtdb.firebaseio.com",
  projectId: "onchain-7c3cc",
  storageBucket: "onchain-7c3cc.appspot.com",
  messagingSenderId: "258015701548",
  appId: "1:258015701548:web:e7857b20cbd09763af7f89",
  measurementId: "G-BTGVCQF3B5"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBuxSgDJpgZlbclGMnw3WEoxVx7slrNm3Q",
//   authDomain: "qlsvonechain.firebaseapp.com",
//   projectId: "qlsvonechain",
//   storageBucket: "qlsvonechain.appspot.com",
//   messagingSenderId: "395102729332",
//   appId: "1:395102729332:web:e7cb8630a4d130c4e78d21",
//   measurementId: "G-QG68VTW1LY"
// };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const storage = firebase.storage()

export default db;