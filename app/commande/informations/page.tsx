// /app/commande/informations/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ClientInfo {
  nom: string;
  telephone: string;
  email?: string;
}

const InformationsPage = () => {
  const router = useRouter();
  const { client_info, setClientInfo } = useCartStore();
  const { register, handleSubmit, formState: { errors } } = useForm<ClientInfo>({ defaultValues: client_info });

  const onSubmit = (data: ClientInfo) => {
    setClientInfo(data);
    router.push('/commande/paiement');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Vos Informations</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="nom">Nom Complet</Label>
          <Input id="nom" {...register('nom', { required: 'Le nom est requis' })} />
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
        </div>

        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" {...register('telephone', { required: 'Le téléphone est requis' })} />
          {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email (Optionnel)</Label>
          <Input id="email" type="email" {...register('email')} />
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit">
            Passer au Paiement
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InformationsPage;
