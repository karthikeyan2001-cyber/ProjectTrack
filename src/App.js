import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import UserPanel from './UserPanel';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import LandingPage from './LandingPage';
import UserPortal from './UserPortal';
import AdminPortal from './AdminPortal';
import FormComponent from './FormComponent';
const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
        <Route path="/admin/register" element={<AdminPanel />} />
        <Route path="/user/register" element={<UserPanel />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/admin/portal"
          element={<AdminPortal isAdminLoggedIn={isAdminLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} />}
        />
        <Route
          path="/admin/proj"
          element={
            isAdminLoggedIn ? <FormComponent /> : <Navigate to="/admin/portal" />
          }
        />
        {/* <Route path="/admin/portal" element={<AdminPortal />} />
        <Route path="/admin/proj" element={<FormComponent />} /> */}
        <Route path="/user/portal" element={<UserPortal />} />
      </Routes>
    </Router>
  );
};

export default App;
