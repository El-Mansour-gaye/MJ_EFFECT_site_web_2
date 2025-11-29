// /app/admin/(protected)/abonnes/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Subscriber = {
  id: string;
  email: string;
  date_abonnement: string;
};

const AbonnesPage = () => {
  const [subscribers, setSubscribers] =useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      setIsLoading(true);
      const token = sessionStorage.getItem("admin-auth-token");
      try {
        const response = await fetch('/api/admin/abonnes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch subscribers');
        const data = await response.json();
        setSubscribers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-6">Abonnés</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Date d'abonnement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{new Date(subscriber.date_abonnement).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AbonnesPage;
