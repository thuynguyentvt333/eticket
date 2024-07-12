import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 


import './Banner.css'; 
const Banner = () => {
    const sliderRef = useRef(null);
  
  
    const videoData = [
        {
          link: '/video/video33.mp4',
          id: 33,
        },
        {
          link: '/video/video34.mp4',
          id: 34,
        },
        {
          link: '/video/video35.mp4',
          id: 35,
        },
        {
          link: '/video/video36.mp4',
          id: 36,
        },
      ];
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2, // Hiển thị 2 slide mỗi lần
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    //   afterChange: (current) => setCurrentSlide(current),
    };
  
    return (
        <div className="banner">
        {/* <Slider ref={sliderRef} {...settings}>
          {videoData.map((item, index) => (
            <div key={index} className="banner-slide">
              <ReactPlayer
                url={item.link}
                playing={true} 
                loop={true}
                muted={true}
                width="90%"
                height="98%"
                className="rounded-video"
              />
              <div className="banner-content">
                <Link to={`/eventinfor/${item.id}`}>
                  <button>Xem thêm</button> 
                </Link>
              </div>
            </div>
          ))}
        </Slider> */}
        <div className="banner-controls">
          <button onClick={() => sliderRef.current.slickPrev()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={() => sliderRef.current.slickNext()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  };
  
  export default Banner;