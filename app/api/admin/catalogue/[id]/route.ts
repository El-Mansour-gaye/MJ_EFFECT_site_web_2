// /app/api/admin/catalogue/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

// GET a single product by ID
export async function GET(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const params = await paramsPromise;
  const { data, error } = await supabase.from('produits').select('*').eq('id', params.id).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// PUT (update) a product
export async function PUT(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const productData = await request.json();
  const params = await paramsPromise;

  const { data, error } = await supabase.from('produits').update(productData).eq('id', params.id).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE a product
export async function DELETE(request: NextRequest, { params: paramsPromise }: { params: Promise<{ id: string }> }) {
    if (!isAdmin(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseAdmin();
    const params = await paramsPromise;
    const productId = params.id;

    // Check if the product is in any order
    const { data: orderItems, error: orderError } = await supabase
        .from('articles_commande')
        .select('produit_id')
        .eq('produit_id', productId);

    if (orderError) {
        return NextResponse.json({ error: `Failed to check orders: ${orderError.message}` }, { status: 500 });
    }

    if (orderItems && orderItems.length > 0) {
        return NextResponse.json({ error: 'Ce produit ne peut pas être supprimé car il est inclus dans des commandes existantes.' }, { status: 409 });
    }

    // If not in any order, proceed with deletion
    const { error: deleteError } = await supabase.from('produits').delete().eq('id', productId);

    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
}
