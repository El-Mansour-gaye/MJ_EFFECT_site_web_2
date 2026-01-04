// /app/admin/(protected)/catalogue/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ProductTable from '@/components/admin/catalogue/ProductTable';
import ProductForm from '@/components/admin/catalogue/ProductForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';

export type Product = {
  id?: string;
  nom: string;
  prix_fcfa: number;
  stock: number;
  slug?: string;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_set_or_pack: boolean;
};

const CataloguePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch('/api/admin/catalogue', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (productId: string) => {
    setProductToDelete(productId);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setError(null); // Reset error before new attempt

    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch(`/api/admin/catalogue/${productToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 409) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Conflict deleting product.');
        }
        throw new Error('Failed to delete product');
      }

      fetchProducts(); // Refresh the list
    } catch (err) {
      setError((err as Error).message);
    } finally {
        setIsConfirmOpen(false);
        setProductToDelete(null);
    }
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  const openNewProductModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-playfair">Catalogue</h1>
        <Button onClick={openNewProductModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter un Produit
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct ? 'Modifier le Produit' : 'Ajouter un Produit'}</DialogTitle>
          </DialogHeader>
          <ProductForm product={selectedProduct} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer ce produit ?"
      />

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <ProductTable products={products} onEdit={handleEdit} onDelete={handleDeleteRequest} />
      )}
    </div>
  );
};

export default CataloguePage;
