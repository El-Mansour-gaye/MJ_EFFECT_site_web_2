// /app/commande/confirmation/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store/cart';
import { useEffect } from 'react';

const ConfirmationPage = () => {

  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear the cart when the user reaches the confirmation page
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Commande Confirmée !</h1>
      <p className="mb-8">Votre commande a été enregistrée avec succès. Merci de votre confiance.</p>

      <Button asChild>
        <Link href="/">
          Retour à l'accueil
        </Link>
      </Button>
    </div>
  );
};

export default ConfirmationPage;
