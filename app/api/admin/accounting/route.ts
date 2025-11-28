// /app/api/admin/accounting/route.ts
import { NextResponse } from 'next/server';
import {
  mockFinancialCards,
  mockRevenueVsExpenses,
  mockExpenseBreakdown,
  mockExpensesTable,
} from '../../../../lib/mock-data';
// TODO: Import Supabase admin client once ready to fetch real data

export async function GET(request: Request) {
  // The date range will be passed as query parameters
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  // TODO: Implement filtering logic based on startDate and endDate
  // For now, we ignore the parameters and return all mock data.

  try {
    const accountingData = {
      financialCards: mockFinancialCards,
      revenueVsExpenses: mockRevenueVsExpenses,
      expenseBreakdown: mockExpenseBreakdown,
      expensesTable: mockExpensesTable,
    };

    return NextResponse.json(accountingData);
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
