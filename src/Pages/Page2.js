import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Page2.css';

function Page2() {
  const navigate = useNavigate();
  const location = useLocation();
  const authType = location.state?.authType || 'login';

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle authentication logic
    navigate('/store-selection');
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="page">
      <h2>{authType === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <label>Email:</label>
        <input type="email" required />
        <label>Password:</label>
        <input type="password" required />
        <button type="submit">Submit</button>
      </form>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default Page2;
