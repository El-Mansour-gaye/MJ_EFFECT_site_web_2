// components/admin/catalogue/ProductForm.tsx
"use client";

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/app/admin/(protected)/catalogue/page';

const formSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prix_fcfa: z.coerce.number().min(0, 'Le prix doit être positif'),
  stock: z.coerce.number().int('Le stock doit être un entier'),
  is_best_seller: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  is_set_or_pack: z.boolean().default(false),
});

interface ProductFormProps {
  product: Product | null;
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<Product>({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      nom: '',
      prix_fcfa: 0,
      stock: 0,
      is_best_seller: false,
      is_new_arrival: false,
      is_set_or_pack: false,
    },
  });

  useEffect(() => {
    reset(product || {
      nom: '',
      prix_fcfa: 0,
      stock: 0,
      is_best_seller: false,
      is_new_arrival: false,
      is_set_or_pack: false,
    });
  }, [product, reset]);

  const handleFormSubmit = async (data: Product) => {
    const token = sessionStorage.getItem("admin-auth-token");
    const method = product ? 'PUT' : 'POST';
    const url = product ? `/api/admin/catalogue/${product.id}` : '/api/admin/catalogue';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(product ? 'Failed to update product' : 'Failed to create product');
      }
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="nom">Nom du Produit</Label>
        <Input id="nom" {...register('nom')} />
        {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
      </div>
      <div>
        <Label htmlFor="prix_fcfa">Prix (FCFA)</Label>
        <Input id="prix_fcfa" type="number" {...register('prix_fcfa')} />
        {errors.prix_fcfa && <p className="text-red-500 text-sm">{errors.prix_fcfa.message}</p>}
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" type="number" {...register('stock')} />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
      </div>

      <Controller
        name="is_best_seller"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_best_seller"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor="is_best_seller">Best Seller</Label>
          </div>
        )}
      />

      <Controller
        name="is_new_arrival"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_new_arrival"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor="is_new_arrival">Nouvel Arrivage</Label>
          </div>
        )}
      />

      <Controller
        name="is_set_or_pack"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_set_or_pack"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor="is_set_or_pack">Coffret / Pack</Label>
          </div>
        )}
      />

      <Button type="submit">{product ? 'Mettre à jour' : 'Créer'}</Button>
    </form>
  );
};

export default ProductForm;
