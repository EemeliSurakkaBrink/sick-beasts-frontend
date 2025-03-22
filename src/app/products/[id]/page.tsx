/**
 * Product detail page showing specific t-shirt with options
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import { useCart } from "@/providers/cart-provider";
import { useParams } from "next/navigation";

// Mock product data (will be replaced with API fetching)
const products = [
  {
    id: 1,
    name: "Toxic Waste",
    description: "Dark humor meets environmental awareness with this bold design. Made from 100% organic cotton and printed using eco-friendly water-based inks.",
    price: 29.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "100% organic cotton",
      "Water-based eco-friendly inks",
      "Print-on-demand to eliminate waste",
      "Carbon-neutral shipping"
    ]
  },
  {
    id: 2,
    name: "Skate or Die",
    description: "Classic skate slogan with a modern twist. This design pays homage to skating culture while using sustainable materials and practices.",
    price: 29.99,
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "100% organic cotton",
      "Water-based eco-friendly inks",
      "Print-on-demand to eliminate waste",
      "Carbon-neutral shipping"
    ]
  },
  // Other products would be here
];

// Content component that uses the cart context
function ProductContent() {
  // Get params using the useParams hook
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '1';
  
  // Find product by ID (in real app, this would fetch from API)
  const product = products.find((p) => p.id === parseInt(id)) || products[0];
  
  // State for selected size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Use cart context
  const { addItem, toggleCart } = useCart();
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (!selectedSize) return;
    
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

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square bg-card rounded-lg flex items-center justify-center">
          <p className="font-punk text-2xl text-primary">{product.name}</p>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="font-punk text-3xl">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">${product.price}</p>
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
              {product.features.map((feature, index) => (
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