'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WishlistItem {
  productId: number;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  image: string;
  categoryName?: string;
  inStock: boolean;
}

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sms_wishlist');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist', e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('sms_wishlist', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [items, isInitialized]);

  const isInWishlist = (productId: number) => {
    return items.some((i) => i.productId === productId);
  };

  const toggleWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.productId === item.productId);
      if (exists) {
        return prev.filter((i) => i.productId !== item.productId);
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearWishlist = () => {
    setItems([]);
    localStorage.removeItem('sms_wishlist');
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount: items.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

