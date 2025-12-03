// /components/admin/comptabilite/ExpenseDistributionChart.tsx
"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from '@/app/admin/(protected)/comptabilite/page';

interface ExpenseDistributionChartProps {
  expenses: Expense[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const ExpenseDistributionChart = ({ expenses }: ExpenseDistributionChartProps) => {
  const dataByCategory = expenses.reduce((acc, expense) => {
    const category = expense.categorie || 'Non Catégorisé';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.montant;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(dataByCategory).map(category => ({
    name: category,
    value: dataByCategory[category],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des Dépenses par Catégorie</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value.toLocaleString('fr-FR')} FCFA`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionChart;
