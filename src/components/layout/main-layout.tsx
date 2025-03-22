/**
 * Main layout component that wraps page content with header and footer
 */
import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Cart from "@/components/shopping/cart";
import { CartProvider } from "@/providers/cart-provider";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Cart />
      </div>
    </CartProvider>
  );
} 