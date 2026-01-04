// /app/admin/(protected)/arrivages/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface Arrivage {
  id: string;
  nom: string;
  date: string;
  taux_change_usd_to_fcfa: number;
  transport_global_fcfa: number;
  created_at: string;
}

const ArrivagesHistoryPage = () => {
  const router = useRouter();
  const [arrivages, setArrivages] = useState<Arrivage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArrivages = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem('admin-auth-token');
        const response = await fetch('/api/admin/arrivages', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch arrivages');
        }

        const data = await response.json();
        setArrivages(data);
      } catch (error) {
        toast.error('Erreur lors du chargement de l\'historique des arrivages.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArrivages();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-playfair">Historique des Arrivages</h1>
        <Button onClick={() => router.push('/admin/arrivages/nouveau')}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nouveau Calcul
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Arrivages Enregistrés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3">Nom de l'arrivage</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Taux de Change</th>
                  <th className="p-3">Transport Global</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">Chargement...</td>
                  </tr>
                ) : arrivages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">Aucun arrivage enregistré.</td>
                  </tr>
                ) : (
                  arrivages.map(arrivage => (
                    <tr key={arrivage.id} className="border-b hover:bg-muted/50 odd:bg-muted/50">
                      <td className="p-3 font-medium">{arrivage.nom}</td>
                      <td className="p-3">{new Date(arrivage.date).toLocaleDateString('fr-FR')}</td>
                      <td className="p-3">{arrivage.taux_change_usd_to_fcfa} FCFA</td>
                      <td className="p-3">{arrivage.transport_global_fcfa.toLocaleString('fr-FR')} FCFA</td>
                      <td className="p-3">
                        <Link href={`/admin/arrivages/${arrivage.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" /> Voir Détails
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArrivagesHistoryPage;
