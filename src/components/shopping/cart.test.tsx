import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from './cart';
import { useCart } from '@/providers/cart-provider';
import '@testing-library/jest-dom';

// Mock the useCart hook
jest.mock('@/providers/cart-provider', () => ({
  useCart: jest.fn(),
}));

describe('Cart component', () => {
  // Mock functions
  const mockToggleCart = jest.fn();
  const mockRemoveItem = jest.fn();
  const mockUpdateQuantity = jest.fn();
  
  // Base cart state setup
  const baseCartState = {
    cartOpen: true,
    items: []
  };

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation
    (useCart as jest.Mock).mockReturnValue({
      state: baseCartState,
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 0,
      totalPrice: 0
    });
  });

  it('should render the cart when open', () => {
    // Arrange
    render(<Cart />);
    
    // Act
    const cartTitle = screen.getByText('YOUR CART');
    
    // Assert
    expect(cartTitle).toBeInTheDocument();
  });

  it('should show empty cart message when cart has no items', () => {
    // Arrange
    render(<Cart />);
    
    // Act
    const emptyMessage = screen.getByText('Your cart is empty');
    
    // Assert
    expect(emptyMessage).toBeInTheDocument();
  });

  it('should close the cart when close button is clicked', async () => {
    // Arrange
    render(<Cart />);
    
    // Act
    const closeButton = screen.getByRole('button', { name: 'Close cart' });
    await userEvent.click(closeButton);
    
    // Assert
    expect(mockToggleCart).toHaveBeenCalledTimes(1);
  });

  it('should render cart items when present', () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 1 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 1,
      totalPrice: 29.99
    });
    
    render(<Cart />);
    
    // Act
    const productName = screen.getByRole('heading', { name: 'Test Shirt' });
    const sizeText = screen.getByText('Size: M');
    const priceElements = screen.getAllByText(/\$29\.99/);
    
    // Assert
    expect(productName).toBeInTheDocument();
    expect(sizeText).toBeInTheDocument();
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('should remove item when remove button is clicked', async () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 1 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 1,
      totalPrice: 29.99
    });
    
    render(<Cart />);
    
    // Act
    const removeButton = screen.getByRole('button', { name: 'Remove item' });
    await userEvent.click(removeButton);
    
    // Assert
    expect(mockRemoveItem).toHaveBeenCalledWith('1', 'M');
  });

  it('should increase quantity when plus button is clicked', async () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 1 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 1,
      totalPrice: 29.99
    });
    
    render(<Cart />);
    
    // Act
    const increaseButton = screen.getByRole('button', { name: 'Increase quantity' });
    await userEvent.click(increaseButton);
    
    // Assert
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 'M', 2);
  });

  it('should decrease quantity when minus button is clicked', async () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 2 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 2,
      totalPrice: 59.98
    });
    
    render(<Cart />);
    
    // Act
    const decreaseButton = screen.getByRole('button', { name: 'Decrease quantity' });
    await userEvent.click(decreaseButton);
    
    // Assert
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 'M', 1);
  });

  it('should display correct total price and item count', () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 2 },
      { id: '2', name: 'Another Shirt', price: 19.99, size: 'L', quantity: 1 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 3,
      totalPrice: 79.97
    });
    
    render(<Cart />);
    
    // Act
    const totalText = screen.getByText('Total (3 items)');
    const totalPriceText = screen.getByText('$79.97');
    
    // Assert
    expect(totalText).toBeInTheDocument();
    expect(totalPriceText).toBeInTheDocument();
  });

  it('should navigate to checkout page when checkout button is clicked', () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 1 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 1,
      totalPrice: 29.99
    });
    
    render(<Cart />);
    
    // Act
    const checkoutButton = screen.getByRole('link', { name: 'Checkout' });
    
    // Assert
    expect(checkoutButton).toHaveAttribute('href', '/checkout');
  });

  it('should close cart when continue shopping button is clicked', async () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 1 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 1,
      totalPrice: 29.99
    });
    
    render(<Cart />);
    
    // Act
    const continueShoppingButton = screen.getByRole('button', { name: 'Continue Shopping' });
    await userEvent.click(continueShoppingButton);
    
    // Assert
    expect(mockToggleCart).toHaveBeenCalledTimes(1);
  });

  it('should disable decrease button when quantity is 1', () => {
    // Arrange
    const mockItems = [
      { id: '1', name: 'Test Shirt', price: 29.99, size: 'M', quantity: 1 }
    ];
    
    (useCart as jest.Mock).mockReturnValue({
      state: { ...baseCartState, items: mockItems },
      toggleCart: mockToggleCart,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      totalItems: 1,
      totalPrice: 29.99
    });
    
    render(<Cart />);
    
    // Act
    const decreaseButton = screen.getByRole('button', { name: 'Decrease quantity' });
    
    // Assert
    expect(decreaseButton).toBeDisabled();
  });
}); 