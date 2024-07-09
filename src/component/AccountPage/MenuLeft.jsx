import React, { useState } from 'react';
import './MenuLeft.scss';

const MenuLeft = ({ onSelect }) => {
  const [selectedButton, setSelectedButton] = useState(null); 

  const handleButtonClick = (value) => {
    onSelect(value);
    setSelectedButton(value);
  };

  return (
    <div className="menu-left">
      <button 
        className={`menu-button ${selectedButton === 'all' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('all')}
      >
        Tất cả
      </button>
      <button 
        className={`menu-button ${selectedButton === 'merchant' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('merchant')}
      >
        Merchant
      </button>
      <button 
        className={`menu-button ${selectedButton === 'user' ? 'active' : ''}`} 
        onClick={() => handleButtonClick('user')}
      >
        User
      </button>
    </div>
  );
};

export default MenuLeft;