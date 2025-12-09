// components/commande/clear-cart.tsx
"use client";

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart';

const ClearCart = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
};

export default ClearCart;
