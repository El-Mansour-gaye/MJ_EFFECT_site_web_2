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
  const startDate = searchParams.get('startDate') || formatISO(startOfYear(new Date()), { representation: 'date' });
  const endDate = searchParams.get('endDate') || formatISO(endOfYear(new Date()), { representation: 'date' });

  const supabase = createSupabaseAdmin();

  // Initialize data with default values
  let totalCommandes = 0;
  let totalClients = 0;
  let revenusTotaux = 0;
  let salesByMonthData: any[] = [];
  let paymentMethodsData: any[] = [];
  let orderStatusData: any[] = [];
  let totalImportCost = 0;
  let potentialGrossMargin = 0;
  let importCostsByDate: any[] = [];

  // 1. Fetch total commandes
  try {
    const { count, error } = await supabase
      .from('commandes')
      .select('*', { count: 'exact', head: true })
      .gte('date_creation', startDate)
      .lte('date_creation', endDate);
    if (error) throw error;
    totalCommandes = count ?? 0;
  } catch (error) {
    console.error('Error fetching total commandes:', error);
  }

  // 2. Fetch total clients
  try {
    const { count, error } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    totalClients = count ?? 0;
  } catch (error) {
    console.error('Error fetching total clients:', error);
  }

  // 3. Fetch total revenus
  try {
    const { data, error } = await supabase
      .from('commandes')
      .select('montant_total')
      .in('statut_paiement', ['PAYE_EN_LIGNE', 'PAYE_PRESENTIEL'])
      .gte('date_creation', startDate)
      .lte('date_creation', endDate);
    if (error) throw error;
    revenusTotaux = data.reduce((acc, curr) => acc + curr.montant_total, 0);
  } catch (error) {
    console.error('Error fetching total revenus:', error);
  }

  // 4. Fetch sales by month
  try {
    const { data, error } = await supabase.rpc('get_sales_by_month', { start_date: startDate, end_date: endDate });
    if (error) throw error;
    salesByMonthData = data ?? [];
  } catch (error) {
    console.error('Error fetching sales by month:', error);
  }

  // 5. Fetch payment method distribution
  try {
    const { data, error } = await supabase.rpc('get_payment_method_distribution', { start_date: startDate, end_date: endDate });
    if (error) throw error;
    paymentMethodsData = data ?? [];
  } catch (error) {
    console.error('Error fetching payment method distribution:', error);
  }

  // 6. Fetch order status distribution
  try {
    const { data, error } = await supabase.rpc('get_order_status_distribution', { start_date: startDate, end_date: endDate });
    if (error) throw error;
    orderStatusData = data ?? [];
  } catch (error) {
    console.error('Error fetching order status distribution:', error);
  }

  // 7. Fetch arrivages for import costs and margin
  try {
      const { data: arrivagesData, error: arrivagesError } = await supabase
      .from('arrivages')
      .select(`
          taux_change_usd_to_fcfa,
          transport_global_fcfa,
          details_arrivage (
          quantite,
          prix_achat_usd_unitaire,
          marge_fcfa
          )
      `)
      .gte('date', startDate)
      .lte('date', endDate);

      if (arrivagesError) throw arrivagesError;

      totalImportCost = arrivagesData.reduce((acc, arrivage) => {
          const totalPurchaseCostUSD = arrivage.details_arrivage.reduce((detailAcc, detail) => {
              return detailAcc + (detail.quantite * detail.prix_achat_usd_unitaire);
          }, 0);
          const totalPurchaseCostFCFA = totalPurchaseCostUSD * arrivage.taux_change_usd_to_fcfa;
          return acc + totalPurchaseCostFCFA + arrivage.transport_global_fcfa;
      }, 0);

      potentialGrossMargin = arrivagesData.reduce((acc, arrivage) => {
          return acc + arrivage.details_arrivage.reduce((detailAcc, detail) => {
              return detailAcc + (detail.quantite * detail.marge_fcfa);
          }, 0);
      }, 0);

      importCostsByDate = arrivagesData.reduce((acc, arrivage) => {
          const date = formatISO(new Date(arrivage.date), { representation: 'date' });
          const totalCost = (arrivage.details_arrivage.reduce((sum, d) => sum + (d.quantite * d.prix_achat_usd_unitaire), 0) * arrivage.taux_change_usd_to_fcfa) + arrivage.transport_global_fcfa;

          const existingEntry = acc.find(item => item.date === date);
          if (existingEntry) {
              existingEntry.totalCost += totalCost;
          } else {
              acc.push({ date, totalCost });
          }
          return acc;
      }, [] as { date: string; totalCost: number }[]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  } catch (error) {
      console.error('Error fetching arrivages data:', error);
  }


  const dashboardData = {
    statisticCards: {
      totalCommandes,
      totalClients,
      revenusTotaux,
      totalImportCost,
      potentialGrossMargin,
    },
    salesByMonth: salesByMonthData,
    paymentMethods: paymentMethodsData,
    orderStatus: orderStatusData,
    importCostsByDate: importCostsByDate,
  };

  return NextResponse.json(dashboardData);
}
