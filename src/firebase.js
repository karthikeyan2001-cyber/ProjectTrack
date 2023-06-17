import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
//import firebase from 'firebase/compat/app';
import { getFirestore,collection ,doc,setDoc} from "firebase/firestore";
import firebaseConfig from "./firebaseconfig";
import 'firebase/firestore';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
export const registerWithEmailAndPassword = createUserWithEmailAndPassword;
export const loginWithEmailAndPassword=signInWithEmailAndPassword;
export {collection,doc,firestore,auth};
export default app;








