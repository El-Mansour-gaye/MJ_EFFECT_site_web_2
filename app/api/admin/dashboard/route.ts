// /app/api/admin/dashboard/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();

  try {
    // 1. Fetch total commandes
    const { count: totalCommandes, error: commandesError } = await supabase
      .from('commandes')
      .select('*', { count: 'exact', head: true });

    if (commandesError) throw commandesError;

    // 2. Fetch total clients
    const { count: totalClients, error: clientsError } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });

    if (clientsError) throw clientsError;

    // 3. Fetch total revenus (sum of montant_total for paid orders)
    const { data: revenusData, error: revenusError } = await supabase
      .from('commandes')
      .select('montant_total')
      .in('statut_paiement', ['PAYE_EN_LIGNE', 'PAYE_PRESENTIEL']);

    if (revenusError) throw revenusError;
    const revenusTotaux = revenusData.reduce((acc, curr) => acc + curr.montant_total, 0);

    // 4. Fetch total abonnés
    const { count: totalAbonnes, error: abonnesError } = await supabase
      .from('abonnements')
      .select('*', { count: 'exact', head: true });

    if (abonnesError) throw abonnesError;

    // 5. Fetch sales by month for the chart
    const { data: salesByMonthData, error: salesByMonthError } = await supabase
      .rpc('get_sales_by_month');

    if (salesByMonthError) throw salesByMonthError;


    // 6. Fetch payment method distribution
    const { data: paymentMethodsData, error: paymentMethodsError } = await supabase
      .rpc('get_payment_method_distribution');

    if (paymentMethodsError) throw paymentMethodsError;

    // 7. Fetch order status distribution
    const { data: orderStatusData, error: orderStatusError } = await supabase
      .rpc('get_order_status_distribution');

    if (orderStatusError) throw orderStatusError;


    const dashboardData = {
      statisticCards: {
        totalCommandes: totalCommandes ?? 0,
        totalClients: totalClients ?? 0,
        revenusTotaux: revenusTotaux ?? 0,
        totalAbonnes: totalAbonnes ?? 0,
      },
      salesByMonth: salesByMonthData,
      paymentMethods: paymentMethodsData,
      orderStatus: orderStatusData,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
