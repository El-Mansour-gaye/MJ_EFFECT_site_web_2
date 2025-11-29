// components/admin/dashboard/DistributionCharts.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DistributionData {
  paymentMethods: { methode_paiement: string; count: number }[];
  orderStatus: { statut_paiement: string; count: number }[];
}

const DistributionCharts = () => {
  const [chartData, setChartData] = useState<DistributionData | null>(null);
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
          throw new Error('Failed to fetch distribution data');
        }
        const data = await response.json();
        setChartData({
            paymentMethods: data.paymentMethods,
            orderStatus: data.orderStatus
        });
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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <CardSkeleton />
            <CardSkeleton />
        </div>
    );
  }

  const paymentMethodsPieData = {
    labels: chartData.paymentMethods.map(d => d.methode_paiement),
    datasets: [
      {
        data: chartData.paymentMethods.map(d => d.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const orderStatusPieData = {
    labels: chartData.orderStatus.map(d => d.statut_paiement),
    datasets: [
      {
        data: chartData.orderStatus.map(d => d.count),
        backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Méthode de Paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie data={paymentMethodsPieData} options={pieOptions} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Statut de Commande</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie data={orderStatusPieData} options={pieOptions} />
        </CardContent>
      </Card>
    </div>
  );
};

const CardSkeleton = () => (
    <Card>
        <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </CardHeader>
        <CardContent>
            <div className="h-48 bg-gray-200 rounded-full w-48 mx-auto animate-pulse"></div>
        </CardContent>
    </Card>
);

export default DistributionCharts;
