/**
 * Shopping cart component showing current items and total
 */
"use client";

import React from "react";
import { useCart } from "@/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Cart() {
  const { state, removeItem, updateQuantity, toggleCart, totalItems, totalPrice } = useCart();

  return (
    <div className={`fixed inset-0 bg-background/80 z-50 transition-opacity duration-300 ${
      state.cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-lg transition-transform duration-300 transform ${
        state.cartOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="font-punk text-xl">YOUR CART</h2>
          <button 
            onClick={toggleCart}
            className="p-1 rounded-full hover:bg-muted"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-[calc(100%-10rem)]">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg">Your cart is empty</p>
              <p className="text-muted-foreground mt-2">
                Add some sick designs to your cart!
              </p>
              <Button className="mt-6" onClick={toggleCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-4">
              {state.items.map((item) => (
                <div 
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 py-4 border-b border-border"
                >
                  {/* Product Image Placeholder */}
                  <div className="h-24 w-24 bg-muted rounded flex items-center justify-center">
                    <span className="font-punk text-sm text-primary">{item.name}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-punk">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-muted-foreground hover:text-primary"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.size, item.quantity - 1);
                          }
                        }}
                        className="p-1 rounded border border-border hover:border-primary"
                        aria-label="Decrease quantity"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      
                      <span className="px-4">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1 rounded border border-border hover:border-primary"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border p-4 space-y-4">
            <div className="flex justify-between font-bold">
              <span>Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full" asChild>
              <Link href="/checkout" onClick={toggleCart}>
                Checkout
              </Link>
            </Button>
            <Button className="w-full" variant="outline" onClick={toggleCart}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 