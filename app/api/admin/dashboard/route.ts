// /app/api/admin/dashboard/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { startOfYear, endOfYear, formatISO } from 'date-fns';

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  // Default to the current year if no dates are provided
  const startDate = searchParams.get('startDate') || formatISO(startOfYear(new Date()), { representation: 'date' });
  const endDate = searchParams.get('endDate') || formatISO(endOfYear(new Date()), { representation: 'date' });

  const supabase = createSupabaseAdmin();

  try {
    // 1. Fetch total commandes within the date range
    const { count: totalCommandes, error: commandesError } = await supabase
      .from('commandes')
      .select('*', { count: 'exact', head: true })
      .gte('date_creation', startDate)
      .lte('date_creation', endDate);

    if (commandesError) throw commandesError;

    // 2. Fetch total clients registered within the date range
    const { count: totalClients, error: clientsError } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .gte('date_inscription', startDate)
      .lte('date_inscription', endDate);

    if (clientsError) throw clientsError;

    // 3. Fetch total revenus within the date range
    const { data: revenusData, error: revenusError } = await supabase
      .from('commandes')
      .select('montant_total')
      .in('statut_paiement', ['PAYE_EN_LIGNE', 'PAYE_PRESENTIEL'])
      .gte('date_creation', startDate)
      .lte('date_creation', endDate);

    if (revenusError) throw revenusError;
    const revenusTotaux = revenusData.reduce((acc, curr) => acc + curr.montant_total, 0);

    // 4. Fetch sales by month for the chart
    const { data: salesByMonthData, error: salesByMonthError } = await supabase
      .rpc('get_sales_by_month', { start_date: startDate, end_date: endDate });

    if (salesByMonthError) throw salesByMonthError;

    // 6. Fetch payment method distribution, passing dates to the RPC
    const { data: paymentMethodsData, error: paymentMethodsError } = await supabase
      .rpc('get_payment_method_distribution', { start_date: startDate, end_date: endDate });

    if (paymentMethodsError) throw paymentMethodsError;

    // 7. Fetch order status distribution, passing dates to the RPC
    const { data: orderStatusData, error: orderStatusError } = await supabase
      .rpc('get_order_status_distribution', { start_date: startDate, end_date: endDate });

    if (orderStatusError) throw orderStatusError;

    const dashboardData = {
      statisticCards: {
        totalCommandes: totalCommandes ?? 0,
        totalClients: totalClients ?? 0,
        revenusTotaux: revenusTotaux ?? 0,
      },
      salesByMonth: salesByMonthData ?? [],
      paymentMethods: paymentMethodsData ?? [],
      orderStatus: orderStatusData ?? [],
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
