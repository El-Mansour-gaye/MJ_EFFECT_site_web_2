// /app/admin/(protected)/dashboard/page.tsx
import React from 'react';
import StatCards from '@/components/admin/dashboard/StatCards';
import SalesChart from '@/components/admin/dashboard/SalesChart';
import DistributionCharts from '@/components/admin/dashboard/DistributionCharts';

const DashboardPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-playfair">Dashboard</h1>

            {/* Key Metric Cards */}
            <StatCards />

            {/* Sales Chart */}
            <div className="mt-8">
                <SalesChart />
            </div>

            {/* Distribution Charts */}
            <DistributionCharts />
        </div>
    );
};

export default DashboardPage;
