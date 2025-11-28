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
      if (data.success && data.commande_id) {
        clearCart();
        router.push(`/commande/ticket?id=${data.commande_id}`);
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
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <CheckoutProgress />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Payment Method Selection */}
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="text-2xl">Mode de Paiement</CardTitle>
                <CardDescription>Choisissez comment vous souhaitez payer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div
                    onClick={() => setPaymentMethod('PayTech')}
                    className={cn(
                        "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-all",
                        payment_method === 'PayTech' ? "border-primary ring-2 ring-primary" : "border-muted"
                    )}
                >
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                        <h3 className="font-semibold">Payer en ligne (PayTech)</h3>
                        <p className="text-sm text-muted-foreground">Sécurisé et instantané.</p>
                    </div>
                </div>

                <div
                    onClick={() => setPaymentMethod('Presentiel')}
                    className={cn(
                        "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-all",
                        payment_method === 'Presentiel' ? "border-primary ring-2 ring-primary" : "border-muted"
                    )}
                >
                    <Home className="h-8 w-8 text-primary" />
                    <div>
                        <h3 className="font-semibold">Payer en personne</h3>
                        <p className="text-sm text-muted-foreground">Payez en espèces à la livraison.</p>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between pt-6">
                    <Button variant="link" asChild className="mt-4 sm:mt-0 px-0">
                        <Link href="/commande/informations">
                            &larr; Modifier les informations
                        </Link>
                    </Button>
                    <Button onClick={handleFinalizeOrder} disabled={isLoading} size="lg" className="w-full sm:w-auto">
                        {isLoading ? 'Finalisation...' : `Payer ${total.toLocaleString()} FCFA`}
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Order Summary */}
        <div className="lg:col-span-1">
            <div className="sticky top-24">
                <OrderSummary />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PaiementPage;
