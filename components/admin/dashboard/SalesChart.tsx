// components/admin/dashboard/SalesChart.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatISO } from 'date-fns';

interface SalesData {
  month: string;
  total_sales: number;
}

interface SalesChartProps {
  dateRange: { from: Date; to: Date };
}

const SalesChart = ({ dateRange }: SalesChartProps) => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dateRange.from || !dateRange.to) return;

    const fetchSalesData = async () => {
      const token = sessionStorage.getItem("admin-auth-token");
      if (!token) return;

      const startDate = formatISO(dateRange.from, { representation: 'date' });
      const endDate = formatISO(dateRange.to, { representation: 'date' });

      try {
        const response = await fetch(`/api/admin/dashboard?startDate=${startDate}&endDate=${endDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch sales data');
        const data = await response.json();
        setSalesData(data.salesByMonth);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchSalesData();
  }, [dateRange]);

  if (error) return <div className="text-accent">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventes par Mois</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value.toLocaleString('fr-FR')} FCFA`} />
            <Legend />
            <Bar dataKey="total_sales" fill="#8884d8" name="Ventes Totales" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
