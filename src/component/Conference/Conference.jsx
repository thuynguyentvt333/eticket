import React, { useEffect, useState } from 'react';
import axios from 'axios';
import automechanika from '../../assets/product/automechanika.png'; // Add your event images to the src folder
import onlyFriends from '../../assets/product/only_friends.png';
import './Conference.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Import Slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import theme styles (optional)
import HotEvent from '../../component/HotEvent/HotEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faChevronRight  } from '@fortawesome/free-solid-svg-icons';

const Conference = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/home/event')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true, // Enable default navigation arrows
    prevArrow: <CustomPrevArrow />, // Customize the previous arrow (optional)
    nextArrow: <CustomNextArrow />, // Customize the next arrow (optional)
  };

  return (
    <div>
      <div className='text-a'> Hội Nghị </div>
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

// Optional: Create custom arrow components for styling (if needed)
const CustomPrevArrow = ({ onClick }) => (
  <button type="button" onClick={onClick} className="custom-prev-arrow">
  <FontAwesomeIcon icon={faChevronLeft} />
</button>
);

const CustomNextArrow = ({ onClick }) => (
  <button type="button" onClick={onClick} className="custom-next-arrow">
  <FontAwesomeIcon icon={faChevronRight } />
</button>
);

export default Conference;
