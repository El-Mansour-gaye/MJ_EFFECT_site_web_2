// /app/api/admin/arrivages/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/admin';
import { adminAuth } from '@/lib/admin-auth';

// GET - Lister tous les arrivages
export async function GET(req: Request) {
  try {
    const authError = await adminAuth(req);
    if (authError) {
      return authError;
    }

    const supabase = createClient();
    const { data: arrivages, error } = await supabase
      .from('arrivages')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching arrivages:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(arrivages);

  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST - Créer un nouvel arrivage
export async function POST(req: Request) {
  try {
    const authError = await adminAuth(req);
    if (authError) {
      return authError;
    }

    const { arrivage, details } = await req.json();

    if (!arrivage || !details || !Array.isArray(details) || details.length === 0) {
      return NextResponse.json({ error: 'Données invalides. Un arrivage et au moins un détail sont requis.' }, { status: 400 });
    }

    const supabase = createClient();

    // 1. Insérer l'arrivage principal
    const { data: newArrivage, error: arrivageError } = await supabase
      .from('arrivages')
      .insert({
        nom: arrivage.nom,
        taux_change_usd_to_fcfa: arrivage.taux_change_usd_to_fcfa,
        transport_global_fcfa: arrivage.transport_global_fcfa,
      })
      .select()
      .single();

    if (arrivageError) {
      console.error("Error creating arrivage:", arrivageError);
      return NextResponse.json({ error: arrivageError.message }, { status: 500 });
    }

    // 2. Préparer et insérer les détails de l'arrivage
    const detailsToInsert = details.map(d => ({
      arrivage_id: newArrivage.id,
      produit_id: d.produit_id,
      quantite: d.quantite,
      prix_achat_usd_unitaire: d.prix_achat_usd_unitaire,
      marge_fcfa: d.marge_fcfa,
    }));

    const { error: detailsError } = await supabase
      .from('details_arrivage')
      .insert(detailsToInsert);

    if (detailsError) {
      console.error("Error creating arrivage details:", detailsError);
      // Attempt to clean up the created arrivage to avoid orphan data
      await supabase.from('arrivages').delete().eq('id', newArrivage.id);
      return NextResponse.json({ error: detailsError.message }, { status: 500 });
    }

    return NextResponse.json(newArrivage, { status: 201 });

  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
