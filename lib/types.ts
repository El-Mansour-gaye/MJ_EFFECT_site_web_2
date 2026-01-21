// /lib/types.ts

export interface Product {
  id: string;
  nom: string;
  prix_fcfa: number;
  stock: number;
  slug: string | null;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_set_or_pack: boolean;
  category: string | null;
  subcategory: string | null;
  image: string | null;
  images: string[] | null;
  tag: string | null;
  details: string | null;
  description: string | null;
  intensite: string | null;
  famille_olfactive: string | null;
  video_url?: string;
}

// Types based on the database schema

export interface Commande {
  id: string;
  client_nom: string;
  client_telephone: string;
  client_email: string | null;
  client_adresse: string;
  montant_total: number;
  statut_paiement: 'EN_ATTENTE' | 'PAYE_EN_LIGNE' | 'PAYE_PRESENTIEL';
  methode_paiement: 'PAYTECH' | 'PRESENTIEL';
  date_creation: string;
  reference_paytech: string | null;
}

export interface ArticleCommande {
  id: string;
  commande_id: string;
  produit_id: string;
  quantite: number;
  prix_unitaire_cmd: number;
}

export interface Client {
  id: string;
  nom: string;
  telephone: string | null;
  email: string | null;
  adresse: string | null;
  date_inscription: string;
}
