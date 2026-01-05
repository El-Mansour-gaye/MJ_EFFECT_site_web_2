// app/commande/ticket/[orderCode]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TicketDisplay from '@/components/commande/ticket-display';
import ReturnHomeButton from '@/components/commande/ReturnHomeButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Define the types for better readability
interface Article {
  quantite: number;
  prix_unitaire_cmd: number;
  produits: {
    nom: string;
  } | null;
}

interface Commande {
  code_commande: string;
  date_creation: string;
  client_nom: string;
  client_adresse: string;
  client_telephone: string;
  client_email: string | null;
  date_livraison: string;
  statut_livraison: string;
  montant_total: number;
  methode_paiement: string;
  articles_commande: Article[];
}

export default function TicketPage() {
  const params = useParams();
  const orderCode = params.orderCode as string;

  const [order, setOrder] = useState<Commande | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderCode) return;

    const fetchOrder = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/commande?code=${orderCode}`);
        if (!response.ok) {
          throw new Error('Commande non trouvée.');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderCode]);

  if (isLoading) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
                <p className="text-xl">Chargement du ticket de commande...</p>
            </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center bg-[#1A1A1A] p-12">
                <h1 className="text-3xl font-bold mb-4">Erreur</h1>
                <p className="text-red-500 mb-8">{error}</p>
                <Button asChild variant="outline">
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
            </div>
        </div>
    );
  }

  if (!order) {
    return null; // Should be handled by error state
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <div className="bg-[#1A1A1A] p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl md:text-4xl mb-2">Merci pour votre commande !</h1>
            <p className="text-gray-400">Votre ticket de commande</p>
          </div>

          <div className="space-y-8">
            <TicketDisplay code={order.code_commande} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div>
                <h3 className="font-semibold text-lg mb-2">Client</h3>
                <p>{order.client_nom}</p>
                <p>{order.client_adresse}</p>
                <p>{order.client_telephone}</p>
                <p>{order.client_email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Livraison</h3>
                <p>Date de livraison souhaitée : <span className="font-bold">{new Date(order.date_livraison).toLocaleDateString('fr-FR')}</span></p>
                <p>Statut : <span className="font-bold">{order.statut_livraison}</span></p>
                <p>Paiement : <span className="font-bold">{order.methode_paiement}</span></p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Résumé de la commande</h3>
              <div className="border-t border-b border-gray-700 divide-y divide-gray-700">
                {order.articles_commande.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3">
                    <p>{item.produits?.nom || 'Produit inconnu'} (x{item.quantite})</p>
                    <p className="font-mono">{new Intl.NumberFormat('fr-FR').format(item.prix_unitaire_cmd * item.quantite)} FCFA</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Total payé</p>
              <p className="text-2xl font-bold font-mono">{new Intl.NumberFormat('fr-FR').format(order.montant_total)} FCFA</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
            <ReturnHomeButton />
        </div>
      </div>
    </div>
  );
}
