'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/minimine-data';

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, quantity?: number) => void;
  updateCartQty: (productId: string, size: string, delta: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  clearCart: () => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  sizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  toastMessage: string | null;
  showToast: (msg: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('minimine_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('minimine_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('minimine_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('minimine_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product: Product, sizeToUse?: string, qty: number = 1) => {
    const size = sizeToUse || product.sizes[0] || 'Standard';
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + qty }
            : item,
        );
      }
      return [...prev, { product, size, quantity: qty }];
    });
    showToast(`Added ${product.name} (${size}) to bag!`);
    setCartDrawerOpen(true);
    if (quickViewProduct) setQuickViewProduct(null);
  };

  const updateCartQty = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    );
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
    showToast('Item removed from bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      showToast('Removed from wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Added to wishlist ❤');
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        cartDrawerOpen,
        setCartDrawerOpen,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        searchOpen,
        setSearchOpen,
        sizeGuideOpen,
        setSizeGuideOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
