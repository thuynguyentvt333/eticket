import React, { useState } from 'react';
import './Contact.scss';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của form
  
      // TODO: Thêm logic gửi dữ liệu form ở đây
  
      setIsSuccess(true); // Hiển thị thông báo thành công
      setTimeout(() => {
        setIsSuccess(false); // Ẩn thông báo sau 3 giây
      }, 3000);
    };
  return (
    <div className="contact-container">
      <div className="info">
        <h2>Thông tin liên lạc</h2>
        <div className="info-item">
          <span className="icon">
            <FaMapMarkerAlt />
          </span>
          <p>123 Đường ABC, Quận 1, TP.HCM</p>
        </div>
        <div className="info-item">
          <span className="icon">
            <FaPhoneAlt />
          </span>
          <p>0901234567</p>
        </div>
        <div className="info-item">
          <span className="icon">
            <FaEnvelope />
          </span>
          <p>info@banve.com</p>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Liên hệ với chúng tôi</h2>
        <input type="text" placeholder="Họ và tên" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Tiêu đề" />
        <textarea placeholder="Nội dung" />
              <button type="submit">Gửi</button>
              {isSuccess && <p className="success-message">Gửi thành công!</p>}
      </form>
    </div>
  );
};

export default Contact;