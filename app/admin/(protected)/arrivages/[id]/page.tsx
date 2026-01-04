// /app/admin/(protected)/arrivages/[id]/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Send } from 'lucide-react';

// Types matching the API response
interface ArrivageDetail {
  id: string;
  produit_id: string;
  quantite: number;
  prix_achat_usd_unitaire: number;
  marge_fcfa: number;
  produits: { nom: string };
}

interface Arrivage {
  id: string;
  nom: string;
  date: string;
  taux_change_usd_to_fcfa: number;
  transport_global_fcfa: number;
  details: ArrivageDetail[];
}

const ArrivageDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [arrivage, setArrivage] = useState<Arrivage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchArrivageDetail = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem('admin-auth-token');
        const response = await fetch(`/api/admin/arrivages/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch arrivage details');
        }
        const data = await response.json();
        setArrivage(data);
      } catch (error) {
        toast.error('Erreur lors du chargement des détails de l\'arrivage.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArrivageDetail();
  }, [id]);

  const totalQuantite = useMemo(() => {
    return arrivage?.details.reduce((acc, detail) => acc + (detail.quantite || 0), 0) || 0;
  }, [arrivage]);

  const transportParUnite = useMemo(() => {
    if (!arrivage || totalQuantite === 0) return 0;
    return arrivage.transport_global_fcfa / totalQuantite;
  }, [arrivage, totalQuantite]);

  const investissementTotalFCFA = useMemo(() => {
      if (!arrivage) return 0;
      const totalAchatUSD = arrivage.details.reduce((acc, d) => acc + (d.prix_achat_usd_unitaire || 0) * (d.quantite || 0), 0);
      return (totalAchatUSD * arrivage.taux_change_usd_to_fcfa) + arrivage.transport_global_fcfa;
  }, [arrivage]);

  const getCalculatedValues = (detail: ArrivageDetail) => {
    if (!arrivage) return { prixRevientUnitaire: 0, prixVenteFinal: 0 };
    const prixAchatFCFA = detail.prix_achat_usd_unitaire * arrivage.taux_change_usd_to_fcfa;
    const prixRevientUnitaire = prixAchatFCFA + transportParUnite;
    const prixVenteFinalBrut = prixRevientUnitaire + detail.marge_fcfa;
    const prixVenteFinal = Math.ceil(prixVenteFinalBrut / 10) * 10; // Arrondi à la dizaine supérieure
    return { prixRevientUnitaire, prixVenteFinal };
  };

  const handleApplyToShop = async () => {
    if (!id) return;

    setIsApplying(true);
    try {
        const token = sessionStorage.getItem('admin-auth-token');
        const response = await fetch('/api/admin/arrivages/apply-to-shop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ arrivage_id: id }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Une erreur est survenue.');
        }

        toast.success(`Opération réussie ! ${result.count} produits ont été mis à jour.`);
        router.push('/admin/catalogue');

    } catch (error: any) {
        toast.error(`Échec de l'opération: ${error.message}`);
    } finally {
        setIsApplying(false);
    }
  };


  if (isLoading) {
    return <div className="text-center p-10">Chargement des détails de l'arrivage...</div>;
  }

  if (!arrivage) {
    return <div className="text-center p-10">Détails de l'arrivage non trouvés.</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l'historique
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-playfair">Détails de l'Arrivage: {arrivage.nom}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Date: {new Date(arrivage.date).toLocaleString('fr-FR')} | Taux: 1$ = {arrivage.taux_change_usd_to_fcfa} FCFA | Transport: {arrivage.transport_global_fcfa.toLocaleString('fr-FR')} FCFA
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3">Désignation</th>
                  <th className="p-3">Qté</th>
                  <th className="p-3">Achat Unitaire ($)</th>
                  <th className="p-3">Prix Revient (FCFA)</th>
                  <th className="p-3">Marge (FCFA)</th>
                  <th className="p-3 font-bold text-primary">Prix Vente Final (FCFA)</th>
                </tr>
              </thead>
              <tbody>
                {arrivage.details.map(detail => {
                  const { prixRevientUnitaire, prixVenteFinal } = getCalculatedValues(detail);
                  return (
                    <tr key={detail.id} className="border-b odd:bg-muted/50">
                      <td className="p-2 font-medium">{detail.produits.nom}</td>
                      <td className="p-2">{detail.quantite}</td>
                      <td className="p-2">{detail.prix_achat_usd_unitaire.toLocaleString('fr-FR', { style: 'currency', currency: 'USD' })}</td>
                      <td className="p-2">{prixRevientUnitaire.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</td>
                      <td className="p-2">{detail.marge_fcfa.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</td>
                      <td className="p-2 font-bold text-primary text-lg">{prixVenteFinal.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
            <div>
                <span className="font-bold">Investissement Total:</span>
                <span className="ml-2 text-xl font-bold text-primary">{investissementTotalFCFA.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</span>
            </div>
            <Button onClick={handleApplyToShop} disabled={isApplying} variant="default">
              <Send className="mr-2 h-4 w-4" /> {isApplying ? 'Mise à jour en cours...' : 'Appliquer les prix à la boutique'}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArrivageDetailPage;
