import React, { useState } from 'react';
import './FormComp.css';

import {collection,doc,setDoc} from 'firebase/firestore';
import { auth,firestore } from './firebase';
import firebase from 'firebase/compat/app';
const FormComponent = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const handleSubmit =async (e) => {
    // e.preventDefault();
    // // Perform form submission logic here
    // // You can access the form field values (name, description, startDate, endDate) here
    // console.log('Submitted:', { name, description, startDate, endDate });
    // // Reset form fields

    // setName('');
    // setDescription('');
    // setStartDate('');
    // setEndDate('');
    // setIsFormOpen(false);
    e.preventDefault();
    const user=auth.currentUser;
    console.log("inside handlesubmit");
    try {
      const formData = {
        name: name,
        email: user.email,
        ID : user.uid,
        description: description,
        startDate : startDate,
        endDate : endDate,
      };
  
      // Get a reference to the Firestore collection named "admins"
      const adminsCollection = collection(firestore, "admins");
  
      // Create a new document with a unique ID
      const adminDoc = doc(adminsCollection);
  
      // Set the document data while preserving existing fields
      await setDoc(adminDoc, formData, { merge: true });
      setName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setIsFormOpen(false);
      // Show success alert
    alert("Success");
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
            <span className="close" onClick={toggleForm}>&times;</span>
            <form onSubmit={handleSubmit}>
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
