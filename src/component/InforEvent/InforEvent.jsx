import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

const InforEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/home/${id}`)
      .then(response => {
        setEvent(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      hoverable
      cover={<img alt={event.name} src={event.banner !== "Not found" ? event.banner : "https://via.placeholder.com/400"} />}
    >
      <Card.Meta
        title={event.name}
        description={
          <div>
            <p><CalendarOutlined /> {new Date(event.start_time).toLocaleTimeString('vi-VN')} - {new Date(event.end_time).toLocaleTimeString('vi-VN')}, {new Date(event.start_time).toLocaleDateString('vi-VN')}</p>
            <p><EnvironmentOutlined /> {event.location}</p>
            <p>From {event.createTicketsResponseList.map(ticket => `${ticket.type_name}: ${ticket.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`).join(', ')}</p>
          </div>
        }
      />
      {/* <Button type="primary" style={{ marginTop: '16px' }}>Book now</Button> */}
    </Card>
  );
};

export default InforEvent;
