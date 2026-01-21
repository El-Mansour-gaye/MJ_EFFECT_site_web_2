// components/admin/catalogue/ProductForm.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { X, UploadCloud, PlusCircle } from 'lucide-react';

// Le type de base du produit venant de la page catalogue
export type Product = {
  id?: string;
  nom: string;
  prix_fcfa: number;
  stock: number;
  slug?: string;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_set_or_pack: boolean;
  description?: string;
  intensite?: string;
  famille_olfactive?: string;
  category?: string;
  subcategory?: string;
  tag?: string;
  details?: string;
  image?: string;
  images?: string[];
};

// On étend le type pour inclure les champs d'image (compatibilité)
type ProductWithImages = Product;

// Schéma de validation avec Zod
const formSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prix_fcfa: z.coerce.number().min(0, 'Le prix doit être positif'),
  stock: z.coerce.number().int('Le stock doit être un entier'),
  slug: z.string().optional().nullable(),
  is_best_seller: z.boolean().default(false),
  is_new_arrival: z.boolean().default(false),
  is_set_or_pack: z.boolean().default(false),
  category: z.string().optional().nullable(),
  subcategory: z.string().optional().nullable(),
  tag: z.string().optional().nullable(),
  image: z.string().nullable().optional(),
  images: z.array(z.string()).nullable().optional(),
  description: z.string().optional(),
  intensite: z.string().optional(),
  famille_olfactive: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  details: z.string().optional().nullable(),
});

