import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './Banner.css';

const Baner = () => {
  const sliderRef = useRef(null);

  const imageData = [
    {
      link: '/video/image1.jpg',
      id: 33,
    },
    {
      link: '/images/image2.jpg',
      id: 34,
    },
    {
      link: '/images/image3.jpg',
      id: 35,
    },
    {
      link: '/images/image4.jpg',
      id: 36,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="banner">
      <Slider ref={sliderRef} {...settings}>
        {imageData.map((item, index) => (
          <div key={index} className="banner-slide">
            <img src={item.link} alt={`Slide ${index}`} className="banner-image" />
            <div className="banner-content">
              <Link to={`/eventinfor/${item.id}`}>
                <button>Xem thêm</button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
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

export default Baner;
