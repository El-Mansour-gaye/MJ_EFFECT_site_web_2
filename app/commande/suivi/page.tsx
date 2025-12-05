// app/commande/suivi/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function SuiviPage() {
  const router = useRouter();
  const [orderCode, setOrderCode] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderCode.trim()) {
      router.push(`/commande/ticket/${orderCode.trim()}`);
    } else {
      setError('Veuillez entrer un code de commande.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-md">
        <div className="bg-[#1A1A1A] p-8 md:p-12 text-center">

          <h1 className="font-bold text-3xl md:text-4xl mb-4">Suivre votre commande</h1>
          <p className="text-gray-400 mb-8">Entrez le code unique de votre commande pour voir son statut et ses détails.</p>

          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <Label htmlFor="orderCode" className="sr-only">Code de commande</Label>
              <Input
                id="orderCode"
                type="text"
                value={orderCode}
                onChange={(e) => {
                  setOrderCode(e.target.value);
                  if (error) setError('');
                }}
                placeholder="ex: a1b2c-d3e4f"
                className="text-center bg-black border-gray-700 h-14 text-lg tracking-widest font-mono"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-bold">
              Retrouver ma commande
            </Button>
          </form>

        </div>
        <div className="text-center mt-8">
            <Button asChild variant="link">
                <Link href="/panier">Retour au panier</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
