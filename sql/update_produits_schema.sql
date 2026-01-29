-- Add new columns to the produits table
ALTER TABLE public.produits
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS intensite TEXT,
ADD COLUMN IF NOT EXISTS famille_olfactive TEXT;
