// /app/api/admin/clients/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ message: 'Search query is required' }, { status: 400 });
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from('clients')
      .select('id, nom, telephone, email, adresse')
      .or(`nom.ilike.%${query}%,email.ilike.%${query}%,telephone.ilike.%${query}%`)
      .limit(10);

    if (error) {
      throw error;
    }

    return NextResponse.json({ clients: data }, { status: 200 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'Failed to search clients' }, { status: 500 });
  }
}
