import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
//import firebase from 'firebase/compat/app';
import { getFirestore,collection ,doc,setDoc} from "firebase/firestore";

import 'firebase/firestore';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB25kjHxbafmCoyhw-8o93tNbD4LhFPmmA",
  authDomain: "proj-track-13a07.firebaseapp.com",
  projectId: "proj-track-13a07",
  storageBucket: "proj-track-13a07.appspot.com",
  messagingSenderId: "1050433347813",
  appId: "1:1050433347813:web:493fc595ae8dae0e38740c",
  measurementId: "G-H3DN2CX4MC"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
export const registerWithEmailAndPassword = createUserWithEmailAndPassword;
export const loginWithEmailAndPassword=signInWithEmailAndPassword;
export {collection,doc,firestore,auth};
export default app;








