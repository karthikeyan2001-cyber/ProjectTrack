import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/compat/app'; // Update import statement
import 'firebase/compat/firestore'; // Add Firestore import
import 'firebase/compat/auth'; // Add Auth import
import App from './App'



ReactDOM.render(<App />, document.getElementById('root'));

