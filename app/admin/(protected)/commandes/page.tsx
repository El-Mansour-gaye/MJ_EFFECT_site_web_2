
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
import { Commande } from "@/lib/types";

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommandes() {
      const token = sessionStorage.getItem("admin-auth-token");
      if (!token) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/admin/commandes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch commandes");
        }
        const data = await response.json();
        setCommandes(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchCommandes();
  }, []);

  if (loading) return <p>Chargement des commandes...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Gestion des Commandes</h1>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Montant Total</TableHead>
                    <TableHead>Statut Paiement</TableHead>
                    <TableHead>Méthode Paiement</TableHead>
                    <TableHead>Date</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {commandes.map((commande) => (
                    <TableRow key={commande.id}>
                    <TableCell>{commande.client_nom}</TableCell>
                    <TableCell>{commande.client_telephone}</TableCell>
                    <TableCell>{commande.montant_total} FCFA</TableCell>
                    <TableCell>{commande.statut_paiement}</TableCell>
                    <TableCell>{commande.methode_paiement}</TableCell>
                    <TableCell>{new Date(commande.date_creation).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
