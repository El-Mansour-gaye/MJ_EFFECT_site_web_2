// /app/api/admin/comptabilite/rentabilite/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { startOfYear, endOfYear, formatISO } from 'date-fns';

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate') || formatISO(startOfYear(new Date()), { representation: 'date' });
  const endDate = searchParams.get('endDate') || formatISO(endOfYear(new Date()), { representation: 'date' });

  const supabase = createSupabaseAdmin();

  try {
    const { data, error } = await supabase
      .rpc('get_profitability_by_date', { start_date: startDate, end_date: endDate });

    if (error) throw error;

    // The RPC returns an array with a single object
    const profitabilityData = data[0] || { revenus_totaux: 0, depenses_totales: 0, profit_net: 0 };

    return NextResponse.json(profitabilityData);
  } catch (error) {
    console.error('Error fetching profitability data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching profitability data' }, { status: 500 });
  }
}
