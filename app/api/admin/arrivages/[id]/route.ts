// /app/api/admin/arrivages/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/admin-auth';

// GET - Récupérer un arrivage spécifique avec ses détails
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAdmin(req)) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "ID de l'arrivage manquant." }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    // 1. Récupérer les informations de l'arrivage principal
    const { data: arrivage, error: arrivageError } = await supabase
      .from('arrivages')
      .select('*')
      .eq('id', id)
      .single();

    if (arrivageError) {
      if (arrivageError.code === 'PGRST116') { // PostgREST error for "Not a single row"
        return NextResponse.json({ error: 'Arrivage non trouvé.' }, { status: 404 });
      }
      console.error("Error fetching arrivage:", arrivageError);
      return NextResponse.json({ error: arrivageError.message }, { status: 500 });
    }

    // 2. Récupérer les détails de l'arrivage, y compris les noms des produits
    const { data: details, error: detailsError } = await supabase
      .from('details_arrivage')
      .select(`
        *,
        produits (
          nom
        )
      `)
      .eq('arrivage_id', id);

    if (detailsError) {
      console.error("Error fetching arrivage details:", detailsError);
      return NextResponse.json({ error: detailsError.message }, { status: 500 });
    }

    // 3. Combiner les résultats
    const result = {
      ...arrivage,
      details,
    };

    return NextResponse.json(result);

  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
