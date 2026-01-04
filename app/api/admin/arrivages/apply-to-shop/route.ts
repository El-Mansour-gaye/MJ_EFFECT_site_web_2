// /app/api/admin/arrivages/apply-to-shop/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/admin';
import { adminAuth } from '@/lib/admin-auth';

// POST - Appliquer les prix et stocks à la boutique pour un arrivage donné
export async function POST(req: Request) {
  try {
    const authError = await adminAuth(req);
    if (authError) {
      return authError;
    }

    const { arrivage_id } = await req.json();

    if (!arrivage_id) {
      return NextResponse.json({ error: "ID de l'arrivage manquant." }, { status: 400 });
    }

    const supabase = createClient();

    // 1. Récupérer l'arrivage et ses détails
    const { data: arrivageData, error: fetchError } = await supabase
      .from('arrivages')
      .select(`
        *,
        details_arrivage (
          *,
          produits (
            stock
          )
        )
      `)
      .eq('id', arrivage_id)
      .single();

    if (fetchError || !arrivageData) {
      console.error("Error fetching arrivage for applying to shop:", fetchError);
      return NextResponse.json({ error: 'Arrivage non trouvé ou erreur de lecture.' }, { status: 404 });
    }

    const { taux_change_usd_to_fcfa, transport_global_fcfa, details_arrivage: details } = arrivageData;

    if (!details || details.length === 0) {
      return NextResponse.json({ error: 'Aucun détail trouvé pour cet arrivage. Rien à appliquer.' }, { status: 400 });
    }

    // 2. Calculer le total des quantités pour répartir le transport
    const totalQuantite = details.reduce((acc, detail) => acc + detail.quantite, 0);
    const transportParUnite = totalQuantite > 0 ? transport_global_fcfa / totalQuantite : 0;

    // 3. Préparer les opérations de mise à jour pour chaque produit
    const productUpdates = details.map(detail => {
      const prixRevientUnitaire = (detail.prix_achat_usd_unitaire * taux_change_usd_to_fcfa) + transportParUnite;
      const prixVenteFinal = Math.ceil((prixRevientUnitaire + detail.marge_fcfa) / 10) * 10; // Arrondi à la dizaine supérieure

      const nouveauStock = (detail.produits?.stock || 0) + detail.quantite;

      return {
        id: detail.produit_id,
        prix_fcfa: prixVenteFinal,
        stock: nouveauStock,
      };
    });

    // 4. Exécuter la mise à jour en masse (upsert)
    const { error: updateError } = await supabase
      .from('produits')
      .upsert(productUpdates);

    if (updateError) {
      console.error("Error updating products:", updateError);
      return NextResponse.json({ error: 'Erreur lors de la mise à jour des produits.', details: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Les prix et les stocks ont été mis à jour avec succès.', count: productUpdates.length });

  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
