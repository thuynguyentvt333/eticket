import React, { useState, useEffect } from 'react';
import { FaPlus, FaPen } from 'react-icons/fa';
import './ManageEvent.scss';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ManageEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const token = Cookies.get('token');
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/merchant/statistics',
          {
            headers: {
              'Authorization': `Bearer ${token}` // Thêm token vào header Authorization
            }
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        if (response.status === 401) {
          console.error('Unauthorized: Token might be invalid or expired');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    navigate("/add-event");
  };

  const handleEditEvent = async (id) => {
    navigate(`/edit-event/${id}`);
  };

  return (
    <div className="manage-event-container">
      <h2>Manage Events</h2>

      <button className="create-button" onClick={handleCreateEvent}>
        <FaPlus /> Create New Event
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Total Tickets</th>
            <th>Sold Tickets</th>
            <th>Total Revenue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.eventId}>
              <td>{event.eventId}</td>
              <td>{event.eventName}</td>
              <td>{event.categories}</td>
              <td>{event.status}</td>
              <td>{event.totalTicket}</td>
              <td>{event.soldTicket}</td>
              <td>{event.totalRevenue}</td>
              <td>
                <button onClick={() => handleEditEvent(event.eventId)}>
                  <FaPen />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvent;