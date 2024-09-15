import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page1.css';

function Page1() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/auth', { state: { authType: 'login' } });
  };

  const goToSignup = () => {
    navigate('/auth', { state: { authType: 'signup' } });
  };

  return (
    <div className="page">
      <h2>Welcome to the Shopping App</h2>
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToSignup}>Sign Up</button>
    </div>
  );
}

export default Page1;
