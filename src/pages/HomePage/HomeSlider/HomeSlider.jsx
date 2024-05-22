import React, { useState, useEffect } from 'react';

const HomeSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    }, 2000); // Đặt thời gian trượt mỗi slide là 2 giây

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
              <img src={slide.image} className="d-block w-100" alt={slide.title} style={{ maxHeight: '400px' }} /> {/* Điều chỉnh kích thước của ảnh */}
              <div className="carousel-caption d-none d-md-block">
                <h5>{slide.title}</h5>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
  );
};

export default HomeSlider;
