import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import VideoCarousel from './Carousel.jsx';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerData = [
    {
      type: 'video',
      source: 'https://salt.tkbcdn.com/ts/ds/1d/30/e9/771835ed49a7a8214fc991ab24193d31.mp4',
      title: 'Ngày xửa Ngày xưa',
      description: 'trở về ngày xưa',
    },
    {
      type: 'video',
      source: 'https://salt.tkbcdn.com/ts/ds/8e/b8/42/9dd5bd8d03b82228e31b1d8f9910b360.mp4',
      title: 'Trung Quân',
      description: 'Sống Hết Mình',
    },
    {
      type: 'video',
      source: 'https://salt.tkbcdn.com/ts/ds/b4/0d/ca/28c9461fd5df6452a3f4a7fea2be94f9.mp4',
      title: 'Lễ Hội Âm Nhạc',
      description: 'Gây quỹ từ thiện',
    },
    {
      type: 'video',
      source: 'https://salt.tkbcdn.com/ts/ds/8f/be/3c/167300b287d8e5eca7b35b39dbc21cf9.mp4',
      title: 'Thể Thao',
      description: 'Sự Kiện Thể Thao',
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 6000); // Slide change interval (ms)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <VideoCarousel
        bannerData={bannerData}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default Banner;
