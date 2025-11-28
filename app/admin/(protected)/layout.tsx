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
  <aside className="w-64 bg-gray-800 text-white p-4">
    <h2 className="text-xl font-bold mb-8">Admin</h2>
    <nav className="space-y-4">
      <Link href="/admin/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
        <LayoutDashboard />
        <span>Dashboard</span>
      </Link>
      <Link href="/admin/commandes" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
        <ShoppingCart />
        <span>Commandes</span>
      </Link>
      <Link href="/admin/clients" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
        <Users />
        <span>Clients</span>
      </Link>
      <Link href="/admin/comptabilite" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
        <BarChart />
        <span>Comptabilité</span>
      </Link>
      <Link href="/admin/abonnes" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
        <Mail />
        <span>Abonnés</span>
      </Link>
      <Link href="/admin/catalogue" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
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
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
