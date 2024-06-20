import React, { useEffect, useState } from 'react';
import axios from 'axios';
import automechanika from '../../assets/product/automechanika.png'; // Add your event images to the src folder
import onlyFriends from '../../assets/product/only_friends.png';
import './FeaturedEvents.scss';
import Slider from 'react-slick';
import HotEvent from '../../component/HotEvent/HotEvent';

const FeaturedEvents = () => {
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
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
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
  );
};

export default FeaturedEvents;
