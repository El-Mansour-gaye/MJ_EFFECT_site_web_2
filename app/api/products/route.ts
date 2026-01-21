import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  try {
    const supabase = createSupabaseAdmin();
    let query = supabase
      .from('produits')
      .select('*')
      .eq('is_archived', false)
      .order('nom', { ascending: true });

    if (search) {
      query = query.ilike('nom', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
