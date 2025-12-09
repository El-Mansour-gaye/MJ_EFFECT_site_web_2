// app/commande/ticket/[code]/page.tsx
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import TicketPageClient from '@/components/commande/ticket-page-client';

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

// Function to fetch order details from Supabase
async function getOrderDetails(code: string): Promise<Commande | null> {
  const supabase = createSupabaseAdmin();
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

  if (error || !data) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data as Commande;
}

// The page component
export default async function TicketPage({ params }: { params: { code: string } }) {
  const { code } = params;
  const order = await getOrderDetails(code);

  if (!order) {
    notFound();
  }

  return <TicketPageClient order={order} />;
}
