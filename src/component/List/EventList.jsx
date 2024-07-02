import React, {  useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './EventList.scss';
import automechanika from '../../assets/product/automechanika.png';

const EventList = () => {

  const { categoryId } = useParams();
  const [events, setEvents] = useState([]);

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
    <div className="event-list">
      <h2>Events in Category {categoryId}</h2>
      <div className="events">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.banner !== "Not found" ? event.banner : automechanika} alt={event.name} />
            <div className="event-details">
              <h3>{event.name}</h3>
              <p>{event.city}, {event.location}</p>
              <p>{new Date(event.startDate).toLocaleDateString('vi-VN')}</p>
              <p>From {event.minPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              <div className="event-hot-content">
      </div>
      <button className='nut'>
        <Link to={`/eventinfor/${event.id}`} style={{ textDecoration: 'none', color: 'white' }}>Chi Tiết</Link>
      </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
