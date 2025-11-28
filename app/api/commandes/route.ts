// /app/api/commandes/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin'; // Use the admin client

export async function POST(request: Request) {
  const supabaseAdmin = createSupabaseAdmin();
  console.log("--- Creating new order ---");
  try {
    const body = await request.json();
    const { cart_content, client_info, payment_method } = body;
    console.log("Received data:", { cart_content, client_info, payment_method });


    if (!cart_content || cart_content.length === 0) {
      throw new Error("Cart is empty");
    }

    // 1. Calculate the total amount
    const montant_total = cart_content.reduce((acc: number, item: any) => {
        return acc + item.prix_fcfa * item.quantite;
    }, 0);
    console.log("Calculated total:", montant_total);

    // 2. Create the main order in the 'commandes' table
    console.log("Inserting into 'commandes' table...");
    const { data: commandeData, error: commandeError } = await supabaseAdmin
      .from('commandes')
      .insert({
        client_nom: client_info.nom,
        client_telephone: client_info.telephone,
        montant_total,
        statut_paiement: 'en_attente', // Default status
        methode_paiement: payment_method,
      })
      .select('id')
      .single();

    if (commandeError) throw commandeError;
    console.log("Order created with ID:", commandeData.id);

    const commande_id = commandeData.id;

    // 3. Create the order items in the 'articles_commande' table
    const articles_commande = cart_content.map((item: any) => ({
      commande_id,
      produit_id: item.produit_id,
      quantite: item.quantite,
      prix_unitaire_cmd: item.prix_fcfa,
    }));

    console.log("Inserting into 'articles_commande' table...");
    const { error: articlesError } = await supabaseAdmin
      .from('articles_commande')
      .insert(articles_commande);

    if (articlesError) throw articlesError;
    console.log("Order items created.");

    // Optional: Create or update client in 'clients' table
    if(client_info.telephone){
        console.log("Upserting client...");
        const { error: clientError } = await supabaseAdmin
        .from('clients')
        .upsert(
            { nom: client_info.nom, telephone: client_info.telephone, email: client_info.email },
            { onConflict: 'telephone' }
        );
        if (clientError) console.warn('Error upserting client:', clientError);
    }

    console.log("--- Order creation successful ---");
    return NextResponse.json({ success: true, commande_id });

  } catch (error) {
    console.error('--- Order creation failed ---');
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
