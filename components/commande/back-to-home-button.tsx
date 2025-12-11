// components/commande/back-to-home-button.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';

export const BackToHomeButton = () => {
  const router = useRouter();
  const { clearCart } = useCartStore();

  const handleClick = () => {
    clearCart();
    router.push('/');
  };

  return (
    <Button onClick={handleClick} variant="outline">
      Retour à l'accueil
    </Button>
  );
};
