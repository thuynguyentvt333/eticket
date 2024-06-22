import React from 'react';
// import Advertise from '../../component/Advertise/Advertise';
// import CategoEvent from '../../component/CategoEvents/CategoEvent';
// import EventFilter from '../../component/EventFilter/EventFilter';
import FeaturedEvents from '../../component/FeaturedEvents/FeaturedEvents';

const HomePage = () => {
  return (
    <div>
      {/* <Advertise /> */}
      {/* <CategoEvent category="music" />
      <CategoEvent category="hoithao" />
      <CategoEvent category="san-khau" /> */}
      <FeaturedEvents/>
      {/* <EventFilter/> */}
    </div>
  );
};

export default HomePage;
