
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
import { Client } from "@/lib/types";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      const token = sessionStorage.getItem("admin-auth-token");
      if (!token) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/admin/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch clients");
        }
        const data = await response.json();
        setClients(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);

  if (loading) return <p>Chargement des clients...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Gestion des Clients</h1>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Adresse</TableHead>
                    <TableHead>Date d'inscription</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {clients.map((client) => (
                    <TableRow key={client.id}>
                    <TableCell>{client.nom}</TableCell>
                    <TableCell>{client.telephone}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.adresse}</TableCell>
                    <TableCell>{new Date(client.date_inscription).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
