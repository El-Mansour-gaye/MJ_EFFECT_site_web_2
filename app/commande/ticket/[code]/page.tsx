// app/commande/ticket/[code]/page.tsx
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TicketDisplay from '@/components/commande/ticket-display';
import ReturnHomeButton from '@/components/commande/ReturnHomeButton';

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

// Function to fetch order details from Supabase with retry logic
async function getOrderDetails(code: string): Promise<Commande | null> {
  const supabase = createSupabaseAdmin();
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 1000; // 1s

  for (let i = 0; i < MAX_RETRIES; i++) {
    const { data, error } = await supabase
      .from('commandes')
      .select(`
        code_commande,
        date_creation,
        client_nom,
        client_adresse,
        client_telephone,
        client_email,
        date_livraison,
        statut_livraison,
        montant_total,
        methode_paiement,
        articles_commande (
          quantite,
          prix_unitaire_cmd,
          produits ( nom )
        )
      `)
      .eq('code_commande', code)
      .single();

    if (!error && data) {
      return data as Commande;
    }

    if (i < MAX_RETRIES - 1) {
      console.log(`Order not found, retrying in ${RETRY_DELAY}ms... (Attempt ${i + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    } else {
       console.error(`Error fetching order after ${MAX_RETRIES} attempts:`, error);
    }
  }

  return null;
}

// The page component
export default async function TicketPage({ params }: { params: { code: string } }) {
  const { code } = params;
  const order = await getOrderDetails(code);

  if (!order) {
    notFound();
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
            {/* Order Code */}
            <TicketDisplay code={order.code_commande} />

            {/* Client and Delivery Info */}
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

            {/* Order Items */}
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

            {/* Total */}
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
