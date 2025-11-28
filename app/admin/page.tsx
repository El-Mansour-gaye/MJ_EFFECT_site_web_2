// /app/admin/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

// This is a simple client-side "session" state.
// In a real app, this would be managed more securely (e.g., with cookies, tokens).
// We use sessionStorage to persist the login state across page reloads.
const checkAuth = () => sessionStorage.getItem('isAdminLoggedIn') === 'true';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to the dashboard.
    if (checkAuth()) {
      router.push('/admin/dashboard');
    } else {
      setIsChecking(false);
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          sessionStorage.setItem('isAdminLoggedIn', 'true');
          router.push('/admin/dashboard');
        } else {
          setError('Mot de passe incorrect.');
        }
      } else {
        setError('Erreur d\'authentification.');
      }
    } catch (err) {
      setError('Une erreur est survenue.');
    }
  };

  if (isChecking) {
    return <div>Loading...</div>; // Or a proper spinner component
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleLogin} className="w-full">
          Connexion
        </Button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
