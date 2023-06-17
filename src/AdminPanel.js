import React, { useState } from 'react';

import { auth, firestore } from './firebase';
import { registerWithEmailAndPassword } from './firebase';
import firebase from 'firebase/app';

import {collection,doc,setDoc} from 'firebase/firestore';
function AdminPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleRegister = async (e) => {
        e.preventDefault();
      
        try {
          const { user } = await registerWithEmailAndPassword(auth, email, password);
      
          if (user) {
         
           //  const docRef = firestore.collection('admins').doc(user.uid);
           console.log('User UID:', user.uid);
         // const docRef = collection(firestore, "admins",user.uid, "registration");
          //const docRef=collection("app").document("users").collection(uid);
          // const docRef = firestore.doc(`admins/${user.uid}`);
            // await setDoc({
            //   email: user.email,
            // });
            setDoc(doc(firestore, "admins", user.uid), {
             
              email: user.email,
              user:user.uid,
         
          }).then(() => {
                  alert("Registered successfully");
              })
              .catch(error => {
                  alert(error.message);
              });
            // const userData = {
            //   email: user.email,
            //   // Add any additional properties you want to set on the document
            // };
      
            // await setDoc(docRef, userData);
      
            console.log('Registration successful!');
          }
        } catch (error) {
          console.error('Error registering admin:', error);
        }
      };
      

    return (
        <div>
            <h2>Admin Registration</h2>
            <form onSubmit={handleRegister}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default AdminPanel;
