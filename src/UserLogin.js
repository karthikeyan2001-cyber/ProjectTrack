import React, { useState } from 'react';
import { auth,firestore } from './firebase';
import {collection,doc,setDoc,getDoc} from 'firebase/firestore';
import { loginWithEmailAndPassword } from './firebase';
import { useNavigate } from 'react-router';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user } = await loginWithEmailAndPassword(auth,email, password);
     
      const adminSnapshot = await getDoc(doc(firestore, 'users', user.uid));
      if (adminSnapshot.exists()) {
        navigate("/user/portal");
        console.log('User login successful');
  
      } else {
 
        console.log('Invalid user credentials/not an user');
       
      }
     // console.log('User login successful');

      
    } catch (error) {
      console.error('Error logging in as user:', error);
    }
  };
  // const navigate=useNavigate();
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await loginWithEmailAndPassword(auth,email, password);
  //     navigate("/user/portal");
  //     // Login successful, do something (e.g., redirect to user profile)
  //   } catch (error) {
  //     console.error('Error logging in as user:', error);
  //   }
  // };

  return (
    <div>
      <h2>User Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
