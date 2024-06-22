import React from 'react';
import { Link } from "react-router-dom";

const ScriptEvent = ({ id, imgSrc, title, description }) => {
  return (
    <div className="event-card">
      <img src={imgSrc} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/eventinfor/${id}`} style={{ textDecoration: 'none', color: 'white' }}>View Details</Link>
    </div>
  );
};

export default ScriptEvent;
