// /app/admin/(protected)/commandes/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type Article = {
  quantite: number;
  prix_unitaire_cmd: number;
  produits: {
    nom: string;
  };
};

type Order = {
  id: string;
  client_nom: string;
  client_telephone: string;
  client_adresse: string;
  montant_total: number;
  statut_paiement: 'EN_ATTENTE' | 'PAYE_EN_LIGNE' | 'PAYE_PRESENTIEL';
  methode_paiement: string;
  date_creation: string;
  articles_commande: Article[];
};

const CommandesPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchOrders = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch(`/api/admin/commandes?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const { data, count } = await response.json();
      setOrders(data);
      setTotalPages(Math.ceil(count / limit));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch(`/api/admin/commandes/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statut_paiement: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      fetchOrders(); // Refresh the list
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-6">Commandes</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-accent">{error}</p>}
      {!isLoading && !error && (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Statut Paiement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.client_nom}</TableCell>
                    <TableCell>{order.client_telephone}<br/>{order.client_adresse}</TableCell>
                    <TableCell>{order.montant_total} FCFA</TableCell>
                    <TableCell>{new Date(order.date_creation).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <ul>
                        {order.articles_commande.map((article, index) => (
                          <li key={index}>
                            {article.quantite}x {article.produits.nom}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={order.statut_paiement}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                          <SelectItem value="PAYE_EN_LIGNE">Payé en ligne</SelectItem>
                          <SelectItem value="PAYE_PRESENTIEL">Payé en presentiel</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center items-center space-x-2 mt-4">
              <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Précédent</Button>
              <span>Page {page} sur {totalPages}</span>
              <Button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Suivant</Button>
            </div>
          </>
      )}
    </div>
  );
};

export default CommandesPage;
