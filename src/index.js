import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app'; // Update import statement
import 'firebase/compat/firestore'; // Add Firestore import
import 'firebase/compat/auth'; // Add Auth import
import App from './App'

// const firebaseConfig = {
//   apiKey: "AIzaSyB08LL4gMSzxYtWNbZO-F-rfHGHzfbRPt0",
//   authDomain: "proj-tracker-8776e.firebaseapp.com",
//   projectId: "proj-tracker-8776e",
//   storageBucket: "proj-tracker-8776e.appspot.com",
//   messagingSenderId: "370402248328",
//   appId: "1:370402248328:web:cb38b369faccad4246013d",
//   measurementId: "G-PDT0VK04ZE"
// };
// firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

