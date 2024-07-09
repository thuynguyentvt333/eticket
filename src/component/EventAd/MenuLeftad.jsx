import React from 'react';
import './MenuLeftad.scss'; 

const MenuLeftad = ({ onSelect, selectedView }) => { 
  return (
    <div className="menu-left">
      <button 
        className={`menu-button ${selectedView === 'pendingApproval' ? 'active' : ''}`} 
        onClick={() => onSelect('pendingApproval')}
      >
        Chờ phê duyệt
      </button>

      <button 
        className={`menu-button ${selectedView === 'allEvents' ? 'active' : ''}`} 
        onClick={() => onSelect('allEvents')}
      >
        Tất cả sự kiện
      </button>
    </div>
  );
};

export default MenuLeftad;