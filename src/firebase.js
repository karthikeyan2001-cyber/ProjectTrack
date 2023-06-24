import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
//import firebase from 'firebase/compat/app';
import { getFirestore,collection ,doc,setDoc} from "firebase/firestore";
import firebaseConfig from "./firebaseconfig";
import 'firebase/firestore';



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
export const registerWithEmailAndPassword = createUserWithEmailAndPassword;
export const loginWithEmailAndPassword=signInWithEmailAndPassword;
export {collection,doc,firestore,auth};
export default app;








