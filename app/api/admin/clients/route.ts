
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'date_inscription';
  const order = searchParams.get('order') || 'desc';

  const offset = (page - 1) * limit;

  let query = supabase
    .from('clients')
    .select(`
      *,
      commandes(count)
    `, { count: 'exact' })
    .order(sortBy, { ascending: order === 'asc' })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(`nom.ilike.%${search}%,email.ilike.%${search}%,telephone.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    totalPages: Math.ceil((count || 0) / limit),
  });
}
