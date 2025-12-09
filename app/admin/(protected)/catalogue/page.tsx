// /app/admin/(protected)/catalogue/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, DatabaseZap } from 'lucide-react';
import ProductTable from '@/components/admin/catalogue/ProductTable';
import ProductForm from '@/components/admin/catalogue/ProductForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationMessage, setMigrationMessage] = useState('');

  const handleMigration = async () => {
    setIsMigrating(true);
    setMigrationMessage('Migration en cours... Veuillez ne pas quitter cette page.');
    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch('/api/admin/migrate-images', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'La migration a échoué.');
      }
      setMigrationMessage(data.message || 'Migration terminée avec succès !');
    } catch (err) {
      setMigrationMessage((err as Error).message);
    } finally {
      setIsMigrating(false);
    }
  };

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

    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch(`/api/admin/catalogue/${productToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete product');
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

      <Card className="mb-6">
          <CardHeader>
              <CardTitle>Migration des Images Produits</CardTitle>
              <CardDescription>
                  Cette action va scanner tous vos produits, trouver les images locales (stockées dans /public) et les téléverser sur le stockage cloud (Supabase Storage). Mettez à jour votre base de données avec les nouvelles URLs.
                  <br /><strong>Cette opération est à n'effectuer qu'une seule fois.</strong>
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Button onClick={handleMigration} disabled={isMigrating}>
                  <DatabaseZap className="mr-2 h-4 w-4" />
                  {isMigrating ? 'Migration en cours...' : 'Lancer la migration des images'}
              </Button>
              {migrationMessage && <p className="mt-4 text-sm text-muted-foreground">{migrationMessage}</p>}
          </CardContent>
      </Card>

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
