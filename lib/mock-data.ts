// lib/mock-data.ts

// Mock data for Dashboard Page (/admin/dashboard)

export const mockStatisticCards = {
  totalCommandes: 1250,
  totalClients: 850,
  revenusTotaux: 75000000, // in FCFA
  totalAbonnes: 320,
};

export const mockSalesByMonth = [
  { month: 'Jan', sales: 4000000 },
  { month: 'Feb', sales: 3000000 },
  { month: 'Mar', sales: 5000000 },
  { month: 'Apr', sales: 4500000 },
  { month: 'May', sales: 6000000 },
  { month: 'Jun', sales: 5500000 },
  { month: 'Jul', sales: 7000000 },
  { month: 'Aug', sales: 6500000 },
  { month: 'Sep', sales: 8000000 },
  { month: 'Oct', sales: 7500000 },
  { month: 'Nov', sales: 9000000 },
  { month: 'Dec', sales: 8500000 },
];

export const mockPaymentMethods = [
  { name: 'PayTech', value: 400 },
  { name: 'Présentiel', value: 300 },
];

export const mockOrderStatus = [
  { status: 'PAYÉ_EN_LIGNE', count: 250 },
  { status: 'PAYÉ_PRESENTIEL', count: 150 },
  { status: 'EN_ATTENTE', count: 50 },
];

// Mock data for Comptabilité Page (/admin/comptabilite)

export const mockFinancialCards = {
  ventesTotales: 15000000,
  depensesTotales: 4500000,
  beneficeNet: 10500000,
  totalCommandes: 250,
  paiementsReussis: 95, // percentage
  panierMoyen: 60000,
};

export const mockRevenueVsExpenses = [
  { date: '2023-11-01', revenue: 500000, expenses: 150000 },
  { date: '2023-11-02', revenue: 600000, expenses: 180000 },
  { date: '2023-11-03', revenue: 550000, expenses: 200000 },
  { date: '2023-11-04', revenue: 700000, expenses: 220000 },
  { date: '2023-11-05', revenue: 650000, expenses: 190000 },
  // ... more data for the selected range
];

export const mockExpenseBreakdown = [
  { name: 'Frais de Port / Livraison', value: 1200000 },
  { name: 'Marketing / Publicité', value: 1800000 },
  { name: 'Achat de Stock / Fournisseurs', value: 1000000 },
  { name: 'Frais Opérationnels / Divers', value: 500000 },
];

export const mockExpensesTable = [
  {
    id: 'exp_1',
    nom_depense: 'Campaign Facebook Ads',
    montant: 1200000,
    categorie: 'Marketing / Publicité',
    date_depense: '2023-11-02',
  },
  {
    id: 'exp_2',
    nom_depense: 'Achat packaging',
    montant: 500000,
    categorie: 'Achat de Stock / Fournisseurs',
    date_depense: '2023-11-03',
  },
  {
    id: 'exp_3',
    nom_depense: 'Frais de livraison DHL',
    montant: 700000,
    categorie: 'Frais de Port / Livraison',
    date_depense: '2023-11-05',
  },
];
