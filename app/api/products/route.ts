// /app/api/products/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  const supabase = createSupabaseAdmin();
  const search = request.nextUrl.searchParams.get('search');

  let query = supabase
    .from('produits')
    .select('*')
    .order('nom', { ascending: true });

  if (search) {
    query = query.ilike('nom', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
