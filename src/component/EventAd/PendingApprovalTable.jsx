import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


const PendingApprovalTable = ({ data = [], onStatusChange }) => {
  const handleChangeStatus = async (eventId) => {
    try {
      const token = Cookies.get('token');
      const sessionId = Cookies.get('sessionId');

      const response = await axios.post( // Sử dụng axios.post
        `http://localhost:8080/admin/eventMgmt/change-status/${eventId}`,
        { status: 'available' },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Session-Id': sessionId,
          },
        }
      );

      if (response.data.code === 1000) {
        console.log('Status updated successfully!');
        onStatusChange(); 
      } else {
        console.error('Error updating status:', response.data.message);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Xử lý lỗi 
    }
  };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>Location</th>
          <th>Status</th>
          <th>Merchant Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <tr key={event.eventId}>
            <td>{event.eventId}</td>
            <td>{event.eventName}</td>
            <td>{event.location}</td>
            <td>{event.status}</td>
            <td>{event.mname}</td>
            <td>
              {event.status === 'pending' && (
                <button onClick={() => handleChangeStatus(event.eventId)}>
                  Approve
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PendingApprovalTable;