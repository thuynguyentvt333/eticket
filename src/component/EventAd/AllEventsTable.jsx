import React from 'react';
import './Tables.scss';

const AllEventsTable = ({ data = [] }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Location</th>
          <th>Category</th>
          <th>EventTime</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event, index) => (
          <tr key={index}>
            <td>{event.eventName}</td>
            <td>{event.location}</td>
            <td>{event.category}</td>
            <td>{event.eventTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllEventsTable;
