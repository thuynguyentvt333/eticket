import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Card, Button, Row, Col, Typography, Divider, Modal, Checkbox, InputNumber } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import './InforEvent.css';
import { addToCart } from '../../redux/actions/CartActioin/cartActions';
import { toast } from 'react-toastify';

const InforEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for selected ticket types and quantities
  const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);
  const [ticketQuantities, setTicketQuantities] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/home/${id}`)
      .then((response) => {
        setEvent(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching event details:', error);
      });
  }, [id]);

  // Effect to reset quantities when selected types change
  useEffect(() => {
    setTicketQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      selectedTicketTypes.forEach((ticketId) => {
        if (!(ticketId in updatedQuantities)) {
          updatedQuantities[ticketId] = 1;
        }
      });
      return updatedQuantities;
    });
  }, [selectedTicketTypes]);

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname + location.search } });
    } else {
      const currentDate = new Date();
      const startBookingDate = new Date(event.start_booking);
      const endBookingDate = new Date(event.end_booking);

      if (currentDate >= startBookingDate && currentDate <= endBookingDate) {
        setIsModalOpen(true);
      } else {
        toast.error('Không thể đặt vé ngoài khoảng thời gian cho phép!');
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicketTypes([]); // Clear selected types on close
    setTicketQuantities({}); // Clear quantities on close
  };

  const handleTicketTypeChange = (ticketId) => {
    setSelectedTicketTypes((prevTypes) => {
      if (prevTypes.includes(ticketId)) {
        return prevTypes.filter((id) => id !== ticketId);
      } else {
        return [...prevTypes, ticketId];
      }
    });
  };

  const handleQuantityChange = (ticketId, quantity) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketId]: quantity,
    }));
  };

  const handlePlaceOrder = () => {
    if (selectedTicketTypes.length === 0) {
      toast.error('Vui lòng chọn loại vé và số lượng vé!');
      return;
    }
    if (isLoggedIn) {
      selectedTicketTypes.forEach((ticketId) => {
        const quantity = ticketQuantities[ticketId] || 0;
        if (quantity > 0) {
          const selectedTicket = event.createTicketsResponseList.find(
            (ticket) => ticket.id === ticketId
          );
          if (selectedTicket) {
            dispatch(
              addToCart({
                ...selectedTicket,
                eventName: event.name,
                quantity,
              })
            );
          }
        }
      });
      toast.success('Đã thêm vé vào giỏ hàng!');
    } else {
      navigate('/login', { state: { from: location } });
    }
    handleCloseModal();
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className='info' style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="event-details">
            <Card.Meta
              title={event.name}
              description={
                <div className='des-event'>
                  <p><CalendarOutlined /> {new Date(event.start_time).toLocaleTimeString('vi-VN')} - {new Date(event.end_time).toLocaleTimeString('vi-VN')}, {new Date(event.start_time).toLocaleDateString('vi-VN')}</p>
                  <p><EnvironmentOutlined /> {event.location}</p>
                  <p>From {event.createTicketsResponseList.map(ticket => `${ticket.type_name}: ${ticket.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`).join(', ')}</p>
                </div>
              }
            />
          </div>
          <Button type="primary" style={{ marginTop: '16px' }} size="small" onClick={handleOpenModal}>
            Thêm vào giỏ hàng
          </Button>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            cover={
              <img
                alt={event.name}
                src={event.banner !== "Not found" ? event.banner : "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F1a%2Fcf%2F0a%2Fdd89be01b53f00f260e91370a58fcc86.jpg&w=1920&q=75"} // Placeholder image if no banner
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            }
          />
        </Col>
      </Row>

      {/* Separate the sections with a divider */}
      <Divider style={{ marginTop: '48px', marginBottom: '32px', height: '3px', backgroundColor: 'black' }} />

      {/* Phần nội dung mới */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="event-details">
            <Typography.Title level={3} style={{ marginBottom: '8px' }}>About</Typography.Title>
            <p>{event.description}</p>
            <p>
              Hãy kêu gọi bạn bè và tham gia vào {event.location} vào ngày {new Date(event.start_time).toLocaleDateString('vi-VN')} để tận hưởng đêm nhạc và khiêu vũ đáng nhớ. Đừng bỏ lỡ cơ hội, mua vé ngay bây giờ!
            </p>
            <p>
              Ngày: {new Date(event.start_time).toLocaleDateString('vi-VN')} ({new Date(event.start_time).toLocaleDateString('vi-VN', { weekday: 'long' })})
            </p>
            <p>
              Thời gian: {new Date(event.start_time).toLocaleTimeString('vi-VN')} - {new Date(event.end_time).toLocaleTimeString('vi-VN')}
            </p>
          </div>
        </Col>
        <Col span={12}>
          <div className="event-details" style={{ textAlign: 'center' }}>
            <img
              src="https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F608%2F332%2Fts%2Fds%2F65%2F82%2F1e%2F23f76562706705c61e292b609df38ea1.png&w=1920&q=75"
              alt="Banner"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </Col>
      </Row>

      {/* Phần ticket info - Centered */}
      <Row gutter={[16, 16]} style={{ marginTop: '48px' }} justify="center">
        <Col span={19}>
          <div className="event-details">
            <Typography.Title level={3} style={{ marginBottom: '8px' }}>Ticket Information</Typography.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0 }}>
                <CalendarOutlined /> {new Date(event.start_time).toLocaleTimeString('vi-VN')} - {new Date(event.end_time).toLocaleTimeString('vi-VN')}, {new Date(event.start_time).toLocaleDateString('vi-VN')}
              </p>
              <Button type="primary" style={{ marginTop: '16px' }} size="small" onClick={handleOpenModal}>
                Thêm vào giỏ hàng
              </Button>
            </div>
            {event.createTicketsResponseList.map(ticket => (
              <div key={ticket.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <p style={{ margin: 0 }}>
                  <EnvironmentOutlined /> {ticket.type_name}
                </p>
                <p style={{ margin: 0 }}>
                  {ticket.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </p>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* Modal for ticket selection */}
      <Modal
        className="modal-buy"
        title="Chọn vé"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="submit" type="primary" onClick={handlePlaceOrder}>
            Đặt vé
          </Button>,
        ]}
      >
        {event.createTicketsResponseList.map((ticket) => (
          <div key={ticket.id} className="ticket-selection">
            <Checkbox
              checked={selectedTicketTypes.includes(ticket.id)}
              onChange={() => handleTicketTypeChange(ticket.id)}
            >
              {ticket.type_name} (
              {ticket.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
              )
            </Checkbox>
            {selectedTicketTypes.includes(ticket.id) && (
              <InputNumber
                min={1}
                value={ticketQuantities[ticket.id] || 1}
                onChange={(quantity) =>
                  handleQuantityChange(ticket.id, quantity)
                }
              />
            )}
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default InforEvent;
