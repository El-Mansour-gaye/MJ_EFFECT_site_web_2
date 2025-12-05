// /app/api/admin/commandes/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const rangeStart = (page - 1) * limit;
  const rangeEnd = rangeStart + limit - 1;

  const supabase = createSupabaseAdmin();
  const { data, error, count } = await supabase
    .from('commandes')
    .select(`
      id,
      code_commande,
      date_livraison,
      statut_livraison,
      client_nom,
      client_telephone,
      client_adresse,
      montant_total,
      statut_paiement,
      methode_paiement,
      date_creation,
      articles_commande (
        quantite,
        prix_unitaire_cmd,
        produits ( nom )
      )
    `, { count: 'exact' })
    .order('date_creation', { ascending: false })
    .range(rangeStart, rangeEnd);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}
