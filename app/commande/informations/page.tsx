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
  adresse: string; // Ajout du champ adresse
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
    <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12">
                    <CheckoutProgress currentStep="informations" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Client Info Form */}
                    <div className="md:col-span-1">
                        <h1 className="text-3xl font-semibold mb-6">Vos Informations</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 shadow-md">
                            <div>
                                <Label htmlFor="nom" className="text-lg">Nom Complet</Label>
                                <Input id="nom" {...register('nom', { required: 'Le nom est requis' })} className="mt-2 py-6" />
                                {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="adresse" className="text-lg">Adresse de livraison</Label>
                                <Input id="adresse" {...register('adresse', { required: 'L\'adresse est requise' })} className="mt-2 py-6" />
                                {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="telephone" className="text-lg">Téléphone</Label>
                                <Input id="telephone" {...register('telephone', { required: 'Le téléphone est requis' })} className="mt-2 py-6" />
                                {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-lg">Email (Optionnel)</Label>
                                <Input id="email" type="email" {...register('email')} className="mt-2 py-6" />
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between pt-4">
                                <Button variant="link" asChild className="mt-4 sm:mt-0 px-0">
                                    <Link href="/panier">
                                        &larr; Retour au Panier
                                    </Link>
                                </Button>
                                <Button type="submit" size="lg" className="w-full sm:w-auto py-6">
                                    Continuer vers le Paiement
                                </Button>
                            </div>
                        </form>
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

export default InformationsPage;
