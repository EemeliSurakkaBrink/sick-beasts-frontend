/**
 * Product card component for displaying t-shirt designs
 */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  className?: string;
}

export default function ProductCard({ id, name, description, price, image, className = '' }: ProductCardProps) {
  return (
    <div className={`group bg-card rounded-lg overflow-hidden border border-border ${className}`}>
      <div className="aspect-square relative bg-muted">
        {/* Product image */}
        <Image 
          src={image} 
          alt={name} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick shop overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <Button asChild variant="default">
            <Link href={`/products/${id}`}>Quick View</Link>
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-punk text-xl truncate">{name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mt-1 mb-2 h-10">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${price.toFixed(2)}</span>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/products/${id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 