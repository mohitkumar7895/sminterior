'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  sku?: string;
  quantity: number;
  variant?: {
    type: string;
    value: string;
    priceAdj?: number;
  };
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  couponCode: string;
  appliedCoupon: { code: string; discountPercent?: number; discountAmount?: number } | null;
  freeShippingThreshold: number;
  shippingProgress: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: number, quantity: number, variantValue?: string) => void;
  removeFromCart: (productId: number, variantValue?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent?: number; discountAmount?: number } | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const freeShippingThreshold = 25000; // Free white glove shipping above ₹25,000

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sms_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem('sms_coupon');
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('sms_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [items, isInitialized]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === newItem.productId && i.variant?.value === newItem.variant?.value
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const updateQuantity = (productId: number, quantity: number, variantValue?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantValue);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId && (!variantValue || i.variant?.value === variantValue)) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const removeFromCart = (productId: number, variantValue?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && (!variantValue || i.variant?.value === variantValue)))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('sms_cart');
    localStorage.removeItem('sms_coupon');
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      const coupon = { code: 'WELCOME10', discountPercent: 10 };
      setAppliedCoupon(coupon);
      localStorage.setItem('sms_coupon', JSON.stringify(coupon));
      return { success: true, message: 'Coupon WELCOME10 applied! 10% off your order.' };
    }
    if (cleanCode === 'LUXURY5000') {
      const coupon = { code: 'LUXURY5000', discountAmount: 5000 };
      setAppliedCoupon(coupon);
      localStorage.setItem('sms_coupon', JSON.stringify(coupon));
      return { success: true, message: 'Coupon LUXURY5000 applied! Flat ₹5,000 off.' };
    }
    if (cleanCode === 'FESTIVE15') {
      const coupon = { code: 'FESTIVE15', discountPercent: 15 };
      setAppliedCoupon(coupon);
      localStorage.setItem('sms_coupon', JSON.stringify(coupon));
      return { success: true, message: 'Coupon FESTIVE15 applied! 15% off order.' };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    localStorage.removeItem('sms_coupon');
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.price + (item.variant?.priceAdj || 0);
    return sum + price * item.quantity;
  }, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discount = appliedCoupon.discountAmount;
    }
  }

  const shipping = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 1500;
  const taxableAmount = Math.max(0, subtotal - discount);
  // 18% GST standard for luxury furniture
  const tax = Math.round(taxableAmount * 0.18);
  const total = taxableAmount + tax + shipping;

  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discount,
        tax,
        shipping,
        total,
        couponCode,
        appliedCoupon,
        freeShippingThreshold,
        shippingProgress,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
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

