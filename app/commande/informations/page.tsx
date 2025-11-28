// /app/commande/informations/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckoutProgress } from '@/components/checkout-progress';
import { OrderSummary } from '@/components/order-summary';

interface ClientInfo {
  nom: string;
  telephone: string;
  email?: string;
}

const InformationsPage = () => {
  const router = useRouter();
  const { cart_content, client_info, setClientInfo } = useCartStore();
  const { register, handleSubmit, formState: { errors } } = useForm<ClientInfo>({ defaultValues: client_info });

  if (cart_content.length === 0 && typeof window !== 'undefined') {
    router.push('/panier');
    return null; // Render nothing while redirecting
  }

  const onSubmit = (data: ClientInfo) => {
    setClientInfo(data);
    router.push('/commande/paiement');
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <CheckoutProgress />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Client Info Form */}
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="text-2xl">Vos Informations</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <Label htmlFor="nom">Nom Complet</Label>
                        <Input id="nom" {...register('nom', { required: 'Le nom est requis' })} className="mt-1" />
                        {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input id="telephone" {...register('telephone', { required: 'Le téléphone est requis' })} className="mt-1" />
                        {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email (Optionnel)</Label>
                        <Input id="email" type="email" {...register('email')} className="mt-1" />
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mt-8">
                        <Button variant="link" asChild className="mt-4 sm:mt-0 px-0">
                            <Link href="/panier">
                                &larr; Retour au Panier
                            </Link>
                        </Button>
                        <Button type="submit" size="lg" className="w-full sm:w-auto">
                            Continuer vers le Paiement
                        </Button>
                    </div>
                </form>
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

export default InformationsPage;
