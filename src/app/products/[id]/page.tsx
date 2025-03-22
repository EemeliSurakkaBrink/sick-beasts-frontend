/**
 * Product detail page showing specific t-shirt with options
 */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import { useCart } from "@/providers/cart-provider";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Product, getProductById } from "@/sanity/lib/api";

// Product content component that uses the cart context
function ProductContent() {
  // Get params using the useParams hook
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '1';
  
  // State for product data
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for selected size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Use cart context
  const { addItem, toggleCart } = useCart();

  // Fetch product data
  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        if (!productData) {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error loading product');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct();
  }, [id]);
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize || !product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
    });
    
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  // Show error state
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <p className="text-lg text-primary">{error || 'Product not found'}</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/products">
            ← Back to All Designs
          </Link>
        </Button>
      </div>
    );
  }

  // Create features list from sustainability info
  const features = [
    product.sustainabilityInfo.materials,
    ...(product.sustainabilityInfo.certifications || []).map(cert => `${cert} certified`),
    "Print-on-demand to eliminate waste",
    product.sustainabilityInfo.carbonFootprint || "Carbon-neutral shipping"
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square relative bg-card rounded-lg overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="font-punk text-2xl text-primary">{product.name}</p>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="font-punk text-3xl">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground">{product.description}</p>
          
          {/* Size Selection */}
          <div>
            <h2 className="font-punk text-lg mb-3">Size</h2>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`w-12 h-12 flex items-center justify-center rounded border ${
                    selectedSize === size 
                      ? "border-primary bg-primary/10" 
                      : "border-border bg-background hover:border-primary"
                  } focus:outline-none transition-colors`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize === null && (
              <p className="text-xs text-primary mt-2">Please select a size</p>
            )}
          </div>
          
          {/* Add to Cart */}
          <div>
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleAddToCart}
              disabled={!selectedSize || addedToCart}
            >
              {addedToCart ? "Added to Cart!" : "Add to Cart"}
            </Button>
            {addedToCart && (
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={toggleCart}
              >
                View Cart
              </Button>
            )}
          </div>
          
          {/* Features */}
          <div>
            <h2 className="font-punk text-lg mb-3">Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {features.filter(Boolean).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Return to all products */}
          <div className="pt-4">
            <Button variant="outline" asChild>
              <Link href="/products">
                ← Back to All Designs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page component that wraps content with MainLayout
export default function ProductDetailPage() {
  return (
    <MainLayout>
      <ProductContent />
    </MainLayout>
  );
} 