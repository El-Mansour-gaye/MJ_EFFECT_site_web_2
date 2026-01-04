// /app/admin/(protected)/arrivages/nouveau/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Trash2, Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

// Define types for our data structures
interface Product {
  id: string;
  nom: string;
}

interface ArrivageDetail {
  id: string; // Temporary client-side ID
  produit_id: string;
  produit_nom: string;
  quantite: number;
  prix_achat_usd_unitaire: number;
  marge_fcfa: number;
}

const NewArrivagePage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Arrivage global info
  const [nomArrivage, setNomArrivage] = useState('');
  const [tauxChange, setTauxChange] = useState(610);
  const [transportGlobal, setTransportGlobal] = useState(0);

  // Arrivage details (product lines)
  const [details, setDetails] = useState<ArrivageDetail[]>([]);

  useEffect(() => {
    // Fetch products for the select dropdown
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem('admin-auth-token');
        const response = await fetch('/api/admin/produits/search', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error('Erreur lors du chargement des produits.');
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const totalQuantite = useMemo(() => {
    return details.reduce((acc, detail) => acc + (Number(detail.quantite) || 0), 0);
  }, [details]);

  const transportParUnite = useMemo(() => {
    return totalQuantite > 0 ? transportGlobal / totalQuantite : 0;
  }, [transportGlobal, totalQuantite]);

  const investissementTotalFCFA = useMemo(() => {
    const totalAchatUSD = details.reduce((acc, d) => acc + (d.prix_achat_usd_unitaire || 0) * (d.quantite || 0), 0);
    return (totalAchatUSD * tauxChange) + transportGlobal;
  }, [details, tauxChange, transportGlobal]);


  const handleAddDetail = () => {
    if (products.length === 0) {
      toast.warning("Veuillez attendre le chargement des produits.");
      return;
    }
    const firstProduct = products[0];
    setDetails([
      ...details,
      {
        id: crypto.randomUUID(),
        produit_id: firstProduct.id,
        produit_nom: firstProduct.nom,
        quantite: 1,
        prix_achat_usd_unitaire: 0,
        marge_fcfa: 2000,
      },
    ]);
  };

  const handleRemoveDetail = (id: string) => {
    setDetails(details.filter(d => d.id !== id));
  };

  const handleDetailChange = (id: string, field: keyof ArrivageDetail, value: any) => {
    setDetails(details.map(d => {
      if (d.id === id) {
        const updatedDetail = { ...d, [field]: value };
        if (field === 'produit_id') {
          const selectedProduct = products.find(p => p.id === value);
          updatedDetail.produit_nom = selectedProduct?.nom || '';
        }
        return updatedDetail;
      }
      return d;
    }));
  };

  const getCalculatedValues = (detail: ArrivageDetail) => {
    const prixAchatFCFA = (detail.prix_achat_usd_unitaire || 0) * tauxChange;
    const prixRevientUnitaire = prixAchatFCFA + transportParUnite;
    const prixVenteFinalBrut = prixRevientUnitaire + (detail.marge_fcfa || 0);
    const prixVenteFinal = Math.ceil(prixVenteFinalBrut / 10) * 10; // Arrondi à la dizaine supérieure
    return { prixRevientUnitaire, prixVenteFinal };
  };

  const handleSaveArrivage = async () => {
    if (!nomArrivage.trim()) {
        toast.error("Veuillez donner un nom à l'arrivage.");
        return;
    }
    if (details.length === 0) {
        toast.error("Veuillez ajouter au moins un produit à l'arrivage.");
        return;
    }

    setIsLoading(true);
    try {
        const token = sessionStorage.getItem('admin-auth-token');
        const body = {
            arrivage: {
                nom: nomArrivage,
                taux_change_usd_to_fcfa: tauxChange,
                transport_global_fcfa: transportGlobal,
            },
            details: details.map(({ id, produit_nom, ...rest }) => rest), // Remove client-side temp IDs
        };

        const response = await fetch('/api/admin/arrivages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Une erreur est survenue.');
        }

        const newArrivage = await response.json();
        toast.success(`Arrivage "${nomArrivage}" enregistré avec succès !`);
        router.push(`/admin/arrivages/${newArrivage.id}`);

    } catch (error: any) {
        toast.error(`Erreur lors de l'enregistrement: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold font-playfair">Créer un Nouvel Arrivage</h1>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres Globaux</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="nomArrivage">Nom de l'arrivage</label>
            <Input id="nomArrivage" placeholder="Ex: Arrivage Juin 2024" value={nomArrivage} onChange={e => setNomArrivage(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label htmlFor="tauxChange">Taux de change (1$ en FCFA)</label>
            <Input id="tauxChange" type="number" value={tauxChange} onChange={e => setTauxChange(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <label htmlFor="transportGlobal">Transport Global (FCFA)</label>
            <Input id="transportGlobal" type="number" value={transportGlobal} onChange={e => setTransportGlobal(Number(e.target.value))} />
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Table */}
      <Card>
        <CardHeader>
          <CardTitle>Détails des Produits</CardTitle>
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
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {details.map(detail => {
                  const { prixRevientUnitaire, prixVenteFinal } = getCalculatedValues(detail);
                  return (
                    <tr key={detail.id} className="border-b odd:bg-muted/50">
                      <td className="p-2">
                        <select
                          value={detail.produit_id}
                          onChange={(e) => handleDetailChange(detail.id, 'produit_id', e.target.value)}
                          className="w-full bg-transparent border-none p-1 focus:ring-0"
                        >
                          {products.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
                        </select>
                      </td>
                      <td className="p-2"><Input type="number" value={detail.quantite} onChange={(e) => handleDetailChange(detail.id, 'quantite', Number(e.target.value))} className="w-20" /></td>
                      <td className="p-2"><Input type="number" value={detail.prix_achat_usd_unitaire} onChange={(e) => handleDetailChange(detail.id, 'prix_achat_usd_unitaire', Number(e.target.value))} className="w-28" /></td>
                      <td className="p-2">{prixRevientUnitaire.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</td>
                      <td className="p-2"><Input type="number" value={detail.marge_fcfa} onChange={(e) => handleDetailChange(detail.id, 'marge_fcfa', Number(e.target.value))} className="w-28" /></td>
                      <td className="p-2 font-bold text-primary text-lg">{prixVenteFinal.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</td>
                      <td className="p-2">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveDetail(detail.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Button variant="outline" onClick={handleAddDetail} className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une ligne
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
            <div>
                <span className="font-bold">Investissement Total:</span>
                <span className="ml-2 text-xl font-bold text-primary">{investissementTotalFCFA.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</span>
            </div>
            <Button onClick={handleSaveArrivage} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" /> {isLoading ? 'Enregistrement...' : 'Enregistrer l\'Arrivage'}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewArrivagePage;
