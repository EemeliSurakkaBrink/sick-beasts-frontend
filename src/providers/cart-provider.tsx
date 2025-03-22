/**
 * Shopping cart provider for managing cart state across the app
 */
"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define types
export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  size: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  cartOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string | number; size: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string | number; size: string; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "CLEAR_CART" };

type CartContextType = {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number, size: string) => void;
  updateQuantity: (id: string | number, size: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state
const initialState: CartState = {
  items: [],
  cartOpen: false,
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      } else {
        // New item, add to cart
        return { ...state, items: [...state.items, action.payload] };
      }
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, size, quantity } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      );
      return { ...state, items: updatedItems };
    }

    case "TOGGLE_CART":
      return { ...state, cartOpen: !state.cartOpen };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

// Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Initialize state with items from localStorage
      parsedCart.items.forEach((item: CartItem) => {
        dispatch({ type: "ADD_ITEM", payload: item });
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ items: state.items }));
  }, [state.items]);

  // Calculate total items
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Action creators
  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: string | number, size: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size } });
  };

  const updateQuantity = (id: string | number, size: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for using cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
} 