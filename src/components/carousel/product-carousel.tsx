/**
 * Product carousel component for displaying featured products
 */
"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from '@/components/product/product-card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Mock product data
const featuredProducts = [
  {
    id: 1,
    name: "Toxic Waste",
    description: "Dark humor meets environmental awareness.",
    price: 29.99,
  },
  {
    id: 2,
    name: "Skate or Die",
    description: "Classic skate slogan with a modern twist.",
    price: 29.99,
  },
  {
    id: 3,
    name: "Recycle Your Politicians",
    description: "A satirical take on political waste.",
    price: 32.99,
  },
  {
    id: 4,
    name: "404: Planet Not Found",
    description: "Tech humor with an environmental message.",
    price: 29.99,
  },
];

export default function ProductCarousel() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="py-8"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard 
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 