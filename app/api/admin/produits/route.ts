// /app/api/admin/produits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const { nom } = await req.json();

    if (!nom || typeof nom !== 'string' || nom.trim().length === 0) {
      return NextResponse.json({ error: 'Product name is required.' }, { status: 400 });
    }

    const supabase = createSupabaseAdmin();

    // Insert the new product.
    // All other fields can have default values or be null.
    const { data, error } = await supabase
      .from('produits')
      .insert({
        nom: nom.trim(),
        // Sensible defaults for a new product
        prix_fcfa: 0,
        stock_disponible: 0,
        description: '',
        is_active: true,
       })
      .select('id, nom')
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'Un produit avec ce nom existe déjà.' }, { status: 409 });
      }
      console.error('Supabase insert error:', error);
      throw error;
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
