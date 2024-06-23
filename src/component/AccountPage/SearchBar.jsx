import React from 'react';

const SearchBar = () => {
  return (
    <div style={styles.searchBar}>
      <input type="text" placeholder="Search..." style={styles.input} />
      <button style={styles.button}>🔍</button>
    </div>
  );
};

const styles = {
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ccc',
    marginLeft: '10px',
    cursor: 'pointer',
  }
};

export default SearchBar;
