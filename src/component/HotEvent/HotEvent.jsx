import React from 'react';
import './HotEvent.scss';
import { Link } from "react-router-dom";

const HotEvent = ({ id, imgSrc, title, description }) => {
  return (
    <div className="hot-event">
      <img src={imgSrc} alt={title} />
      <div className="event-hot-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button>
          <Link to={`/eventinfor/${id}`} style={{ textDecoration: 'none', color: 'white' }}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default HotEvent;
