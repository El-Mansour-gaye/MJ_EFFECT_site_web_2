// /app/api/admin/produits/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    const supabase = createSupabaseAdmin();
    let supabaseQuery = supabase
      .from('produits')
      .select('id, nom, prix_fcfa, stock_disponible as stock');

    if (query) {
      supabaseQuery = supabaseQuery.ilike('nom', `%${query}%`);
    }

    // Always apply a limit to prevent performance issues
    const { data, error } = await supabaseQuery
      .order('nom', { ascending: true })
      .limit(50); // A reasonable limit for dropdowns

    if (error) {
      console.error('Supabase query failed:', error);
      throw error;
    }

    // Restore the original response shape { products: data }
    return NextResponse.json({ products: data }, { status: 200 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
