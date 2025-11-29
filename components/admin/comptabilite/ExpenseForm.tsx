// components/admin/comptabilite/ExpenseForm.tsx
"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Expense } from '@/app/admin/(protected)/comptabilite/page';

const formSchema = z.object({
  nom_depense: z.string().min(1, 'Le nom est requis'),
  montant: z.coerce.number().min(0, 'Le montant doit être positif'),
  categorie: z.string().optional(),
  date_depense: z.string().min(1, 'La date est requise'),
});

interface ExpenseFormProps {
  expense: Expense | null;
  onSubmit: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Expense>({
    resolver: zodResolver(formSchema),
    defaultValues: expense || {
        nom_depense: '',
        montant: 0,
        categorie: '',
        date_depense: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    reset(expense || {
        nom_depense: '',
        montant: 0,
        categorie: '',
        date_depense: new Date().toISOString().split('T')[0],
    });
  }, [expense, reset]);

  const handleFormSubmit = async (data: Expense) => {
    const token = sessionStorage.getItem("admin-auth-token");
    const method = expense ? 'PUT' : 'POST';
    const url = expense ? `/api/admin/comptabilite/${expense.id}` : '/api/admin/comptabilite';

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
        throw new Error(expense ? 'Failed to update expense' : 'Failed to create expense');
      }
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="nom_depense">Nom de la Dépense</Label>
        <Input id="nom_depense" {...register('nom_depense')} />
        {errors.nom_depense && <p className="text-red-500 text-sm">{errors.nom_depense.message}</p>}
      </div>
      <div>
        <Label htmlFor="montant">Montant (FCFA)</Label>
        <Input id="montant" type="number" {...register('montant')} />
        {errors.montant && <p className="text-red-500 text-sm">{errors.montant.message}</p>}
      </div>
      <div>
        <Label htmlFor="categorie">Catégorie</Label>
        <Input id="categorie" {...register('categorie')} />
        {errors.categorie && <p className="text-red-500 text-sm">{errors.categorie.message}</p>}
      </div>
      <div>
        <Label htmlFor="date_depense">Date</Label>
        <Input id="date_depense" type="date" {...register('date_depense')} />
        {errors.date_depense && <p className="text-red-500 text-sm">{errors.date_depense.message}</p>}
      </div>
      <Button type="submit">{expense ? 'Mettre à jour' : 'Créer'}</Button>
    </form>
  );
};

export default ExpenseForm;
