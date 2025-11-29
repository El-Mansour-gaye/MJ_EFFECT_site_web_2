
export interface Client {
  id: string;
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  date_inscription: string;
  commandes?: Commande[];
}

export interface Article {
  id: string;
  quantite: number;
  prix_unitaire_cmd: number;
  produits: {
    nom: string;
  };
}

export interface Commande {
  id: string;
  client_nom: string;
  client_telephone: string;
  client_email: string;
  client_adresse: string;
  montant_total: number;
  statut_paiement: string;
  statut: string;
  methode_paiement: string;
  date_creation: string;
  reference_paytech: string;
  articles?: Article[];
}

export interface Product {
  id: string;
  nom: string;
  prix_fcfa: number;
  stock: number;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_set_or_pack: boolean;
}
