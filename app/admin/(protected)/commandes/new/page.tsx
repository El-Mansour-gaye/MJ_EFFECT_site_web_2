// /app/admin/(protected)/commandes/new/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

// Simplified Types for this form
type Client = { id: string; nom: string; telephone: string; email: string; adresse: string; };
type Product = { id: string; nom: string; prix_fcfa: number; stock: number; };
type CartItem = { product: Product; quantity: number; };

const NewOrderPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Client state
  const [clientSearch, setClientSearch] = useState('');
  const [foundClients, setFoundClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isNewClient, setIsNewClient] = useState(true);
  const [newClient, setNewClient] = useState({ nom: '', telephone: '', email: '', adresse: '' });

  // Product state
  const [productSearch, setProductSearch] = useState('');
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Order state
  const [deliveryDate, setDeliveryDate] = useState('');

  const token = typeof window !== 'undefined' ? sessionStorage.getItem("admin-auth-token") : null;

  // Search for clients
  useEffect(() => {
    if (clientSearch.length < 2) {
      setFoundClients([]);
      return;
    }
    const fetchClients = async () => {
      const response = await fetch(`/api/admin/clients/search?q=${clientSearch}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setFoundClients(data.clients || []);
    };
    const debounce = setTimeout(fetchClients, 300);
    return () => clearTimeout(debounce);
  }, [clientSearch, token]);

  // Search for products
  useEffect(() => {
    if (productSearch.length < 2) {
      setFoundProducts([]);
      return;
    }
    const fetchProducts = async () => {
      const response = await fetch(`/api/admin/produits/search?q=${productSearch}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setFoundProducts(data.products || []);
    };
    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [productSearch, token]);


  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setIsNewClient(false);
    setNewClient({ nom: client.nom, telephone: client.telephone, email: client.email, adresse: client.adresse });
    setClientSearch('');
    setFoundClients([]);
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setProductSearch('');
    setFoundProducts([]);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(cart.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.product.prix_fcfa * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const clientData = isNewClient ? newClient : selectedClient;
    if (!clientData || !clientData.nom) {
        setError("Les informations du client sont requises.");
        setIsLoading(false);
        return;
    }

    const orderData = {
        client: clientData,
        isNewClient,
        cart,
        totalAmount,
        deliveryDate,
        paymentStatus: 'PAYE_PRESENTIEL',
        deliveryStatus: 'En préparation',
    };

    try {
        const response = await fetch('/api/admin/commandes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create order');
        }

        router.push('/admin/commandes');
    } catch (err) {
        setError((err as Error).message);
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-6">Nouvelle Commande Manuelle</h1>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Client Section */}
        <Card>
          <CardHeader><CardTitle>1. Informations Client</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
                <Button type="button" variant={isNewClient ? 'default': 'outline'} onClick={() => { setIsNewClient(true); setSelectedClient(null); }}>Nouveau Client</Button>
                <Button type="button" variant={!isNewClient ? 'default': 'outline'} onClick={() => setIsNewClient(false)}>Client Existant</Button>
            </div>

            {!isNewClient && (
                <div className="relative">
                    <Label htmlFor="clientSearch">Rechercher un client</Label>
                    <Input id="clientSearch" value={clientSearch} onChange={e => setClientSearch(e.target.value)} placeholder="Nom, email, ou téléphone..." />
                    {foundClients.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto">
                            {foundClients.map(c => <li key={c.id} onClick={() => handleSelectClient(c)} className="p-2 hover:bg-gray-100 cursor-pointer">{c.nom} - {c.email}</li>)}
                        </ul>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Nom</Label><Input value={newClient.nom} onChange={e => setNewClient({...newClient, nom: e.target.value})} disabled={!isNewClient && !!selectedClient} required /></div>
                <div><Label>Téléphone</Label><Input value={newClient.telephone} onChange={e => setNewClient({...newClient, telephone: e.target.value})} disabled={!isNewClient && !!selectedClient} /></div>
                <div><Label>Email</Label><Input type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} disabled={!isNewClient && !!selectedClient} /></div>
                <div><Label>Adresse</Label><Input value={newClient.adresse} onChange={e => setNewClient({...newClient, adresse: e.target.value})} disabled={!isNewClient && !!selectedClient} /></div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card>
          <CardHeader><CardTitle>2. Articles de la Commande</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
                <Label htmlFor="productSearch">Ajouter un produit</Label>
                <Input id="productSearch" value={productSearch} onChange={e => setProductSearch(e.target.value)} placeholder="Rechercher par nom..." />
                {foundProducts.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto">
                        {foundProducts.map(p => <li key={p.id} onClick={() => handleAddToCart(p)} className="p-2 hover:bg-gray-100 cursor-pointer">{p.nom} ({p.prix_fcfa} FCFA)</li>)}
                    </ul>
                )}
            </div>
            <div>
                {cart.map(item => (
                    <div key={item.product.id} className="flex items-center justify-between p-2 border-b">
                        <span>{item.product.nom}</span>
                        <div className="flex items-center space-x-2">
                           <Input type="number" className="w-20" value={item.quantity} onChange={e => handleQuantityChange(item.product.id, parseInt(e.target.value))} />
                           <span>x {item.product.prix_fcfa} FCFA</span>
                           <Button type="button" variant="destructive" size="sm" onClick={() => setCart(cart.filter(c => c.product.id !== item.product.id))}>X</Button>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary and Submission */}
        <Card>
            <CardHeader><CardTitle>3. Récapitulatif & Finalisation</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="deliveryDate">Date de livraison souhaitée</Label>
                    <Input id="deliveryDate" type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
                </div>
                <div className="text-2xl font-bold">
                    Total: {totalAmount} FCFA
                </div>
                <Button type="submit" disabled={isLoading || cart.length === 0}>
                    {isLoading ? 'Enregistrement...' : 'Créer la Commande'}
                </Button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </CardContent>
        </Card>

      </form>
    </div>
  );
};

export default NewOrderPage;
