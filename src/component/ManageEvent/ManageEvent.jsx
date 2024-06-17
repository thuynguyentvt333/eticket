import React, { useState } from 'react';
import { FaPlus, FaSearch, FaPen } from 'react-icons/fa';
import './ManageEvent.scss';

const ManageEvent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

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
    // ... Thêm dữ liệu sự kiện
  ];

  // Hàm xử lý khi bấm nút "Create New Event"
  const handleCreateEvent = () => {
    // Chuyển hướng đến trang tạo sự kiện hoặc hiển thị modal
    console.log("Create New Event"); 
  };

  // Hàm xử lý khi bấm nút "Search"
  const handleSearchEvent = () => {
    // Thực hiện logic tìm kiếm sự kiện
    console.log("Search Event");
  };

  // Hàm xử lý khi bấm nút "Edit"
  const handleEditEvent = (event) => {
    setIsEditing(true);
    setEditingEvent(event);
  };

  // Hàm xử lý khi bấm nút "Save" trong bảng cập nhật
  const handleSaveEvent = () => {
    // Thực hiện logic lưu cập nhật sự kiện
    console.log("Save Event:", editingEvent);
    setIsEditing(false);
    setEditingEvent(null);
  };

  // Hàm xử lý khi hủy cập nhật sự kiện
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingEvent(null);
  }

  return (
    <div className="manage-event-container">
      <h2>Manage Events</h2>

      {/* Thống kê số lượng vé bán ra */}
      <div className="statistics">
        {/* ... Hiển thị thông tin thống kê */}
      </div>

      {/* Tìm kiếm sự kiện */}
      <div className="search-bar">
        <input type="text" placeholder="Search events..." />
        <button onClick={handleSearchEvent}><FaSearch /></button>
      </div>

      {/* Nút tạo sự kiện mới */}
      <button className="create-button" onClick={handleCreateEvent}>
        <FaPlus /> Create New Event
      </button>

      {/* Danh sách sự kiện */}
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
                <button onClick={() => handleEditEvent(event)}>
                  <FaPen />
                </button>
                {/* ... Nút "Delete" */} 
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal/Popup cập nhật sự kiện */}
      {isEditing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Event</h3>
            {/* ... Các input fields cho Category, Event Information, Status, Time, Date */}
            <input 
              type="text" 
              placeholder="Category" 
              value={editingEvent.category}
              onChange={(e) => setEditingEvent({...editingEvent, category: e.target.value})} 
            />
            {/* ... Các input fields khác */}
            <div className="button-group">
              <button onClick={handleSaveEvent}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvent;