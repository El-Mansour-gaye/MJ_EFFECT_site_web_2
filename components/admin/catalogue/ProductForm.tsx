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

import { useState } from 'react';
import Image from 'next/image';
import { X, UploadCloud } from 'lucide-react';

// Extend the Product type to include image fields
type ProductWithImages = Product & {
  image?: string | null;
  images?: string[] | null;
};

const formSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prix_fcfa: z.coerce.number().min(0, 'Le prix doit être positif'),
  stock: z.coerce.number().int('Le stock doit être un entier'),
  is_best_seller: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  is_set_or_pack: z.boolean().default(false),
  image: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
});

interface ProductFormProps {
  product: ProductWithImages | null;
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm<ProductWithImages>({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      nom: '',
      prix_fcfa: 0,
      stock: 0,
      is_best_seller: false,
      is_new_arrival: false,
      is_set_or_pack: false,
      image: null,
      images: [],
    },
  });

  useEffect(() => {
    const defaultValues = product || {
      nom: '',
      prix_fcfa: 0,
      stock: 0,
      is_best_seller: false,
      is_new_arrival: false,
      is_set_or_pack: false,
      image: null,
      images: [],
    };
    reset(defaultValues);
    setImageUrls(defaultValues.images || []);
  }, [product, reset]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const token = sessionStorage.getItem("admin-auth-token");

    const uploadedUrls = await Promise.all(
      Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!response.ok) {
          console.error('Failed to upload image:', file.name);
          return null;
        }
        const data = await response.json();
        return data.imageUrl;
      })
    );

    const newImageUrls = uploadedUrls.filter((url): url is string => url !== null);
    setImageUrls((prev) => [...prev, ...newImageUrls]);
    setIsUploading(false);
  };

  const handleRemoveImage = (urlToRemove: string) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  const handleFormSubmit = async (data: ProductWithImages) => {
    const token = sessionStorage.getItem("admin-auth-token");
    const method = product ? 'PUT' : 'POST';
    const url = product ? `/api/admin/catalogue/${product.id}` : '/api/admin/catalogue';

    const payload = {
      ...data,
      images: imageUrls,
      image: imageUrls.length > 0 ? imageUrls[0] : null, // Set the first image as the main one
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto pr-4">
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

      <div>
        <Label>Images</Label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {imageUrls.map((url) => (
            <div key={url} className="relative">
              <Image src={url} alt="Product image" width={100} height={100} className="object-cover rounded w-full h-24" />
              <button
                type="button"
                onClick={() => handleRemoveImage(url)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
              <p className="mb-2 text-sm text-center text-muted-foreground">
                {isUploading ? "Téléversement..." : "Cliquez ou glissez des images"}
              </p>
            </div>
            <Input id="dropzone-file" type="file" multiple className="hidden" onChange={handleImageUpload} disabled={isUploading} />
          </label>
        </div>
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
