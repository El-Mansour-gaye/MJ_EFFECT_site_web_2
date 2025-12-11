// /app/api/commandes/route.ts
import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import crypto from 'crypto';
import { sendOrderConfirmationEmail } from '@/lib/email';

// Fonction pour générer un code de commande unique et court
function generateOrderCode() {
  const bytes = crypto.randomBytes(5);
  const hex = bytes.toString('hex');
  return `${hex.slice(0, 5)}-${hex.slice(5, 10)}`;
}

export async function POST(request: Request) {
  const supabaseAdmin = createSupabaseAdmin();
  console.log("--- Creating new order ---");
  try {
    const body = await request.json();
    const { cart_content, client_info, payment_method, strategie_expedition } = body;
    console.log("Received data:", { cart_content, client_info, payment_method, strategie_expedition });


    if (!cart_content || cart_content.length === 0) {
      throw new Error("Cart is empty");
    }

    // 1. Calculate the total amount
    const montant_total = cart_content.reduce((acc: number, item: any) => {
        return acc + item.prix_fcfa * item.quantite;
    }, 0);
    console.log("Calculated total:", montant_total);

    // 2. Generate a unique order code
    const code_commande = generateOrderCode();
    console.log("Generated Order Code:", code_commande);

    // 3. Create the main order in the 'commandes' table
    console.log("Inserting into 'commandes' table...");
    const { data: commandeData, error: commandeError } = await supabaseAdmin
      .from('commandes')
      .insert({
        client_nom: client_info.nom,
        client_telephone: client_info.telephone,
        client_adresse: client_info.adresse,
        client_email: client_info.email,
        montant_total,
        statut_paiement: 'EN_ATTENTE',
        methode_paiement: payment_method,
        code_commande,
        date_livraison: client_info.date_livraison,
        strategie_expedition: strategie_expedition || 'COMPLETE', // Add shipping strategy
      })
      .select('id, code_commande')
      .single();

    if (commandeError) throw commandeError;
    console.log("Order created with ID:", commandeData.id);

    const commande_id = commandeData.id;

    // 4. Fetch product stock info
    const productIds = cart_content.map((item: any) => item.produit_id);
    const { data: products, error: productsError } = await supabaseAdmin
      .from('produits')
      .select('id, stock')
      .in('id', productIds);

    if (productsError) throw productsError;

    const stockMap = new Map(products.map(p => [p.id, p.stock]));

    // 5. Create the order items with pre-order flag
    const articles_commande = cart_content.map((item: any) => ({
      commande_id,
      produit_id: item.produit_id,
      quantite: item.quantite,
      prix_unitaire_cmd: item.prix_fcfa,
      est_precommande: (stockMap.get(item.produit_id) || 0) <= 0, // Set pre-order flag
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
        const clientData: { nom: string; telephone: string; email?: string } = {
            nom: client_info.nom,
            telephone: client_info.telephone,
        };

        if (client_info.email) {
            clientData.email = client_info.email;
        }

        const { error: clientError } = await supabaseAdmin
        .from('clients')
        .upsert(clientData, { onConflict: 'telephone' });

        if (clientError) console.warn('Error upserting client:', clientError);
    }

    const full_order_details = {
      ...client_info,
      commande_id,
      code_commande: code_commande, // Use the generated code directly
      montant_total,
      methode_paiement: payment_method,
      articles: cart_content,
      date_creation: new Date().toISOString(),
      statut_livraison: 'En préparation', // Matches default value
    };

    // Send confirmation emails (don't await to avoid blocking the response)
    sendOrderConfirmationEmail(full_order_details);

    console.log("--- Order creation successful ---");
    return NextResponse.json({ success: true, order: full_order_details });

  } catch (error) {
    console.error('--- Order creation failed ---');
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}
