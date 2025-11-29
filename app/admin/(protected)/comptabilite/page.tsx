// /app/admin/(protected)/comptabilite/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ExpenseTable from '@/components/admin/comptabilite/ExpenseTable';
import ExpenseForm from '@/components/admin/comptabilite/ExpenseForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ConfirmationDialog from '@/components/admin/ConfirmationDialog';

export type Expense = {
  id?: string;
  nom_depense: string;
  montant: number;
  categorie?: string;
  date_depense: string;
};

const ComptabilitePage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);

  const fetchExpenses = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem("admin-auth-token");
    try {
      const response = await fetch('/api/admin/comptabilite', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

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
      const response = await fetch(`/api/admin/comptabilite/${expenseToDelete}`, {
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
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <ExpenseTable expenses={expenses} onEdit={handleEdit} onDelete={handleDeleteRequest} />
      )}
    </div>
  );
};

export default ComptabilitePage;
