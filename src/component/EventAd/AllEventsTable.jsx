import React from 'react';
import './AllEventsTable.scss'; 

const AllEventsTable = ({ data = [] }) => {
  return (
    <table className="all-events-table">
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>Location</th>
          <th>Category</th>
          <th className="event-time-header" >Event Time</th>
          <th>Total Ticket</th>
          <th>Available</th>
          <th>Min Price</th>
          <th>Status</th>
          <th>Merchant ID</th>
          <th>Merchant Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <tr key={event.eventId}>
            <td>{event.eventId}</td>
            <td>{event.eventName}</td>
            <td>{event.location}</td>
            <td>{event.category}</td>
            <td>{event.eventTime}</td>
            <td>{event.totalTicket}</td>
            <td>{event.available}</td>
            <td>{event.minPrice}</td>
            <td>{event.status}</td>
            <td>{event.mid}</td>
            <td>{event.mname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllEventsTable;