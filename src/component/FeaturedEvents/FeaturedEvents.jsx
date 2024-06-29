import React, { useEffect, useState } from 'react';
import axios from 'axios';
import automechanika from '../../assets/product/automechanika.png';
import onlyFriends from '../../assets/product/only_friends.png';
import './FeaturedEvents.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HotEvent from '../../component/HotEvent/HotEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FeaturedEvents = ({ categoryId, title }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/home/events-categories?categoryId=${categoryId}&limit=6`)
      .then(response => {
        setEvents(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [categoryId]);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div>
      <div className='text-a'>{title}</div>
      <section className="featured-events">
        <Slider {...settings}>
          {events.map(event => (
            <HotEvent
              key={event.id}
              id={event.id}
              imgSrc={event.banner !== "Not found" ? event.banner : automechanika}
              title={event.name}
              description={`From ${event.minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} • ${new Date(event.startDate).toLocaleDateString('vi-VN')}`}
            />
          ))}
        </Slider>
      </section>
    </div>
  );
};

const CustomPrevArrow = ({ onClick }) => (
  <button type="button" onClick={onClick} className="custom-prev-arrow">
    <FontAwesomeIcon icon={faChevronLeft} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button type="button" onClick={onClick} className="custom-next-arrow">
    <FontAwesomeIcon icon={faChevronRight} />
  </button>
);

export default FeaturedEvents;
