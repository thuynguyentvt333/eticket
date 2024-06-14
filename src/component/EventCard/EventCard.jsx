import React from 'react';
import './EventCard.scss';


const EventCard = ({ imgSrc, title, description}) => {
  return (
    <div className="event-card">
      <img src={imgSrc} alt={title} />
      <div className="event-card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button >View Details</button>
      </div>
    </div>
  );
};

export default EventCard;