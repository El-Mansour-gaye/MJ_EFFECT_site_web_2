// /app/commande/paiement/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const PaiementPage = () => {
  const router = useRouter();
  const { cart_content, client_info, payment_method, setPaymentMethod } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
        body: JSON.stringify({
          cart_content,
          client_info,
          payment_method,
        }),
      });

      if (!response.ok) {
        throw new Error('La création de la commande a échoué.');
      }

      const data = await response.json();
      if (data.success && data.commande_id) {
        // Redirect to the ticket page with the new order ID
        router.push(`/commande/ticket/${data.commande_id}`);
      } else {
        throw new Error(data.error || 'Une erreur est survenue.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Choix de la Méthode de Paiement</h1>

      <div className="space-y-4">
        <RadioGroup onValueChange={(value) => setPaymentMethod(value as any)} defaultValue={payment_method || undefined}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PayTech" id="paytech" />
            <Label htmlFor="paytech">Payer en ligne (PayTech)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Presentiel" id="presentiel" />
            <Label htmlFor="presentiel">Payer en personne</Label>
          </div>
        </RadioGroup>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-8 flex justify-end">
        <Button onClick={handleFinalizeOrder} disabled={isLoading}>
          {isLoading ? 'Finalisation...' : 'Finaliser la Commande'}
        </Button>
      </div>
    </div>
  );
};

export default PaiementPage;
