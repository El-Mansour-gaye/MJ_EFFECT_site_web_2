// /app/commande/ticket/page.tsx
"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckoutProgress } from '@/components/checkout-progress';
import { CheckCircle2 } from 'lucide-react';

const TicketContent = () => {
  const searchParams = useSearchParams();
  const commandeId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col justify-center py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <CheckoutProgress currentStep="confirmation" />
          </div>

          <div className="bg-white p-8 md:p-12 shadow-lg text-center">
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Merci !</h1>
            <p className="text-xl text-gray-600 mb-6">Votre commande a été reçue avec succès.</p>

            <div className="bg-gray-100 p-6 inline-block mb-8">
              <p className="text-lg text-gray-700 mb-1">Votre numéro de commande est :</p>
              <p className="text-3xl font-bold font-mono text-primary">
                #{commandeId || 'N/A'}
              </p>
            </div>

            <div className="text-left bg-gray-50 p-8 max-w-2xl mx-auto">
              <h2 className="font-semibold text-2xl mb-4">Prochaines Étapes</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                <li>
                  Un de nos agents vous contactera sous peu pour confirmer la livraison.
                </li>
                <li>
                  Si vous avez choisi le paiement en personne, préparez le montant exact.
                </li>
                <li>
                  Gardez votre numéro de commande pour toute question.
                </li>
              </ul>
            </div>
            <Button asChild className="w-full sm:w-auto mt-12 py-7 text-lg">
              <Link href="/">Retour à l'Accueil</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketPage = () => (
    <Suspense fallback={<div>Chargement...</div>}>
        <TicketContent />
    </Suspense>
);

export default TicketPage;
