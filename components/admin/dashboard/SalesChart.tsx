// components/admin/dashboard/SalesChart.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  month: string;
  total_sales: number;
}

const SalesChart = () => {
  const [chartData, setChartData] = useState<SalesData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const token = sessionStorage.getItem("admin-auth-token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      try {
        const response = await fetch('/api/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch sales data');
        }
        const data = await response.json();
        setChartData(data.salesByMonth);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchChartData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!chartData) {
    return <CardSkeleton />;
  }

  const data = {
    labels: chartData.map(d => d.month),
    datasets: [
      {
        label: 'Ventes Mensuelles (FCFA)',
        data: chartData.map(d => d.total_sales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance des Ventes Mensuelles',
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventes Mensuelles</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

const CardSkeleton = () => (
    <Card>
        <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </CardHeader>
        <CardContent>
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </CardContent>
    </Card>
);

export default SalesChart;
