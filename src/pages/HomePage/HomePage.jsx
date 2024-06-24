import React from 'react';
// import Advertise from '../../component/Advertise/Advertise';
// import CategoEvent from '../../component/CategoEvents/CategoEvent';
// import EventFilter from '../../component/EventFilter/EventFilter';
import FeaturedEvents from '../../component/FeaturedEvents/FeaturedEvents';
import Conference from '../../component/Conference/Conference';
import Stage from '../../component/Stage/Stage';
const HomePage = () => {
  return (
    <div className='home'>
      {/* <Advertise /> */}
      {/* <CategoEvent category="music" />
      <CategoEvent category="hoithao" />
      <CategoEvent category="san-khau" /> */}

      <FeaturedEvents />
      <hr/>
      <Conference />
      <hr/>
      <Stage />
      {/* <EventFilter/> */}
    </div>
  );
};

export default HomePage;
