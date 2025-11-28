// /app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/session';
import {
  mockStatisticCards,
  mockSalesByMonth,
  mockPaymentMethods,
  mockOrderStatus,
} from '../../../../lib/mock-data';
// TODO: Import Supabase admin client once ready to fetch real data

export async function GET() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // This is where you would fetch data from Supabase
    // For now, we are returning mock data as requested.
    const dashboardData = {
      statisticCards: mockStatisticCards,
      salesByMonth: mockSalesByMonth,
      paymentMethods: mockPaymentMethods,
      orderStatus: mockOrderStatus,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
