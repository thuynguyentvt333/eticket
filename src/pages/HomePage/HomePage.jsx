import React from 'react';
import HomeSlider from './HomeSlider/HomeSlider'; // Import HomeSlider component
import ProductCard from '../../component/ProductCard/ProductCard';
import slide1Image from '../../assets/slide/slide1.webp';
import slide2Image from '../../assets/slide/slide2.webp';
import slide3Image from '../../assets/slide/slide3.webp';
import slide4Image from '../../assets/slide/slide4.webp';

import product1Image from '../../assets/product/sp1.webp';
import product2Image from '../../assets/product/sp2.webp';
import product3Image from '../../assets/product/sp3.webp';
import product4Image from '../../assets/product/sp4.webp';
import product5Image from '../../assets/product/sp5.webp';
import product6Image from '../../assets/product/sp6.webp';
import product7Image from '../../assets/product/sp7.webp';
import product8Image from '../../assets/product/sp8.webp';

const HomePage = () => {
  // Fake data for slider
  const slides = [
    {
      id: 1,
      image: slide1Image,
      title: 'Slide 1',
      description: 'Description for Slide 1'
    },
    {
      id: 2,
      image: slide2Image,
      title: 'Slide 2',
      description: 'Description for Slide 2'
    },
    {
      id: 3,
      image: slide3Image,
      title: 'Slide 3',
      description: 'Description for Slide 3'
    },
    {
        id: 4,
        image: slide4Image,
        title: 'Slide 4',
        description: 'Description for Slide 4'
      }
  ];

  // Fake data for product cards
  const products = [
    {
      id: 1,
      name: 'Phone 1',
      image: product1Image,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      originalPrice: 200,
      salePrice: 150
    },
    {
      id: 2,
      name: 'Phone 2',
      image: product2Image,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      originalPrice: 250,
      salePrice: 200
    },
    {
      id: 3,
      name: 'Phone 3',
      image: product3Image,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      originalPrice: 300,
      salePrice: 250
    },
    {
      id: 4,
      name: 'Phone 4',
      image: product4Image,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      originalPrice: 300,
      salePrice: 250
    }
  ];

  return (
    <div style={{ minHeight: '500px' }}>
      
    </div>
  );
};

export default HomePage;
