// /app/api/admin/comptabilite/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

// GET a single expense by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from('depenses').select('*').eq('id', params.id).single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// PUT (update) an expense
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  const expenseData = await request.json();

  const { data, error } = await supabase.from('depenses').update(expenseData).eq('id', params.id).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE an expense
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    if (!isAdmin(request)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from('depenses').delete().eq('id', params.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Expense deleted successfully' });
}
