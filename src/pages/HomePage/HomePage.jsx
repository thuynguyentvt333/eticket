import React from 'react';
import FeaturedEvents from '../../component/FeaturedEvents/FeaturedEvents.jsx';
import SpecialEvents from '../../component/SpecialEvents/SpecialEvents.jsx';

const HomePage = () => {
  

  return (
   <div style={{ backgroundColor: '#252825', color: 'white' }}>
  <FeaturedEvents/>
  <SpecialEvents/>
  </div>
  );
};

export default HomePage;
