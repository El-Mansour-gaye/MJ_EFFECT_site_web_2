
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { id } = params;

  const { data: commande, error: commandeError } = await supabase
    .from('commandes')
    .select('*')
    .eq('id', id)
    .single();

  if (commandeError) {
    return NextResponse.json({ error: commandeError.message }, { status: 500 });
  }

  const { data: articles, error: articlesError } = await supabase
    .from('articles_commande')
    .select('*, produits(nom)')
    .eq('commande_id', id);

  if (articlesError) {
    return NextResponse.json({ error: articlesError.message }, { status: 500 });
  }

  return NextResponse.json({ ...commande, articles });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { id } = params;
  const { statut } = await req.json();

  const { data, error } = await supabase
    .from('commandes')
    .update({ statut })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
