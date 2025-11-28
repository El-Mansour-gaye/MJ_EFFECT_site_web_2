// components/admin/dashboard/DistributionCharts.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentData {
  name: string;
  value: number;
}

interface OrderStatusData {
  status: string;
  count: number;
}

const COLORS = ['#FF5733', '#D4AF37']; // Orange/Corail and Gold

const PaymentMethodsChart = ({ data }: { data: PaymentData[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-playfair">Méthodes de paiement</CardTitle>
    </CardHeader>
    <CardContent>
        <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    style={{ fontFamily: 'Inter', fontSize: '14px' }}
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip contentStyle={{ fontFamily: 'Inter', fontSize: '14px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </CardContent>
  </Card>
);

const OrderStatusChart = ({ data }: { data: OrderStatusData[] }) => (
    <Card>
        <CardHeader>
            <CardTitle className="font-playfair">Statut des commandes</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 50, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="status" width={100} tick={{ fontFamily: 'Inter', fontSize: '12px' }} />
                        <Tooltip contentStyle={{ fontFamily: 'Inter', fontSize: '14px' }} />
                        <Bar dataKey="count" fill="#FF5733" barSize={30} name="Commandes" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </CardContent>
    </Card>
);


const DistributionCharts = () => {
    const [paymentData, setPaymentData] = useState<PaymentData[] | null>(null);
    const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/admin/stats');
          if (!response.ok) {
            throw new Error('Failed to fetch distribution data');
          }
          const data = await response.json();
          setPaymentData(data.paymentMethods);
          setOrderStatusData(data.orderStatus);
        } catch (err) {
          setError((err as Error).message);
        }
      };

      fetchData();
    }, []);

    if (error) {
      return <div className="text-red-500">Error: {error}</div>;
    }

    if (!paymentData || !orderStatusData) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ChartSkeleton />
                <ChartSkeleton />
            </div>
        )
    }


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <PaymentMethodsChart data={paymentData} />
            <OrderStatusChart data={orderStatusData} />
        </div>
    );
  };


const ChartSkeleton = () => (
    <div className="w-full h-80 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading Chart...</p>
    </div>
);

export default DistributionCharts;
