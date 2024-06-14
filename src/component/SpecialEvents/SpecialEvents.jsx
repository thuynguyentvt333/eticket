import Slider from 'react-slick';
import React from 'react';
import EventCard from '../../component/EventCard/EventCard';
import event1 from '../../assets/product/event1.png';
import event2 from '../../assets/product/event2.png';
import event3 from '../../assets/product/event3.png';
import event4 from '../../assets/product/event4.png';
const SpecialEvents = () => {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Show multiple slides at once
        slidesToScroll: 1,
        autoplay: true,  // Disable autoplay
        arrows: true,  // Enable arrows for manual control
      };
    return (
        <section className="special-events">
          <h2>Special events</h2>
          <Slider {...settings}>
            <EventCard imgSrc={event1} title="Event 1" description="Description for event 1" />
            <EventCard imgSrc={event2} title="Event 2" description="Description for event 2" />
            <EventCard imgSrc={event3} title="Event 3" description="Description for event 3" />
            <EventCard imgSrc={event4} title="Event 4" description="Description for event 4" />
           
          </Slider>
        </section>
      );
    };
    
    export default SpecialEvents;
