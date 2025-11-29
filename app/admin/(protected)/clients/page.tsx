
"use client";

import { useEffect, useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Client } from '@/lib/types';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date_inscription');
  const [order, setOrder] = useState('desc');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const debouncedSearch = useMemo(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchClients();
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchClients();
  }, [page, sortBy, order]);

  async function fetchClients() {
    setLoading(true);
    const token = sessionStorage.getItem('admin-auth-token');
    if (!token) {
      setError('Unauthorized');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/clients?page=${page}&limit=10&search=${search}&sortBy=${sortBy}&order=${order}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const { data, totalPages } = await response.json();
      setClients(data);
      setTotalPages(totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function fetchClientDetails(id: string) {
    const token = sessionStorage.getItem('admin-auth-token');
    if (!token) return;

    try {
      const response = await fetch(`/api/admin/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch client details');
      }
      const data = await response.json();
      setSelectedClient(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Gestion des Clients</h1>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Rechercher un client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => { setSortBy('nom'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>Nom</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead onClick={() => { setSortBy('date_inscription'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>Date d'inscription</TableHead>
              <TableHead>Commandes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.nom}</TableCell>
                <TableCell>{client.telephone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{new Date(client.date_inscription).toLocaleDateString()}</TableCell>
                <TableCell>{client.commandes?.length || 0}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => fetchClientDetails(client.id)}>Détails</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Détails du Client</DialogTitle>
                      </DialogHeader>
                      {selectedClient && (
                        <div>
                          <p><strong>Nom:</strong> {selectedClient.nom}</p>
                          <p><strong>Téléphone:</strong> {selectedClient.telephone}</p>
                          <p><strong>Email:</strong> {selectedClient.email}</p>
                          <p><strong>Adresse:</strong> {selectedClient.adresse}</p>
                          <h3 className="font-bold mt-4">Historique des commandes</h3>
                          <ul>
                            {selectedClient.commandes?.map((commande) => (
                              <li key={commande.id}>
                                {new Date(commande.date_creation).toLocaleDateString()} - {commande.montant_total} FCFA - {commande.statut_paiement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Précédent</Button>
        <span>Page {page} sur {totalPages}</span>
        <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Suivant</Button>
      </div>
    </div>
  );
}
