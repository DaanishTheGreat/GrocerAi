import React from 'react';

function DarkModeToggle() {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
  };

  return (
    <button className="dark-mode-btn" onClick={toggleDarkMode}>
      Dark Mode
    </button>
  );
}

export default DarkModeToggle;
