// /app/api/commandes/[orderCode]/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

async function getOrderDetails(orderCode: string) {
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
      .eq('code_commande', orderCode)
      .single();

    if (!error && data) {
      return data;
    }

    if (i < MAX_RETRIES - 1) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    } else {
      console.error(`Failed to fetch order ${orderCode} after ${MAX_RETRIES} attempts:`, error);
    }
  }

  return null;
}

export async function GET(
  request: Request,
  { params }: { params: { orderCode: string } }
) {
  try {
    const orderCode = params.orderCode;

    if (!orderCode) {
      return NextResponse.json({ error: 'Order code is required' }, { status: 400 });
    }

    const order = await getOrderDetails(orderCode);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('[ORDER_API]', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
