// /app/api/admin/commandes/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createAdminClient as createSupabaseAdmin } from '@/lib/supabase/admin'; // Alias for consistency
import { customAlphabet } from 'nanoid';

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const rangeStart = (page - 1) * limit;
  const rangeEnd = rangeStart + limit - 1;

  const supabase = createSupabaseAdmin();
  const { data, error, count } = await supabase
    .from('commandes')
    .select(`
      id,
      code_commande,
      date_livraison,
      statut_livraison,
      client_nom,
      client_telephone,
      client_adresse,
      montant_total,
      statut_paiement,
      methode_paiement,
      date_creation,
      articles_commande (
        quantite,
        prix_unitaire_cmd,
        produits ( nom )
      )
    `, { count: 'exact' })
    .order('date_creation', { ascending: false })
    .range(rangeStart, rangeEnd);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data, count });
}


export async function POST(request: NextRequest) {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseAdmin();
    const {
        client,
        isNewClient,
        cart,
        totalAmount,
        deliveryDate,
        paymentStatus,
        deliveryStatus
    } = await request.json();

    try {
      let clientId = client.id;

      // 1. Create client if it's a new one
      if (isNewClient) {
        // Check if client already exists by email or phone
        const { data: existingClient, error: existingClientError } = await supabase
            .from('clients')
            .select('id')
            .or(`email.eq.${client.email},telephone.eq.${client.telephone}`)
            .maybeSingle();

        if (existingClient) {
            clientId = existingClient.id;
        } else {
            const { data: newClientData, error: newClientError } = await supabase
            .from('clients')
            .insert({
                nom: client.nom,
                telephone: client.telephone,
                email: client.email,
                adresse: client.adresse,
            })
            .select('id')
            .single();

            if (newClientError) throw new Error(`Failed to create new client: ${newClientError.message}`);
            clientId = newClientData.id;
        }
      }

      // 2. Create the order
      const nanoid = customAlphabet('1234567890abcdef', 10);
      const orderCode = `${nanoid(5)}-${nanoid(5)}`;

      const { data: orderData, error: orderError } = await supabase
        .from('commandes')
        .insert({
          client_id: clientId,
          montant_total: totalAmount,
          statut_paiement: paymentStatus,
          statut_livraison: deliveryStatus,
          methode_paiement: 'MANUELLE',
          date_livraison: deliveryDate || new Date().toISOString(),
          code_commande: orderCode,
          // Copy client info for denormalization
          client_nom: client.nom,
          client_telephone: client.telephone,
          client_email: client.email,
          client_adresse: client.adresse,
        })
        .select('id')
        .single();

      if (orderError) throw new Error(`Failed to create order: ${orderError.message}`);
      const orderId = orderData.id;

      // 3. Insert order items
      const orderItems = cart.map((item: any) => ({
        commande_id: orderId,
        produit_id: item.product.id,
        quantite: item.quantity,
        prix_unitaire_cmd: item.product.prix_fcfa,
      }));

      const { error: itemsError } = await supabase
        .from('articles_commande')
        .insert(orderItems);

      if (itemsError) throw new Error(`Failed to insert order items: ${itemsError.message}`);

      return NextResponse.json({ message: 'Order created successfully', orderId }, { status: 201 });

    } catch (error: any) {
      console.error("Order creation error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
