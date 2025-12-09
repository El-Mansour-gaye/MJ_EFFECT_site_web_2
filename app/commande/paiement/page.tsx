// /app/commande/paiement/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckoutProgress } from '@/components/checkout-progress';
import { OrderSummary } from '@/components/order-summary';
import { cn } from '@/lib/utils';
import { CreditCard, Home } from 'lucide-react';

const PaiementPage = () => {
  const router = useRouter();
  const { cart_content, client_info, payment_method, setPaymentMethod, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if cart is empty or client info is missing
  useEffect(() => {
    if (cart_content.length === 0 || !client_info?.telephone) {
      router.push('/panier');
    }
  }, [cart_content, client_info, router]);

  const total = cart_content.reduce((acc, item) => acc + item.prix_fcfa * item.quantite, 0) + (cart_content.length > 0 ? 500 : 0);

  const handleFinalizeOrder = async () => {
    if (!payment_method) {
      setError('Veuillez choisir une méthode de paiement.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/commandes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_content, client_info, payment_method }),
      });

      if (!response.ok) {
        throw new Error('La création de la commande a échoué.');
      }

      const data = await response.json();
      if (data.success && data.order && data.order.code_commande) {
        // Redirect first to avoid race condition with the useEffect that checks for an empty cart
        router.push(`/commande/ticket/${data.order.code_commande}`);
      } else {
        throw new Error(data.error || 'Une erreur est survenue lors de la finalisation.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <CheckoutProgress currentStep="paiement" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Payment Method Selection */}
                    <div className="md:col-span-1">
                        <h1 className="text-3xl font-semibold mb-6">Mode de Paiement</h1>
                        <div className="bg-white p-8 shadow-md space-y-6">
                            <div
                                onClick={() => setPaymentMethod('PayTech')}
                                className={cn(
                                    "flex items-center space-x-4 border p-6 cursor-pointer transition-all hover:border-gray-400",
                                    payment_method === 'PayTech' ? "border-primary ring-2 ring-primary" : "border-gray-200"
                                )}
                            >
                                <CreditCard className="h-10 w-10 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg">Payer en ligne (PayTech)</h3>
                                    <p className="text-md text-muted-foreground">Sécurisé et instantané.</p>
                                </div>
                            </div>

                            <div
                                onClick={() => setPaymentMethod('Presentiel')}
                                className={cn(
                                    "flex items-center space-x-4 border p-6 cursor-pointer transition-all hover:border-gray-400",
                                    payment_method === 'Presentiel' ? "border-primary ring-2 ring-primary" : "border-gray-200"
                                )}
                            >
                                <Home className="h-10 w-10 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg">Payer en personne</h3>
                                    <p className="text-md text-muted-foreground">Payez en espèces à la livraison.</p>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}

                            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between pt-6">
                                <Button variant="link" asChild className="mt-4 sm:mt-0 px-0">
                                    <Link href="/commande/informations">
                                        &larr; Modifier les informations
                                    </Link>
                                </Button>
                                <Button onClick={handleFinalizeOrder} disabled={isLoading} size="lg" className="w-full sm:w-auto py-6">
                                    {isLoading ? 'Finalisation...' : `Payer ${total.toLocaleString()} FCFA`}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="md:col-span-1">
                        <div className="sticky top-28">
                            <OrderSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PaiementPage;
