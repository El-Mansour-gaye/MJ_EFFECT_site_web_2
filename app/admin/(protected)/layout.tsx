// /app/admin/layout.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Assuming you have icons, e.g., from lucide-react
import { LayoutDashboard, ShoppingCart, Users, BarChart, Mail, Tag } from 'lucide-react';

// Client-side auth check
const checkAuth = () => !!sessionStorage.getItem('admin-auth-token');

const AdminSidebar = () => (
  <aside className="w-64 bg-secondary text-secondary-foreground p-4 border-r border-border">
    <h2 className="text-xl font-bold mb-8 text-primary">Admin</h2>
    <nav className="space-y-4">
      <Link href="/admin/dashboard" className="flex items-center space-x-2 hover:bg-muted hover:text-accent p-2 rounded transition-colors">
        <LayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link href="/admin/commandes" className="flex items-center space-x-2 hover:bg-muted hover:text-accent p-2 rounded transition-colors">
        <ShoppingCart />
        <span>Commandes</span>
      </Link>
      <Link href="/admin/clients" className="flex items-center space-x-2 hover:bg-muted hover:text-accent p-2 rounded transition-colors">
        <Users />
        <span>Clients</span>
      </Link>
      <Link href="/admin/comptabilite" className="flex items-center space-x-2 hover:bg-muted hover:text-accent p-2 rounded transition-colors">
        <BarChart />
        <span>Comptabilité</span>
      </Link>
      <Link href="/admin/abonnes" className="flex items-center space-x-2 hover:bg-muted hover:text-accent p-2 rounded transition-colors">
        <Mail />
        <span>Abonnés</span>
      </Link>
      <Link href="/admin/catalogue" className="flex items-center space-x-2 hover:bg-muted hover:text-accent p-2 rounded transition-colors">
        <Tag />
        <span>Catalogue</span>
      </Link>
    </nav>
  </aside>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // If the user is not logged in, redirect them to the login page.
    // This protects all routes under /admin/*
    if (!checkAuth()) {
      router.push('/admin');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Render nothing or a loading spinner while checking auth
  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-muted/50">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
