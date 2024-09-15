import React from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="header-buttons">
      <DarkModeToggle />
      <button className="profile-btn" onClick={goToProfile}>
        Profile
      </button>
    </div>
  );
}

export default Header;
