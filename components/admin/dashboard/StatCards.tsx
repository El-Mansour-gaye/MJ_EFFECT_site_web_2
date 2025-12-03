// components/admin/dashboard/StatCards.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, BarChart } from 'lucide-react';
import { formatISO } from 'date-fns';

interface StatsData {
  totalCommandes: number;
  totalClients: number;
  revenusTotaux: number;
  totalAbonnes: number;
}

interface StatCardsProps {
  dateRange: { from: Date; to: Date };
}

const StatCards = ({ dateRange }: StatCardsProps) => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!dateRange.from || !dateRange.to) return;

    const fetchStats = async () => {
      const token = sessionStorage.getItem("admin-auth-token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      const startDate = formatISO(dateRange.from, { representation: 'date' });
      const endDate = formatISO(dateRange.to, { representation: 'date' });

      try {
        const response = await fetch(`/api/admin/dashboard?startDate=${startDate}&endDate=${endDate}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats(data.statisticCards);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchStats();
  }, [dateRange]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!stats) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-inter">Total Commandes</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-playfair">{stats.totalCommandes}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-inter">Total Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-playfair">{stats.totalClients}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-inter">Revenus Totaux</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-playfair">{formatCurrency(stats.revenusTotaux)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium font-inter">Total Abonnés</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-playfair">{stats.totalAbonnes}</div>
        </CardContent>
      </Card>
    </div>
  );
};


const CardSkeleton = () => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </CardHeader>
        <CardContent>
            <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </CardContent>
    </Card>
);


export default StatCards;
