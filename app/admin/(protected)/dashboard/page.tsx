// /app/admin/(protected)/dashboard/page.tsx
"use client";

import React, { useState } from 'react';
import { DateRangeFilter } from '@/components/admin/shared/DateRangeFilter';
import StatCards from '@/components/admin/dashboard/StatCards';
import SalesChart from '@/components/admin/dashboard/SalesChart';
import DistributionCharts from '@/components/admin/dashboard/DistributionCharts';
import { startOfYear, endOfYear } from 'date-fns';

const DashboardPage = () => {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: startOfYear(new Date()),
        to: endOfYear(new Date()),
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold font-playfair">Dashboard</h1>
                <DateRangeFilter onDateChange={setDateRange} />
            </div>

            {/* Key Metric Cards */}
            <StatCards dateRange={dateRange} />

            {/* Sales Chart */}
            <div className="mt-8">
                <SalesChart dateRange={dateRange} />
            </div>

            {/* Distribution Charts */}
            <DistributionCharts dateRange={dateRange} />
        </div>
    );
};

export default DashboardPage;
