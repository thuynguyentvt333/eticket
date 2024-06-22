import React, { useState } from 'react';
import { FaPlus, FaSearch, FaPen } from 'react-icons/fa';
import './ManageEvent.scss';
import { useNavigate } from 'react-router-dom';

const ManageEvent = () => {

  const navigate = useNavigate();

  // Dữ liệu mẫu cho danh sách sự kiện (thay thế bằng dữ liệu thật từ API)
  const events = [
    { 
      id: 1, 
      name: 'Concert A', 
      category: 'Music', 
      status: 'Upcoming', 
      ticketsSold: 120,
      date: '2024-03-10',
      time: '20:00',
      information: 'Lorem ipsum dolor sit amet' 
    },
  ];

  // Hàm xử lý khi bấm nút "Create New Event"
  const handleCreateEvent = () => {
    navigate("/add-event");
  };


  // Hàm xử lý khi bấm nút "Edit"
  const handleEditEvent = (id) => {
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
            <th>Tickets Sold</th>
            <th>Date</th>
            <th>Time</th>
            <th>Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.category}</td>
              <td>{event.status}</td>
              <td>{event.ticketsSold}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>{event.information}</td>
              <td>
                <button onClick={() => handleEditEvent(event.id)}>
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