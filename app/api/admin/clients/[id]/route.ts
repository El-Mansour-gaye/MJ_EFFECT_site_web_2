
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

  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();

  if (clientError) {
    return NextResponse.json({ error: clientError.message }, { status: 500 });
  }

  const { data: commandes, error: commandesError } = await supabase
    .from('commandes')
    .select('*')
    .eq('client_telephone', client.telephone);

  if (commandesError) {
    return NextResponse.json({ error: commandesError.message }, { status: 500 });
  }

  return NextResponse.json({ ...client, commandes });
}
