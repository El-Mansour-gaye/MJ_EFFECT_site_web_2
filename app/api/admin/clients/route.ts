// /app/api/admin/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { isAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const rangeStart = (page - 1) * limit;
    const rangeEnd = rangeStart + limit - 1;

    const supabase = createAdminClient();
    const { data, error, count } = await supabase
      .from('clients')
      .select('*', { count: 'exact' })
      .order('date_inscription', { ascending: false })
      .range(rangeStart, rangeEnd);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, count });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
  }

  try {
    const { nom, telephone, email, adresse } = await req.json();

    if (!nom) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('clients')
      .insert([{ nom, telephone, email, adresse }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ message: 'Failed to create client', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Client created successfully', client: data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
