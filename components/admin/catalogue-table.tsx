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

// Define the Product type based on your database schema
interface Product {
  id: number;
  name: string;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_set_or_pack: boolean;
}

export default function CatalogueTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/admin/produits");
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
    fetchProducts();
  }, []);

  const handleToggleChange = async (
    productId: number,
    field: "is_best_seller" | "is_new_arrival" | "is_set_or_pack",
    value: boolean
  ) => {
    try {
      const response = await fetch("/api/admin/produits/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          [field]: value,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product`);
      }

      // Update local state to reflect the change immediately
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, [field]: value } : p
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
      // Optionally, show an error message to the user
    }
  };

  if (loading) return <p>Chargement du catalogue...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Gestion du Catalogue</h1>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Produit</TableHead>
                    <TableHead>Meilleure Vente</TableHead>
                    <TableHead>Nouvel Arrivage</TableHead>
                    <TableHead>Coffret/Pack</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {products.map((product) => (
                    <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
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
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
