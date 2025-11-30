// /app/api/products/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from('produits')
    .select('*')
    .order('nom', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
