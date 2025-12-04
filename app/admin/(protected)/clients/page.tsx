// /app/admin/(protected)/clients/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

type Client = {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  date_inscription: string;
};

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("admin-auth-token");
      try {
        const response = await fetch(`/api/admin/clients?page=${page}&limit=${limit}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch clients');
        const { data, count } = await response.json();
        setClients(data);
        setTotalPages(Math.ceil(count / limit));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [page]);

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-6">Clients</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-accent">{error}</p>}
      {!isLoading && !error && (
        <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.nom}</TableCell>
                    <TableCell>{client.telephone}<br/>{client.email}</TableCell>
                    <TableCell>{client.adresse}</TableCell>
                    <TableCell>{new Date(client.date_inscription).toLocaleDateString()}</TableCell>
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

export default ClientsPage;
