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
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <CheckoutProgress />
      </div>

      <div className="flex justify-center">
        <Card className="w-full max-w-2xl text-center">
          <CardHeader className="items-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl">Merci, votre commande a été reçue !</CardTitle>
            <CardDescription className="text-lg">
              Votre numéro de commande est :
            </CardDescription>
            <p className="text-2xl font-bold font-mono bg-secondary p-2 rounded-md">
              #{commandeId || 'N/A'}
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-left bg-muted p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Prochaines Étapes</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Un de nos agents vous contactera par téléphone dans les plus brefs délais pour confirmer les détails de la livraison.
                </li>
                <li>
                  Si vous avez choisi le paiement en personne, veuillez préparer le montant exact pour le livreur.
                </li>
                <li>
                  Conservez votre numéro de commande pour toute question.
                </li>
              </ul>
            </div>
            <Button asChild className="w-full sm:w-auto mt-8" size="lg">
              <Link href="/">Retour à l'Accueil</Link>
            </Button>
          </CardContent>
        </Card>
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
