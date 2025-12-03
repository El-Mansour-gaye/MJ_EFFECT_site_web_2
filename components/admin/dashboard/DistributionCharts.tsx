// components/admin/dashboard/DistributionCharts.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatISO } from 'date-fns';

interface DistributionData {
  name: string;
  value: number;
}

interface DistributionChartsProps {
  dateRange: { from: Date; to: Date };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DistributionCharts = ({ dateRange }: DistributionChartsProps) => {
  const [paymentMethods, setPaymentMethods] = useState<DistributionData[]>([]);
  const [orderStatus, setOrderStatus] = useState<DistributionData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dateRange.from || !dateRange.to) return;

    const fetchData = async () => {
      const token = sessionStorage.getItem("admin-auth-token");
      if (!token) return;

      const startDate = formatISO(dateRange.from, { representation: 'date' });
      const endDate = formatISO(dateRange.to, { representation: 'date' });

      try {
        const response = await fetch(`/api/admin/dashboard?startDate=${startDate}&endDate=${endDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch distribution data');
        const data = await response.json();

        // Adapt data for the chart
        setPaymentMethods(data.paymentMethods.map((d: any) => ({ name: d.methode_paiement, value: d.count })));
        setOrderStatus(data.orderStatus.map((d: any) => ({ name: d.statut_paiement, value: d.count })));

      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, [dateRange]);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Méthode de Paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={paymentMethods} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Répartition par Statut de Commande</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d" label>
                 {orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistributionCharts;
