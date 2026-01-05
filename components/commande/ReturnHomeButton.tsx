// components/commande/ReturnHomeButton.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';

export default function ReturnHomeButton() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  const handleClick = () => {
    clearCart();
    router.push('/');
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="border-white text-white hover:bg-white hover:text-black"
    >
      Retour à l'accueil
    </Button>
  );
}
