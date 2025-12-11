// components/commande/clear-cart.tsx
"use client";

import { useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart';

const ClearCart = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // We use a timeout to ensure the clearCart action happens after the hydration is complete.
    // This prevents the hydration mismatch error (React error #418).
    const timer = setTimeout(() => {
      clearCart();
    }, 1);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return null;
};

export default ClearCart;
