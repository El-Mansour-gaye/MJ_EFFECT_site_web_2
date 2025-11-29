
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Commande } from '@/lib/types';

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date_creation');
  const [order, setOrder] = useState('desc');
  const [status, setStatus] = useState('');
  const [payment, setPayment] = useState('');
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);

  const debouncedSearch = useMemo(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchCommandes();
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchCommandes();
  }, [page, sortBy, order, status, payment]);

  async function fetchCommandes() {
    setLoading(true);
    const token = sessionStorage.getItem('admin-auth-token');
    if (!token) {
      setError('Unauthorized');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/commandes?page=${page}&limit=10&search=${search}&sortBy=${sortBy}&order=${order}&status=${status}&payment=${payment}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch commandes');
      }
      const { data, totalPages } = await response.json();
      setCommandes(data);
      setTotalPages(totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function fetchCommandeDetails(id: string) {
    const token = sessionStorage.getItem('admin-auth-token');
    if (!token) return;

    try {
      const response = await fetch(`/api/admin/commandes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch commande details');
      }
      const data = await response.json();
      setSelectedCommande(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateCommandeStatus(id: string, newStatus: string) {
    const token = sessionStorage.getItem('admin-auth-token');
    if (!token) return;

    try {
      await fetch(`/api/admin/commandes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statut: newStatus }),
      });
      fetchCommandes();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Gestion des Commandes</h1>
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Rechercher une commande..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex space-x-2">
          <Select onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              <SelectItem value="En Attente">En Attente</SelectItem>
              <SelectItem value="En Cours">En Cours</SelectItem>
              <SelectItem value="Livrée">Livrée</SelectItem>
              <SelectItem value="Annulée">Annulée</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setPayment}>
            <SelectTrigger>
              <SelectValue placeholder="Paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous</SelectItem>
              <SelectItem value="PAYE_EN_LIGNE">Payé en ligne</SelectItem>
              <SelectItem value="PAYE_PRESENTIEL">Payé en présentiel</SelectItem>
              <SelectItem value="EN_ATTENTE">En attente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Commande</TableHead>
              <TableHead onClick={() => { setSortBy('client_nom'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>Client</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead onClick={() => { setSortBy('date_creation'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>Date</TableHead>
              <TableHead onClick={() => { setSortBy('montant_total'); setOrder(order === 'asc' ? 'desc' : 'asc'); }}>Montant</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commandes.map((commande) => (
              <TableRow key={commande.id}>
                <TableCell>{commande.id}</TableCell>
                <TableCell>{commande.client_nom}</TableCell>
                <TableCell>{commande.statut}</TableCell>
                <TableCell>{new Date(commande.date_creation).toLocaleDateString()}</TableCell>
                <TableCell>{commande.montant_total} FCFA</TableCell>
                <TableCell>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" onClick={() => fetchCommandeDetails(commande.id)}>Détails</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Détails de la Commande</SheetTitle>
                      </SheetHeader>
                      {selectedCommande && (
                        <div>
                          <p><strong>Client:</strong> {selectedCommande.client_nom}</p>
                          <p><strong>Téléphone:</strong> {selectedCommande.client_telephone}</p>
                          <p><strong>Adresse:</strong> {selectedCommande.client_adresse}</p>
                          <h3 className="font-bold mt-4">Articles</h3>
                          <ul>
                            {selectedCommande.articles?.map((article) => (
                              <li key={article.id}>
                                {article.quantite}x {article.produits.nom} - {article.prix_unitaire_cmd} FCFA
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <Select onValueChange={(value) => updateCommandeStatus(selectedCommande.id, value)} defaultValue={selectedCommande.statut}>
                              <SelectTrigger>
                                <SelectValue placeholder="Changer le statut" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="En Attente">En Attente</SelectItem>
                                <SelectItem value="En Cours">En Cours</SelectItem>
                                <SelectItem value="Livrée">Livrée</SelectItem>
                                <SelectItem value="Annulée">Annulée</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>
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
