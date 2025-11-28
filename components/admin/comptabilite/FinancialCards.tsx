// components/admin/comptabilite/FinancialCards.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialCardsProps {
  data: {
    ventesTotales: number;
    depensesTotales: number;
    beneficeNet: number;
    totalCommandes: number;
    paiementsReussis: number;
    panierMoyen: number;
  };
}

const FinancialCards = ({ data }: FinancialCardsProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium font-inter">Ventes Totales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-playfair">{formatCurrency(data.ventesTotales)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium font-inter">Dépenses Totales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-playfair">{formatCurrency(data.depensesTotales)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium font-inter">Bénéfice Net</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-playfair">{formatCurrency(data.beneficeNet)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium font-inter">Total Commandes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-playfair">{data.totalCommandes}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium font-inter">Paiements Réussis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-playfair">{data.paiementsReussis}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium font-inter">Panier Moyen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold font-playfair">{formatCurrency(data.panierMoyen)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCards;
