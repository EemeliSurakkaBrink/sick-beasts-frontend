/**
 * Product carousel component for displaying featured products
 */
"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from '@/components/product/product-card';
import { Product, getProducts } from '@/sanity/lib/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductCarousel() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        setLoading(true);
        // Fetch only featured products
        const products = await getProducts({ featured: true });
        setFeaturedProducts(products);
      } catch (err) {
        console.error('Error loading featured products:', err);
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p className="text-muted-foreground">Loading featured products...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  // If no featured products are available
  if (featuredProducts.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p className="text-muted-foreground">No featured products available at the moment.</p>
      </div>
    );
  }

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
              description={product.shortDescription}
              price={product.price}
              image={product.imageUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 