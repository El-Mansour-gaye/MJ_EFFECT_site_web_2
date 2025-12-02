// /app/api/admin/commandes/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

// PUT (update) an order's status
export async function PUT(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { statut_paiement } = await request.json();
  const params = await paramsPromise;


  if (!statut_paiement) {
    return NextResponse.json({ error: 'statut_paiement is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('commandes')
    .update({ statut_paiement })
    .eq('id', params.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
