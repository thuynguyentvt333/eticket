import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Card, Button, Row, Col, Typography, Divider, Space, Modal, Radio } from 'antd';
import { EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import './InforEvent.css'; 
import { addToCart } from '../../redux/actions/CartActioin/cartActions';
import { toast } from 'react-toastify';

const InforEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn); 
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null); 
  const [quantity, setQuantity] = useState(1); 
  const [selectedTicketType, setSelectedTicketType] = useState(null); // State for selected ticket type

  useEffect(() => {
    axios.get(`http://localhost:8080/home/${id}`)
      .then(response => {
        setEvent(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, [id]);

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      // Redirect to login page and store current location
      navigate('/login', { state: { from: location.pathname + location.search } });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null); // Reset selected ticket
    setSelectedTicketType(null); // Reset selected ticket type
    setQuantity(1); // Reset quantity
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(+e.target.value));
    console.log('check: ', e.target.value, quantity);
  };

  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
  };

  const validateForm = () => {
    if (!selectedTicketType || !quantity) {
      toast.error('vui lòng chọn loại vé nữa!');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return;
    }
    if (isLoggedIn) {
      // Find the selected ticket based on type
      const selectedTicket = event.createTicketsResponseList.find(
        (ticket) => ticket.type_name === selectedTicketType
      );

      if (selectedTicket) {
        // Add selected ticket to cart with quantity
        dispatch(addToCart({ ...selectedTicket, eventName: event.name, quantity }));
        toast.success(" vừa thêm vé thành công, mau vào giỏ hàng thanh toán ")
      } else {
        // Handle case where no ticket type is selected
        console.error("Ticket type not selected");
      }
    }
    // } else {
    //   navigate('/login', { state: { from: location } });
    // }
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
                <div>
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
                src={event.banner !== "Not found" ? event.banner : "https://i.pinimg.com/564x/20/a4/a4/20a4a42c49c9c1de138a40014a111cfe.jpg"} // Placeholder image if no banner
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            }
          />
        </Col>
      </Row>

      {/* Separate the sections with a divider */}
      <Divider style={{ marginTop: '48px', marginBottom: '32px',height: '3px', // Tăng độ dày của Divider
  backgroundColor: 'black' }} /> 

      {/* Phần nội dung mới */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="event-details">
            <Typography.Title level={3} style={{ marginBottom: '8px' }}>About</Typography.Title>
            <p>{event.description}</p> {/* Fetch description from API */}
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
              src="https://i.pinimg.com/564x/50/b3/5f/50b35f57aaba6403078d232b62e91736.jpg"
              alt="Banner"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </Col>
      </Row>

      {/* Phần ticket info - Centered */}
      <Row gutter={[16, 16]} style={{ marginTop: '48px' }} justify="center"> {/* Center the row */}
        <Col span={19}> {/* Adjust span based on your desired width */}
          <div className="event-details">
            <Typography.Title level={3} style={{ marginBottom: '8px' }}>Ticket Information</Typography.Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0 }}>
                <CalendarOutlined /> {new Date(event.start_time).toLocaleTimeString('vi-VN')} - {new Date(event.end_time).toLocaleTimeString('vi-VN')}, {new Date(event.start_time).toLocaleDateString('vi-VN')}
              </p>
              <Button type="primary" style={{ marginTop: '16px' }} size="small" onClick={() => handleOpenModal(event.createTicketsResponseList[0])}>
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
        title="Chọn vé"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handlePlaceOrder}>
            Đặt vé
          </Button>,
        ]}
      >
        {/* Radio buttons for ticket type selection */}
        <Radio.Group onChange={handleTicketTypeChange} value={selectedTicketType}>
          {event.createTicketsResponseList.map((ticket) => (
            <Radio key={ticket.id} value={ticket.type_name}>
              {ticket.type_name} ({ticket.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })})
            </Radio>
          ))}
        </Radio.Group>
        <label htmlFor="quantity">Số lượng:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          style={{ width: '60px' }}
        />
      </Modal>
    </div>
  );
};

export default InforEvent;