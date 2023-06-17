import React, { useState } from 'react';
import { auth, firestore } from './firebase';
import { registerWithEmailAndPassword } from './firebase';
// import firebase from 'firebase/app';

import {collection,doc,setDoc} from 'firebase/firestore';
const UserPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const { user } = await registerWithEmailAndPassword(auth, email, password);
  
      if (user) {
        console.log('User:', user);
        setDoc(doc(firestore, "users", user.uid), {
             
          email: user.email,
          user:user.uid,
     
      }).then(() => {
              alert("Registered successfully");
          })
          .catch(error => {
              alert(error.message);
          });
        // const docRef = firestore.collection('users').doc(user.uid);
  
        // await docRef.set({
        //   email: user.email,
        // });
  
        console.log('Registration successful!');
      }
    } catch (error) {
      console.error('Error registering admin:', error);
    }
  };
  

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserPanel;
