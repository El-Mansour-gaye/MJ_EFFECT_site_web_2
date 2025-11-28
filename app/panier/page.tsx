// /app/panier/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

const PanierPage = () => {
  const { cart_content, removeFromCart, updateQuantity } = useCartStore();

  const subtotal = cart_content.reduce((acc, item) => acc + item.prix_fcfa * item.quantite, 0);
  // Assuming a flat delivery fee or more complex logic later
  const deliveryFee = subtotal > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Votre Panier</h1>

      {cart_content.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg mb-4">Votre panier est actuellement vide.</p>
          <Button asChild>
            <Link href="/collection">Découvrir nos Produits</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart_content.map(item => (
              <div key={item.produit_id} className="flex items-center border rounded-lg p-4 shadow-sm">
                <Image
                  src={item.image_url || '/placeholder.svg'}
                  alt={item.nom}
                  width={80}
                  height={80}
                  className="rounded-md object-cover mr-4"
                />
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg">{item.nom}</h2>
                  <p className="text-muted-foreground">{item.prix_fcfa.toLocaleString()} FCFA</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.produit_id, item.quantite - 1)} disabled={item.quantite <= 1}>-</Button>
                    <Input
                        type="number"
                        value={item.quantite}
                        onChange={(e) => updateQuantity(item.produit_id, parseInt(e.target.value, 10))}
                        className="w-16 h-9 text-center border-l border-r rounded-none"
                    />
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.produit_id, item.quantite + 1)}>+</Button>
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => removeFromCart(item.produit_id)}>
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Résumé de la Commande</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>{deliveryFee.toLocaleString()} FCFA</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>
              </div>
              <Button asChild className="w-full mt-6 text-lg py-6">
                <Link href="/commande/informations">Valider et Poursuivre</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanierPage;
