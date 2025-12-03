// /components/admin/comptabilite/ProfitabilityChart.tsx
"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfitabilityData {
  revenus_totaux: number;
  depenses_totales: number;
  profit_net: number;
}

interface ProfitabilityChartProps {
  data: ProfitabilityData | null;
}

const ProfitabilityChart = ({ data }: ProfitabilityChartProps) => {
  if (!data) return null;

  const chartData = [
    { name: 'Analyse Financière', revenus: data.revenus_totaux, depenses: data.depenses_totales, profit: data.profit_net }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyse de la Rentabilité</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value.toLocaleString('fr-FR')} FCFA`} />
            <Legend />
            <Bar dataKey="revenus" fill="#82ca9d" name="Revenus Totaux" />
            <Bar dataKey="depenses" fill="#ffc658" name="Dépenses Totales" />
            <Bar dataKey="profit" fill="#8884d8" name="Profit Net" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityChart;
