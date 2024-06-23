import React from 'react';

const MenuLeft = ({ onSelect }) => {
  return (
    <div style={styles.menuLeft}>
      <button style={styles.button} onClick={() => onSelect('all')}>Tất cả</button>
      <button style={styles.button} onClick={() => onSelect('merchant')}>Merchant</button>
      <button style={styles.button} onClick={() => onSelect('user')}>User</button>
    </div>
  );
};

const styles = {
  menuLeft: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e0f0ff',
    padding: '10px',
  },
  button: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#c8e6ff',
    border: 'none',
    cursor: 'pointer',
  }
};

export default MenuLeft;
