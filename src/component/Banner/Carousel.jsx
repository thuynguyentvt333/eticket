import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './VideoCarousel.scss';

const VideoCarousel = ({ bannerData, currentIndex, setCurrentIndex }) => {
  return (
    <Carousel
      className="video-carousel"
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      selectedItem={currentIndex}
      onChange={(index) => setCurrentIndex(index)}
      showArrows={true} // Show arrows for slide navigation
      centerMode={true} // Enable center mode
      centerSlidePercentage={50} // Each slide takes up 50% of the width
    >
      {bannerData.map((banner, index) => (
        <div key={index} className="video-carousel__slide">
           <div className="slide-content">
          {banner.type === 'image' ? (
            <img src={banner.source} alt={banner.title} />
          ) : (
            <video src={banner.source} autoPlay muted loop />
          )}
          <div className="video-carousel__slide--info">
            <h2>{banner.title}</h2>
            <p>{banner.description}</p>
          </div>
          </div>
          </div>
      ))}
    </Carousel>
  );
};

export default VideoCarousel;
