// /app/panier/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart'; // Assumes store is at this path
import { Button } from '@/components/ui/button'; // Assumes ShadCN Button

const PanierPage = () => {
  const { cart_content } = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Votre Panier</h1>

      {cart_content.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {/* Placeholder for cart items */}
          <div className="space-y-4">
            {cart_content.map(item => (
              <div key={item.produit_id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h2 className="font-semibold">{item.nom}</h2>
                  <p>Quantité: {item.quantite}</p>
                </div>
                <p>{item.prix_fcfa * item.quantite} FCFA</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button asChild>
              <Link href="/commande/informations">
                Passer à l'étape suivante
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanierPage;
