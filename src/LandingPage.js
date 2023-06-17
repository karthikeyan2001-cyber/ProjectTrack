import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <div>
        <Link to="/admin/register">
          <button>Admin</button>
        </Link>
        <Link to="/user/register">
          <button>User</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
