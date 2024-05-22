// PublicLayout.js
import React from 'react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children} 
      <Footer />
    </div>
  );
};

export default PublicLayout;
