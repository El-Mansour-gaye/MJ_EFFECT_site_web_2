// components/admin/dashboard/SalesChart.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesData {
  month: string;
  sales: number;
}

const SalesChart = () => {
  const [salesData, setSalesData] = useState<SalesData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      const token = sessionStorage.getItem("admin-auth-token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      try {
        const response = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setSalesData(data.salesByMonth);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchSalesData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    return `${(value / 1000).toFixed(0)}K`;
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair">Ventes par mois</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
            { !salesData ? <ChartSkeleton /> : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={salesData}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis dataKey="month" style={{ fontFamily: 'Inter', fontSize: '12px' }} />
                    <YAxis tickFormatter={formatCurrency} style={{ fontFamily: 'Inter', fontSize: '12px' }} />
                    <Tooltip
                        contentStyle={{ fontFamily: 'Inter', fontSize: '14px' }}
                        formatter={(value: number) => [new Intl.NumberFormat('fr-FR').format(value) + ' FCFA', 'Ventes']}
                    />
                    <Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: '14px' }} />
                    <Line type="monotone" dataKey="sales" name="Ventes" stroke="#FF5733" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
             )}
        </div>
      </CardContent>
    </Card>
  );
};

const ChartSkeleton = () => (
    <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading Chart...</p>
    </div>
);


export default SalesChart;
