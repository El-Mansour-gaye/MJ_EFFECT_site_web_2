// /app/api/admin/commandes/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

// PATCH (update) an order's status (payment or delivery)
export async function PATCH(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { statut_paiement, statut_livraison } = await request.json();
  const params = await paramsPromise;

  const updateData: { [key: string]: any } = {};
  if (statut_paiement) {
    updateData.statut_paiement = statut_paiement;
  }
  if (statut_livraison) {
    updateData.statut_livraison = statut_livraison;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'At least one field to update is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('commandes')
    .update(updateData)
    .eq('id', params.id)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
