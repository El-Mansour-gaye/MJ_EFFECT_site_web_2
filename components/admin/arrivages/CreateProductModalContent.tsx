// /components/admin/arrivages/CreateProductModal.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface CreateProductModalProps {
  onProductCreated: (newProduct: { id: string; nom: string }) => void;
  onClose: () => void;
}

export const CreateProductModalContent = ({ onProductCreated, onClose }: CreateProductModalProps) => {
  const [newProductName, setNewProductName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProduct = async () => {
    if (!newProductName.trim()) {
      toast.error('Le nom du produit ne peut pas être vide.');
      return;
    }

    setIsCreating(true);
    try {
      const token = sessionStorage.getItem('admin-auth-token');
      const response = await fetch('/api/admin/produits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nom: newProductName }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || 'Échec de la création du produit.';
        throw new Error(errorMessage);
      }

      const newProduct = await response.json();
      toast.success(`Produit "${newProduct.nom}" créé avec succès !`);

      onProductCreated(newProduct);
      setNewProductName('');
      onClose(); // Close the modal on success

    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Créer un Nouveau Produit</DialogTitle>
      </DialogHeader>
      <div className="py-4 space-y-2">
        <Label htmlFor="product-name">Nom du Produit</Label>
        <Input
          id="product-name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Ex: Brume Corporelle 'Sensualité'"
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Annuler</Button>
        <Button onClick={handleCreateProduct} disabled={isCreating}>
          {isCreating ? 'Création...' : 'Créer le Produit'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
