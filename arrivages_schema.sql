-- SQL Schema for Arrivages Feature

-- Table to store information about each shipment (arrivage)
CREATE TABLE IF NOT EXISTS arrivages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    taux_change_usd_to_fcfa NUMERIC NOT NULL,
    transport_global_fcfa NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to store the details for each product within a shipment
CREATE TABLE IF NOT EXISTS details_arrivage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    arrivage_id UUID NOT NULL REFERENCES arrivages(id) ON DELETE CASCADE,
    produit_id UUID NOT NULL REFERENCES produits(id) ON DELETE CASCADE,
    quantite INTEGER NOT NULL CHECK (quantite > 0),
    prix_achat_usd_unitaire NUMERIC NOT NULL,
    marge_fcfa NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_arrivages_date ON arrivages(date);
CREATE INDEX IF NOT EXISTS idx_details_arrivage_arrivage_id ON details_arrivage(arrivage_id);
CREATE INDEX IF NOT EXISTS idx_details_arrivage_produit_id ON details_arrivage(produit_id);

COMMENT ON TABLE arrivages IS 'Stores high-level information about each import shipment.';
COMMENT ON COLUMN arrivages.nom IS 'User-defined name for the shipment, e.g., "Arrivage Juin 2024".';
COMMENT ON COLUMN arrivages.taux_change_usd_to_fcfa IS 'The exchange rate from USD to FCFA used for this shipment''s calculations.';
COMMENT ON COLUMN arrivages.transport_global_fcfa IS 'Total shipping cost for the entire shipment, in FCFA.';

COMMENT ON TABLE details_arrivage IS 'Stores calculation details for each product line within a shipment.';
COMMENT ON COLUMN details_arrivage.arrivage_id IS 'Foreign key linking to the parent shipment.';
COMMENT ON COLUMN details_arrivage.produit_id IS 'Foreign key linking to the product in the catalogue.';
COMMENT ON COLUMN details_arrivage.quantite IS 'Number of units of the product in this shipment.';
COMMENT ON COLUMN details_arrivage.prix_achat_usd_unitaire IS 'The purchase price of a single unit, in USD.';
COMMENT ON COLUMN details_arrivage.marge_fcfa IS 'The desired profit margin for a single unit, in FCFA.';
