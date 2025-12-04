// /app/admin/(protected)/comptabilite/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ExpenseTable from '@/components/admin/comptabilite/ExpenseTable';
import ExpenseForm from '@/components/admin/comptabilite/ExpenseForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';
import { DateRangeFilter } from '@/components/admin/shared/DateRangeFilter';
import ProfitabilityChart from '@/components/admin/comptabilite/ProfitabilityChart';
import ExpenseDistributionChart from '@/components/admin/comptabilite/ExpenseDistributionChart';
import { startOfYear, endOfYear, formatISO } from 'date-fns';

export type Expense = {
  id?: string;
  nom_depense: string;
  montant: number;
  categorie?: string;
  date_depense: string;
};

type ProfitabilityData = {
  revenus_totaux: number;
  depenses_totales: number;
  profit_net: number;
};

const ComptabilitePage = () => {
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfYear(new Date()),
    to: endOfYear(new Date()),
  });
  const [profitabilityData, setProfitabilityData] = useState<ProfitabilityData | null>(null);


  const fetchExpenses = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch('/api/admin/comptabilite/depenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      setAllExpenses(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfitability = async (from: Date, to: Date) => {
    const token = sessionStorage.getItem("admin-auth-token");
    const startDate = formatISO(from, { representation: 'date' });
    const endDate = formatISO(to, { representation: 'date' });
    try {
      const response = await fetch(`/api/admin/comptabilite/rentabilite?startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch profitability data');
      const data = await response.json();
      setProfitabilityData(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (dateRange.from && dateRange.to) {
        fetchProfitability(dateRange.from, dateRange.to);
    }
  }, [dateRange]);

  const filteredExpenses = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return allExpenses;
    return allExpenses.filter(expense => {
        const expenseDate = new Date(expense.date_depense);
        return expenseDate >= dateRange.from && expenseDate <= dateRange.to;
    });
  }, [allExpenses, dateRange]);


  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (expenseId: string) => {
    setExpenseToDelete(expenseId);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!expenseToDelete) return;

    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch(`/api/admin/comptabilite/depenses/${expenseToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete expense');
      fetchExpenses(); // Refresh the list
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsConfirmOpen(false);
      setExpenseToDelete(null);
    }
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    fetchExpenses();
  };

  const openNewExpenseModal = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-playfair">Comptabilité</h1>
        <DateRangeFilter onDateChange={setDateRange} />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ProfitabilityChart data={profitabilityData} />
        <ExpenseDistributionChart expenses={filteredExpenses} />
      </div>

      {/* Expenses Management Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-playfair">Gestion des Dépenses</h2>
        <Button onClick={openNewExpenseModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter une Dépense
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedExpense ? 'Modifier la Dépense' : 'Ajouter une Dépense'}</DialogTitle>
          </DialogHeader>
          <ExpenseForm expense={selectedExpense} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Confirmer la suppression"
        description="Êtes-vous sûr de vouloir supprimer cette dépense ?"
      />

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-accent">{error}</p>}
      {!isLoading && !error && (
        <ExpenseTable expenses={filteredExpenses} onEdit={handleEdit} onDelete={handleDeleteRequest} />
      )}
    </div>
  );
};

export default ComptabilitePage;
