import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FilterModal = () => {
  // ... (Các state cho bộ lọc - giữ nguyên như code trước)
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([
    { name: 'Âm nhạc', checked: false },
    { name: 'Sân khấu', checked: false },
    { name: 'Hội thảo', checked: false },
    { name: 'Khác', checked: false }
  ]);
  const [locations, setLocations] = useState([
    { name: 'Hà Nội', checked: false },
    { name: 'Hồ Chí Minh', checked: false },
    { name: 'Đà Nẵng', checked: false }
  ]);
  const [status, setStatus] = useState([
    { name: 'Chưa diễn ra', checked: false },
    { name: 'Đã diễn ra', checked: false }
  ]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // Thêm state để lưu message lỗi

  const navigate = useNavigate(); // Thêm useNavigate

  // ... (Các hàm xử lý cho bộ lọc - giữ nguyên như code trước)
   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCategoryChange = (index) => {
    const updatedCategories = [...categories];
    updatedCategories[index].checked = !updatedCategories[index].checked;
    setCategories(updatedCategories);
  };

  const handleLocationChange = (index) => {
    const updatedLocations = [...locations];
    updatedLocations[index].checked = !updatedLocations[index].checked;
    setLocations(updatedLocations);
  };

  const handleStatusChange = (index) => {
    const updatedStatus = [...status];
    updatedStatus[index].checked = !updatedStatus[index].checked;
    setStatus(updatedStatus);
  };

  const handleReset = () => {
    setCategories(categories.map(category => ({ ...category, checked: false })));
    setLocations(locations.map(location => ({ ...location, checked: false })));
    setStatus(status.map(s => ({ ...s, checked: false })));
    setFromDate('');
    setToDate('');
    setMinPrice('');
    setMaxPrice('');
  };
  const handleSubmit = async () => {
    try {
      // ... (Lấy dữ liệu từ các trường nhập liệu - giữ nguyên)
       const selectedCategories = categories
           .filter(category => category.checked)
        // console.log('check: ', categories)
        .map(category => category.name);
      const selectedLocations = locations
        .filter(location => location.checked)
        .map(location => location.name);
      const selectedStatus = status
        .filter(s => s.checked)
        .map(s => s.name);

      // Gửi yêu cầu API đến backend với các tham số lọc
      const response = await axios.get('http://localhost:8080/home/event', {
        params: {
          categories: selectedCategories,
          locations: selectedLocations,
          status: selectedStatus,
          fromDate: fromDate,
          toDate: toDate,
          minPrice: minPrice,
          maxPrice: maxPrice
        }
      });

      const filteredEvents = response.data;
      console.log(filteredEvents)

      if (filteredEvents.length > 0) {
        // Lưu kết quả vào localStorage 
        localStorage.setItem('filteredEvents', JSON.stringify(filteredEvents));

        // Chuyển hướng đến trang kết quả
        navigate('/filtered-events');
      } else {
        setErrorMessage('Không có sự kiện nào phù hợp.');
      }
    } catch (error) {
      console.error('Lỗi khi lọc sự kiện:', error);
      setErrorMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Filter
      </Button>

      {/* ... (Modal - giữ nguyên như code trước) */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Bộ lọc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}
          <Form>
          <Form.Group>
              <Form.Label>Thể loại</Form.Label>
              {categories.map((category, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={category.name}
                  checked={category.checked}
                  onChange={() => handleCategoryChange(index)}
                />
              ))}
            </Form.Group>

            <Form.Group>
              <Form.Label>Địa điểm</Form.Label>
              {locations.map((location, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={location.name}
                  checked={location.checked}
                  onChange={() => handleLocationChange(index)}
                />
              ))}
            </Form.Group>

            <Form.Group>
              <Form.Label>Trạng thái</Form.Label>
              {status.map((s, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={s.name}
                  checked={s.checked}
                  onChange={() => handleStatusChange(index)}
                />
              ))}
            </Form.Group>

            <Form.Group>
              <Form.Label>Thời gian</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  placeholder="Từ ngày"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <span className="mx-2">-</span>
                <Form.Control
                  type="date"
                  placeholder="Đến ngày"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Giá tiền</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="mx-2">-</span>
                <Form.Control
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReset}>
            Thiết lập lại
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Áp dụng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterModal;