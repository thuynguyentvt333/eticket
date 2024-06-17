import React, { useState, useEffect } from 'react';

const FilteredEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    const storedEvents = localStorage.getItem('filteredEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  return (
    <div>
      <h1>Kết quả lọc</h1>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.name}</h2>
              <p>Địa điểm: {event.location}</p>
              {/* Hiển thị thêm thông tin sự kiện */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có sự kiện nào phù hợp.</p>
      )}
    </div>
  );
};

export default FilteredEvents;