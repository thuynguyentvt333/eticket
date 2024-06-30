import React from 'react';
// import Advertise from '../../component/Advertise/Advertise';
// import CategoEvent from '../../component/CategoEvents/CategoEvent';
// import EventFilter from '../../component/EventFilter/EventFilter';
import FeaturedEvents from '../../component/FeaturedEvents/FeaturedEvents';
import Banner from '../../component/Banner/Banner';

const HomePage = () => {
  return (
    <div className='home'>
     <Banner/>
    <FeaturedEvents categoryId={7} title="Ca Nhạc" />
      <FeaturedEvents categoryId={8} title="Sân Khấu Văn Hóa" />
      <FeaturedEvents categoryId={9} title="Hội Thảo" />
    </div>
  );
};

export default HomePage;
