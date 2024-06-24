import React from "react";
import "./About.scss";
import { FaMapMarkerAlt,FaCheckCircle, FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      <div className="section">
        <h2>Về chúng tôi</h2>
        <p>
          Event là trang web bán vé sự kiện trực tuyến hàng đầu, kết nối bạn với
          hàng ngàn sự kiện hấp dẫn trên khắp cả nước. Với giao diện thân thiện,
          thông tin chính xác và quy trình thanh toán an toàn, Event mang đến trải
          nghiệm mua vé sự kiện dễ dàng và tiện lợi nhất.
        </p>
      </div>

      <div className="section">
        <h2>Tầm nhìn - Sứ mệnh</h2>
        <ul>
          <li>
            <FaCheckCircle /> Mang đến trải nghiệm mua vé sự kiện dễ dàng, nhanh
            chóng.
          </li>
          <li>
            <FaCheckCircle /> Cung cấp thông tin chính xác, đáng tin cậy về các
            sự kiện.
          </li>
          <li>
            <FaCheckCircle /> Hỗ trợ cộng đồng tiếp cận với các sự kiện văn hóa
            giải trí đa dạng.
          </li>
        </ul>
      </div>

      <div className="section">
        <h2>Thông tin liên hệ</h2>
        <ul>
          <li>
            <FaMapMarkerAlt /> 123 Đường ABC, Quận 1, TP.HCM
          </li>
          <li>
            <FaPhoneAlt /> 0901234567
          </li>
          <li>
            <FaEnvelope /> info@event.com
          </li>
        </ul>
        <div className="social-links">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          {/* Thêm các mạng xã hội khác */}
        </div>
      </div>

      <div className="section">
        <h2>Lời cảm ơn</h2>
        <p>
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Event. Chúng tôi luôn
          nỗ lực để mang đến cho bạn những trải nghiệm tốt nhất!
        </p>
      </div>
    </div>
  );
};

export default About;