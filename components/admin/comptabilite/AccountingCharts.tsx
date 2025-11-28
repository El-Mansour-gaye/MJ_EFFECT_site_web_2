// components/admin/comptabilite/AccountingCharts.tsx
"use client";

import React from 'react';
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueData {
  date: string;
  revenue: number;
  expenses: number;
}

interface ExpenseBreakdownData {
  name: string;
  value: number;
}

const COLORS = ['#FF5733', '#D4AF37', '#6B8E23', '#4682B4']; // Orange, Gold, Olive, SteelBlue

export const RevenueChart = ({ data }: { data: RevenueData[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-playfair">Revenus vs Dépenses</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" style={{ fontFamily: 'Inter', fontSize: '12px' }} />
            <YAxis style={{ fontFamily: 'Inter', fontSize: '12px' }} />
            <Tooltip contentStyle={{ fontFamily: 'Inter' }} />
            <Legend wrapperStyle={{ fontFamily: 'Inter' }} />
            <Bar dataKey="expenses" name="Dépenses" barSize={20} fill="#D4AF37" />
            <Line type="monotone" dataKey="revenue" name="Revenus" stroke="#FF5733" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export const ExpenseChart = ({ data }: { data: ExpenseBreakdownData[] }) => (
  <Card>
    <CardHeader>
      <CardTitle className="font-playfair">Répartition des Dépenses</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontFamily: 'Inter' }} />
            <Legend wrapperStyle={{ fontFamily: 'Inter' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);
