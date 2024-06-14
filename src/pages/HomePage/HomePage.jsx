import React from 'react';
// import HomeSlider from './HomeSlider/HomeSlider'; // Import HomeSlider component
// import ProductCard from '../../component/ProductCard/ProductCard';
// import FeaturedEvents from './';
// import SpecialEvents from './component/SpecialEvents/SpecialEvents.jsx';
// import './Homepage.scss';
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