interface ProductFormProps {
  product: Product | null;
  onSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<Product>({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      nom: '',
      prix_fcfa: 0,
      stock: 0,
      slug: '',
      is_best_seller: false,
      is_new_arrival: false,
      is_set_or_pack: false,
      category: '',
      subcategory: '',
      tag: '',
      image: '',
      images: [],
      description: '',
      intensite: '',
      famille_olfactive: '',
      category: '',
      subcategory: '',
      details: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const mainImageUrl = watch('image');

  useEffect(() => {
    const defaultValues = product || {
      nom: '',
      prix_fcfa: 0,
      stock: 0,
      slug: '',
      is_best_seller: false,
      is_new_arrival: false,
      is_set_or_pack: false,
      category: '',
      subcategory: '',
      tag: '',
      image: '',
      images: [],
      description: '',
      intensite: '',
      famille_olfactive: '',
      category: '',
      subcategory: '',
      details: '',
    };
    reset(defaultValues);
  }, [product, reset]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const token = sessionStorage.getItem("admin-auth-token");

    const uploadedUrls = await Promise.all(
      Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Échec du téléversement pour:', file.name, errorData);
                setFormError(`Échec du téléversement pour ${file.name}: ${errorData.details || errorData.error || 'Erreur réseau'}`);
                return null;
            }
            const data = await response.json();
            return data.imageUrl;
        } catch (error) {
            console.error('Erreur lors du téléversement:', error);
            setFormError(`Erreur lors du téléversement: ${(error as Error).message}`);
            return null;
        }
      })
    );

    const newImageUrls = uploadedUrls.filter((url): url is string => url !== null);

    if (newImageUrls.length > 0) {
      // Si l'image principale est vide, on la remplit avec la première image téléversée
      if (!watch('image')) {
        setValue('image', newImageUrls[0]);
        // On ajoute le reste à la galerie
        newImageUrls.slice(1).forEach(url => append(url));
      } else {
        // Sinon, on ajoute toutes les nouvelles images à la galerie
        newImageUrls.forEach(url => append(url));
      }
    }

    setIsUploading(false);
  };

  const handleFormSubmit = async (data: Product) => {
    setFormError(null);
    const token = sessionStorage.getItem("admin-auth-token");
    const method = product ? 'PUT' : 'POST';
    const url = product ? `/api/admin/catalogue/${product.id}` : '/api/admin/catalogue';

    // On s'assure que les images sont bien un tableau, même s'il est vide
    // Et on nettoie l'objet pour ne pas envoyer d'ID lors d'un POST
    const { id, ...rest } = data;
    const payload = {
      ...(product ? data : rest),
      images: data.images || [],
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || (product ? 'Échec de la mise à jour' : 'Échec de la création'));
      }
      onSubmit();
    } catch (error) {
      console.error(error);
      setFormError((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto pr-4">
      {formError && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
          {formError}
        </div>
      )}

      <div>
        <Label htmlFor="nom">Nom du Produit</Label>
        <Input id="nom" {...register('nom')} />
        {errors.nom && <p className="text-red-500 text-sm">{errors.nom.message}</p>}
      </div>

      <div>
        <Label htmlFor="details">Description / Détails</Label>
        <textarea
          id="details"
          {...register('details')}
          className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Input id="category" {...register('category')} placeholder="Ex: Parfums, Soins Corporels" />
        </div>
        <div>
          <Label htmlFor="subcategory">Sous-catégorie</Label>
          <Input id="subcategory" {...register('subcategory')} placeholder="Ex: Brumes, Lotions" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Input id="category" {...register('category')} placeholder="Ex: Parfums, Soins" />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>
        <div>
          <Label htmlFor="subcategory">Sous-catégorie (Famille)</Label>
          <Input id="subcategory" {...register('subcategory')} placeholder="Ex: Floral, Boisé" />
          {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="intensite">Intensité</Label>
          <Input id="intensite" {...register('intensite')} placeholder="Ex: Modérée, Forte" />
          {errors.intensite && <p className="text-red-500 text-sm">{errors.intensite.message}</p>}
        </div>
        <div>
          <Label htmlFor="famille_olfactive">Famille Olfactive (Détails)</Label>
          <Input id="famille_olfactive" {...register('famille_olfactive')} placeholder="Ex: Floral, Boisé" />
          {errors.famille_olfactive && <p className="text-red-500 text-sm">{errors.famille_olfactive.message}</p>}
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" {...register('slug')} placeholder="nom-du-produit" />
        </div>
        <div>
          <Label htmlFor="tag">Tag</Label>
          <Input id="tag" {...register('tag')} placeholder="Ex: Promotion, Nouveau" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      {/* Champ pour l'image principale */}
      <div>
        <Label htmlFor="image">URL de l'Image Principale</Label>
        <Input id="image" {...register('image')} placeholder="https://... ou /image.png" />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        {mainImageUrl && (
          <div className="mt-2 relative w-32 h-32">
            <Image src={mainImageUrl} alt="Aperçu principal" layout="fill" className="object-cover rounded-md" />
          </div>
        )}
      </div>

      {/* Champs pour la galerie d'images */}
      <div className="space-y-3">
        <Label>URLs des Images de la Galerie</Label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input {...register(`images.${index}`)} placeholder="https://... ou /image.png" />
            <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
              <X size={16} />
            </Button>
          </div>
        ))}
        {errors.images && <p className="text-red-500 text-sm">Une ou plusieurs URLs de la galerie sont invalides.</p>}
        <Button type="button" variant="outline" size="sm" onClick={() => append('')}>
            <PlusCircle size={16} className="mr-2" />
            Ajouter une URL à la galerie
        </Button>
      </div>

      {/* Zone de téléversement */}
      <div>
          <Label>Téléverser de nouvelles images</Label>
          <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-2 text-sm text-center text-muted-foreground">
                          {isUploading ? "Téléversement en cours..." : "Cliquez ou glissez pour téléverser"}
                      </p>
                      <p className="text-xs text-muted-foreground">Une ou plusieurs images</p>
                  </div>
                  <Input id="dropzone-file" type="file" multiple className="hidden" onChange={handleImageUpload} disabled={isUploading} />
              </label>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Les images téléversées rempliront d'abord l'URL principale si elle est vide, puis la galerie.</p>
      </div>


      <div className="space-y-2 pt-4">
        <Controller
          name="is_best_seller"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox id="is_best_seller" checked={field.value} onCheckedChange={field.onChange} />
              <Label htmlFor="is_best_seller">Marquer comme "Best Seller"</Label>
            </div>
          )}
        />
        <Controller
          name="is_new_arrival"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox id="is_new_arrival" checked={field.value} onCheckedChange={field.onChange} />
              <Label htmlFor="is_new_arrival">Marquer comme "Nouvel Arrivage"</Label>
            </div>
          )}
        />
        <Controller
          name="is_set_or_pack"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox id="is_set_or_pack" checked={field.value} onCheckedChange={field.onChange} />
              <Label htmlFor="is_set_or_pack">Marquer comme "Coffret / Pack"</Label>
            </div>
          )}
        />
      </div>

      <div className="pt-4">
          <Button type="submit" disabled={isUploading}>{product ? 'Mettre à jour le produit' : 'Créer le produit'}</Button>
      </div>
    </form>
  );
};

export default ProductForm;
