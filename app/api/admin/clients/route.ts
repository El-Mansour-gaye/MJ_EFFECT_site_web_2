// /app/api/admin/clients/route.ts
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
    .from('clients')
    .select('*', { count: 'exact' })
    .order('date_inscription', { ascending: false })
    .range(rangeStart, rangeEnd);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}
