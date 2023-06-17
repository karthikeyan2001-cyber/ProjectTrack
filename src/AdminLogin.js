import React, { useState } from 'react';
import { auth,firestore } from './firebase';
import { loginWithEmailAndPassword } from './firebase';
import { useNavigate } from 'react-router';
import {collection,doc,setDoc,getDoc} from 'firebase/firestore';
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user } = await loginWithEmailAndPassword(auth,email, password);
     
      const adminSnapshot = await getDoc(doc(firestore, 'admins', user.uid));
      if (adminSnapshot.exists()) {
        navigate("/admin/portal");
        console.log('Admin login successful');
  
      } else {
 
        console.log('Invalid admin credentials/not an admin');
       
      }
     // console.log('User login successful');

      
    } catch (error) {
      console.error('Error logging in as user:', error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
