import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css'; // Import CSS cho component này 

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const searchTerm = searchParams.get('name') || '';
  const navigate = useNavigate(); // Thêm useNavigate

 useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/home/search?name=${searchTerm}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Lỗi khi tìm kiếm sự kiện:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]); // Gọi API mỗi khi searchTerm thay đổi

  const handleViewDetail = (eventId) => {
    navigate(`/eventinfor/${eventId}`); // Chuyển đến trang InforEvent
  };

  return (
    <div className="search-results-container">
      <h1>Kết quả tìm kiếm cho "{searchTerm}"</h1>
      {events.length > 0 ? (
        <ul className="event-list">
          {events.map((event) => (
            <li key={event.id} className="event-item"> 
              <div className="event-content">
                <h2>{event.name}</h2>
                <p><span className="label">Địa điểm:</span> {event.location}</p>
                <p>
                  <span className="label">Thời gian:</span> {new Date(event.startDate).toLocaleDateString('vi-VN')}
                </p>
                {/* Hiển thị thêm thông tin sự kiện */}
                <button onClick={() => handleViewDetail(event.id)} className="view-detail-btn">
                  View Detail
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có sự kiện nào phù hợp.</p>
      )}
    </div>
  );
};

export default SearchResults;