import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './EventList.scss';
// import automechanika from '../../assets/product/automechanika.png';

const EventList = () => {
  const { categoryId } = useParams();
  const [events, setEvents] = useState([]);

  // Mapping categoryId to category name
  const categoryNames = {
    '7': 'Âm nhạc',
    '8': 'Sân khấu',
    '9': 'Hội thảo',
  };
  const categoryName = categoryNames[categoryId] || 'Không xác định'; 

  useEffect(() => {
    axios.get(`http://localhost:8080/home/events-categories?categoryId=${categoryId}&limit=30`)
      .then(response => {
        setEvents(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [categoryId]);

  return (
    <div className="event-list" >
      <h2>Sự kiện thuộc danh mục {categoryName}</h2> 
      <div className="events" >
        {events.map(event => (
          <Link to={`/eventinfor/${event.id}`} key={event.id} className="event-card"  style={{ textDecoration: 'none',maxHeight: '400px' }}> 
            <img src={event.banner} alt={event.name} />
            <div className="event-details">
              <h3>{event.name}</h3>
              <p>{event.city}, {event.location}</p>
              <p>{new Date(event.startDate).toLocaleDateString('vi-VN')}</p>
              <p>From {event.minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              <div className="event-hot-content">
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;