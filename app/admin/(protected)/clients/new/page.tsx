// /app/admin/(protected)/clients/new/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const NewClientPage = () => {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const token = sessionStorage.getItem("admin-auth-token");

    try {
      const response = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nom, telephone, email, adresse }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create client');
      }

      router.push('/admin/clients');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-6">Nouveau Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="adresse">Adresse</Label>
          <Input id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Création...' : 'Créer le client'}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default NewClientPage;
