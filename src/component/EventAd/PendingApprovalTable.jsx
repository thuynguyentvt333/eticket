import React from 'react';
import './Tables.scss';

const PendingApprovalTable = ({ data = [] }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Location</th>
          <th>Time</th>
          <th>Status</th>
          <th>MerchantName</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event, index) => (
          <tr key={index}>
            <td>{event.eventName}</td>
            <td>{event.location}</td>
            <td>{event.time}</td>
            <td>{event.status}</td>
            <td>{event.merchantName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PendingApprovalTable;
