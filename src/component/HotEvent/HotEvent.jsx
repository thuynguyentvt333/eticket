import React from 'react';
import './HotEvent.scss';
import { Link } from "react-router-dom";

const HotEvent = ({ id, imgSrc, title, description }) => {
  return (
    <div className="hot-event">
      <div className='img-container'>
        <div className='img-event'>
          <img src={imgSrc} alt={title} />
        </div>
      </div>
     
      <div className="event-hot-content">
        <div className='event-title'>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
      <button>
        <Link to={`/eventinfor/${id}`} style={{ textDecoration: 'none', color: 'white' }}>Chi Tiết</Link>
      </button>
    </div>
  );
};

export default HotEvent;
