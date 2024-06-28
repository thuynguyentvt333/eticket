import React from 'react';
// import Advertise from '../../component/Advertise/Advertise';
// import CategoEvent from '../../component/CategoEvents/CategoEvent';
// import EventFilter from '../../component/EventFilter/EventFilter';
import FeaturedEvents from '../../component/FeaturedEvents/FeaturedEvents';

const HomePage = () => {
  return (
    <div className='home'>
    <FeaturedEvents categoryId={7} title="Ca Nhạc" />
      <FeaturedEvents categoryId={8} title="Hội Thảo" />
      <FeaturedEvents categoryId={9} title="Triển Lãm" />
    </div>
  );
};

export default HomePage;
