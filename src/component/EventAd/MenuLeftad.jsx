import React from 'react';

const MenuLeftad = ({ onSelect }) => {
  return (
    <div className="menu-left">
      <button className="menu-button" onClick={() => onSelect('pendingApproval')}>Chờ phê duyệt</button>
      <button className="menu-button" onClick={() => onSelect('allEvents')}>Tất cả sự kiện</button>
    </div>
  );
};

export default MenuLeftad;
