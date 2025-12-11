// components/commande/clear-cart.tsx
"use client";

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store/cart';

const ClearCart = () => {
  const { clearCart } = useCartStore();
  const [hasMounted, setHasMounted] = useState(false);

  // Set hasMounted to true only after the component has mounted on the client.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Call clearCart only after the component has mounted.
  // This prevents the hydration mismatch error by ensuring the state is only
  // changed on the client, after the initial server render has been hydrated.
  useEffect(() => {
    if (hasMounted) {
      clearCart();
    }
  }, [hasMounted, clearCart]);

  return null;
};

export default ClearCart;
