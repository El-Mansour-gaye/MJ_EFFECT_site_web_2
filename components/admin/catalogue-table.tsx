
"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Edit } from "lucide-react";
import { Product } from "@/lib/types";

export default function CatalogueTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nom: "",
    prix_fcfa: 0,
    stock: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const token = sessionStorage.getItem("admin-auth-token");
    if (!token) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/produits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  const handleToggleChange = async (
    productId: string,
    field: "is_best_seller" | "is_new_arrival" | "is_set_or_pack",
    value: boolean
  ) => {
    updateProduct(productId, { [field]: value });
  };

  const handleDelete = async (productId: string) => {
    const token = sessionStorage.getItem("admin-auth-token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch("/api/admin/produits/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product`);
      }

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedProduct) return;

    await updateProduct(selectedProduct.id, {
      nom: selectedProduct.nom,
      prix_fcfa: selectedProduct.prix_fcfa,
      stock: selectedProduct.stock,
    });

    setIsEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleCreate = async () => {
    const token = sessionStorage.getItem("admin-auth-token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch("/api/admin/produits/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product`);
      }

      await fetchProducts(); // Refetch products to get the new one
      setIsNewProductDialogOpen(false);
      setNewProduct({ nom: "", prix_fcfa: 0, stock: 0 });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };


  const updateProduct = async (productId: string, data: Partial<Product>) => {
    const token = sessionStorage.getItem("admin-auth-token");
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch("/api/admin/produits/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          ...data,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product`);
      }

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, ...data } : p
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  if (loading) return <p>Chargement du catalogue...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Gestion du Catalogue</h1>
            <Dialog open={isNewProductDialogOpen} onOpenChange={setIsNewProductDialogOpen}>
                <DialogTrigger asChild>
                    <Button>Créer un produit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Créer un produit</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="nom">Nom</Label>
                            <Input
                            id="nom"
                            value={newProduct.nom}
                            onChange={(e) => setNewProduct({ ...newProduct, nom: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="prix">Prix (FCFA)</Label>
                            <Input
                            id="prix"
                            type="number"
                            value={newProduct.prix_fcfa}
                            onChange={(e) => setNewProduct({ ...newProduct, prix_fcfa: Number(e.target.value) })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewProductDialogOpen(false)}>Annuler</Button>
                    <Button onClick={handleCreate}>Créer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Meilleure Vente</TableHead>
                    <TableHead>Nouvel Arrivage</TableHead>
                    <TableHead>Coffret/Pack</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                    <TableCell>{product.nom}</TableCell>
                    <TableCell>{product.prix_fcfa}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                        <Switch
                        checked={product.is_best_seller}
                        onCheckedChange={(value) =>
                            handleToggleChange(product.id, "is_best_seller", value)
                        }
                        />
                    </TableCell>
                    <TableCell>
                        <Switch
                        checked={product.is_new_arrival}
                        onCheckedChange={(value) =>
                            handleToggleChange(product.id, "is_new_arrival", value)
                        }
                        />
                    </TableCell>
                    <TableCell>
                        <Switch
                        checked={product.is_set_or_pack}
                        onCheckedChange={(value) =>
                            handleToggleChange(product.id, "is_set_or_pack", value)
                        }
                        />
                    </TableCell>
                    <TableCell>
                        <div className="flex space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action ne peut pas être annulée. Cela supprimera définitivement
                                le produit.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(product.id)}>
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>

        {selectedProduct && (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Modifier le produit</DialogTitle>
                <DialogDescription>
                    Modifiez les détails du produit ci-dessous.
                </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                    id="nom"
                    value={selectedProduct.nom}
                    onChange={(e) =>
                        setSelectedProduct({ ...selectedProduct, nom: e.target.value })
                    }
                    />
                </div>
                <div>
                    <Label htmlFor="prix">Prix (FCFA)</Label>
                    <Input
                    id="prix"
                    type="number"
                    value={selectedProduct.prix_fcfa}
                    onChange={(e) =>
                        setSelectedProduct({
                        ...selectedProduct,
                        prix_fcfa: Number(e.target.value),
                        })
                    }
                    />
                </div>
                <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                    id="stock"
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) =>
                        setSelectedProduct({
                        ...selectedProduct,
                        stock: Number(e.target.value),
                        })
                    }
                    />
                </div>
                </div>
                <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</Button>
                <Button onClick={handleSave}>Sauvegarder</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        )}
    </div>
  );
}
