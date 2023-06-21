import React, { useState, useEffect } from 'react';
import './FormComp.css';

import { collection, doc, setDoc, query, getDocs } from 'firebase/firestore';
import { auth, firestore } from './firebase';
import firebase from 'firebase/compat/app';

const FormComponent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userEmails, setUserEmails] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');

  useEffect(() => {
    fetchUserEmails();
  }, []);

  const fetchUserEmails = async () => {
    try {
      const usersCollection = collection(firestore, 'users');
      const querySnapshot = await getDocs(usersCollection);
      const emails = querySnapshot.docs.map((doc) => doc.data().email);
      setUserEmails(emails);
    } catch (error) {
      console.error('Error fetching user emails:', error);
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setSelectedUserEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    console.log('inside handleSubmit');
    try {
      const formData = {
        name: name,
        users_email: selectedUserEmail,
        admin_email:user.email,
        ID: user.uid,
        description: description,
        startDate: startDate,
        endDate: endDate,
      };

      // Get a reference to the Firestore collection named "users"
      const usersCollection = collection(firestore, 'admins');

      // Create a new document with the logged-in user's ID as the document ID
      const userDoc = doc(usersCollection, user.uid);

      // Get a reference to the "projects" collection within the user's document
      const projectsCollection = collection(userDoc, 'projects');

      // Create a new document with a unique ID within the "projects" collection
      const projectDoc = doc(projectsCollection);

      // Set the document data while preserving existing fields
      await setDoc(projectDoc, formData);

      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setSelectedUserEmail('');
      setIsFormOpen(false);

      // Show success alert
      alert('Success');
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div>
      <button onClick={toggleForm}>Open Form</button>
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleForm}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                User Email:
                <select value={selectedUserEmail} onChange={handleUserEmailChange}>
                  <option value="">Select an email</option>
                  {userEmails.map((email, index) => (
                    <option key={index} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                Name:
                <input type="text" value={name} onChange={handleNameChange} />
              </label>
              <br />
              <label>
                Description:
                <textarea value={description} onChange={handleDescriptionChange} />
              </label>
              <br />
              <label>
                Start Date:
                <input type="date" value={startDate} onChange={handleStartDateChange} />
              </label>
              <br />
              <label>
                End Date:
                <input type="date" value={endDate} onChange={handleEndDateChange} />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;

// import React, { useState } from 'react';
// import './FormComp.css';

// import { collection, doc, setDoc } from 'firebase/firestore';
// import { auth, firestore } from './firebase';
// import firebase from 'firebase/compat/app';

// const FormComponent = () => {
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   const toggleForm = () => {
//     setIsFormOpen(!isFormOpen);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const user = auth.currentUser;
//     console.log('inside handleSubmit');
//     try {
//       const formData = {
//         name: name,
//         email: user.email,
//         ID: user.uid,
//         description: description,
//         startDate: startDate,
//         endDate: endDate,
//       };

//       // Get a reference to the Firestore collection named "users"
//       const usersCollection = collection(firestore, 'admins');

//       // Create a new document with the logged-in user's ID as the document ID
//       const userDoc = doc(usersCollection, user.uid);

//       // Get a reference to the "projects" collection within the user's document
//       const projectsCollection = collection(userDoc, 'projects');

//       // Create a new document with a unique ID within the "projects" collection
//       const projectDoc = doc(projectsCollection);

//       // Set the document data while preserving existing fields
//       await setDoc(projectDoc, formData);

//       setName('');
//       setDescription('');
//       setStartDate('');
//       setEndDate('');
//       setIsFormOpen(false);

//       // Show success alert
//       alert('Success');
//     } catch (error) {
//       console.error('Error adding document:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={toggleForm}>Open Form</button>
//       {isFormOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={toggleForm}>
//               &times;
//             </span>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Name:
//                 <input type="text" value={name} onChange={handleNameChange} />
//               </label>
//               <br />
//               <label>
//                 Description:
//                 <textarea value={description} onChange={handleDescriptionChange} />
//               </label>
//               <br />
//               <label>
//                 Start Date:
//                 <input type="date" value={startDate} onChange={handleStartDateChange} />
//               </label>
//               <br />
//               <label>
//                 End Date:
//                 <input type="date" value={endDate} onChange={handleEndDateChange} />
//               </label>
//               <br />
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FormComponent;

