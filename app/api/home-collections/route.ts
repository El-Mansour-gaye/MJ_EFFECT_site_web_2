// /app/api/home-collections/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const supabase = createSupabaseAdmin();

  // Fetches all products that are either best-sellers, new arrivals, or sets/packs
  const { data, error } = await supabase
    .from('produits')
    .select(`
      id,
      nom,
      prix_fcfa,
      stock,
      slug,
      is_best_seller,
      is_new_arrival,
      is_set_or_pack,
      category,
      subcategory,
      image,
      images,
      tag,
      details
    `)
    .or('is_best_seller.eq.true,is_new_arrival.eq.true,is_set_or_pack.eq.true')
    .order('nom', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
