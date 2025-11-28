// components/admin/comptabilite/AccountingPageClient.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { DateRange } from 'react-day-picker';
import { startOfMonth, endOfDay } from 'date-fns';
import { DateRangePicker } from './DateRangePicker';
import FinancialCards from './FinancialCards';
import { RevenueChart, ExpenseChart } from './AccountingCharts';
import ExpensesTable from './ExpensesTable';

const AccountingPageClient = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: startOfMonth(new Date()),
        to: endOfDay(new Date()),
    });
    const [data, setData] = useState<any>(null); // Replace 'any' with a proper interface later
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (range: DateRange | undefined) => {
        if (!range?.from || !range?.to) return;
        setLoading(true);
        setError(null);

        const startDate = range.from.toISOString();
        const endDate = range.to.toISOString();

        const token = sessionStorage.getItem("admin-auth-token");
        if (!token) {
            setError("Unauthorized");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/admin/accounting?startDate=${startDate}&endDate=${endDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch accounting data');
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData(dateRange);
    }, [dateRange, fetchData]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-playfair">Comptabilité</h1>
                <DateRangePicker initialDateRange={dateRange} onDateChange={setDateRange} />
            </div>

            {loading && <LoadingSkeleton />}
            {error && <div className="text-red-500">Erreur: {error}</div>}

            {data && !loading && (
                <div className="space-y-8">
                    <FinancialCards data={data.financialCards} />
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3">
                            <RevenueChart data={data.revenueVsExpenses} />
                        </div>
                        <div className="lg:col-span-2">
                            <ExpenseChart data={data.expenseBreakdown} />
                        </div>
                    </div>
                    <ExpensesTable data={data.expensesTable} />
                </div>
            )}
        </div>
    );
};

const LoadingSkeleton = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
);


export default AccountingPageClient;
