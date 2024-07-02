import React from 'react';

import FeaturedEvents from '../../component/FeaturedEvents/FeaturedEvents';
import Baner from '../../component/Baner/Baner';

const HomePage = () => {
  return (
    <div className='home ' style={{ backgroundColor: '#f5f5f5'}}>
   <Baner/>
    <FeaturedEvents categoryId={7} title="Ca Nhạc" />
      <FeaturedEvents categoryId={8} title="Sân Khấu Văn Hóa" />
      <FeaturedEvents categoryId={9} title="Hội Thảo" />
    </div>
  );
};

export default HomePage;
