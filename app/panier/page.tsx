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
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">Votre Panier</h1>

        {cart_content.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-6 text-gray-600">Votre panier est actuellement vide.</p>
            <Button asChild size="lg">
              <Link href="/collection">Découvrir nos Produits</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart_content.map(item => (
                <div key={item.produit_id} className="flex items-center bg-white border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md">
                  <Image
                    src={item.image_url || '/placeholder.svg'}
                    alt={item.nom}
                    width={100}
                    height={100}
                    className="object-cover mr-6"
                  />
                  <div className="flex-grow">
                    <h2 className="font-semibold text-xl">{item.nom}</h2>
                    <p className="text-gray-600 text-md">{item.prix_fcfa.toLocaleString()} FCFA</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center border">
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.produit_id, item.quantite - 1)} disabled={item.quantite <= 1}>-</Button>
                      <Input
                          type="number"
                          value={item.quantite}
                          onChange={(e) => updateQuantity(item.produit_id, parseInt(e.target.value, 10))}
                          className="w-16 h-10 text-center border-l border-r rounded-none focus:ring-0"
                      />
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.produit_id, item.quantite + 1)}>+</Button>
                    </div>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 transition-colors" onClick={() => removeFromCart(item.produit_id)}>
                      <Trash2 size={22} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-gray-200 p-8 shadow-lg">
                <h2 className="text-3xl font-semibold mb-6">Résumé</h2>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span>{subtotal.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span>{deliveryFee.toLocaleString()} FCFA</span>
                  </div>
                  <div className="border-t my-4"></div>
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>{total.toLocaleString()} FCFA</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-8 text-lg py-7">
                  <Link href="/commande/informations">Passer la Commande</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PanierPage;
