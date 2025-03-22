/**
 * Product card component for displaying t-shirt designs
 */
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  className?: string;
}

export default function ProductCard({ id, name, description, price, className = '' }: ProductCardProps) {
  return (
    <div className={`group bg-card rounded-lg overflow-hidden border border-border ${className}`}>
      <div className="aspect-square relative bg-muted">
        {/* Product image placeholder - would be replaced with actual image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-punk text-xl text-primary">{name}</p>
        </div>
        
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