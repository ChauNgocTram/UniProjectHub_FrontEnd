import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAUe-4qERWwrX00R6a8ngDUgoMbxO3sgl0",
  authDomain: "apn-uniprojecthub.firebaseapp.com",
  projectId: "apn-uniprojecthub",
  storageBucket: "apn-uniprojecthub.appspot.com",
  messagingSenderId: "748202904725",
  appId: "1:748202904725:web:3e4d50879a327505169f9c",
  measurementId: "G-SF1S5DSNMF"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
//export const storage = getStorage();
//export const db = getFirestore();

