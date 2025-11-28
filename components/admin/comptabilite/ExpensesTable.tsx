// components/admin/comptabilite/ExpensesTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';


interface Expense {
  id: string;
  nom_depense: string;
  montant: number;
  categorie: string;
  date_depense: string;
}

interface ExpensesTableProps {
  data: Expense[];
}

const ExpensesTable = ({ data }: ExpensesTableProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-playfair">Détail des Dépenses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-inter">Nom</TableHead>
              <TableHead className="font-inter">Catégorie</TableHead>
              <TableHead className="font-inter text-right">Montant</TableHead>
              <TableHead className="font-inter text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium font-inter">{expense.nom_depense}</TableCell>
                <TableCell className="font-inter">{expense.categorie}</TableCell>
                <TableCell className="font-inter text-right">{formatCurrency(expense.montant)}</TableCell>
                <TableCell className="font-inter text-right">{format(new Date(expense.date_depense), "dd MMM, yyyy", { locale: fr })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpensesTable;
