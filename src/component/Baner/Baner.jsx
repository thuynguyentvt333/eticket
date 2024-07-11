import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

import './Banner.css'; // Tạo file CSS riêng cho component Banner
const Banner = () => {
    const sliderRef = useRef(null);
    // const [currentSlide, setCurrentSlide] = useState(0);
  
    const videoData = [
        {
          // link: 'https://salt.tkbcdn.com/ts/ds/1d/30/e9/771835ed49a7a8214fc991ab24193d31.mp4',
          id: 33,
        },
        {
          // link: 'https://salt.tkbcdn.com/ts/ds/8e/b8/42/9dd5bd8d03b82228e31b1d8f9910b360.mp4',
          id: 34,
        },
        {
          // link: 'https://salt.tkbcdn.com/ts/ds/b4/0d/ca/28c9461fd5df6452a3f4a7fea2be94f9.mp4',
          id: 35,
        },
        {
          // link: 'https://salt.tkbcdn.com/ts/ds/8f/be/3c/167300b287d8e5eca7b35b39dbc21cf9.mp4',
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