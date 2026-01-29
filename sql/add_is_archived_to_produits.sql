-- Add is_archived column to produits table
ALTER TABLE public.produits
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;

-- Update existing rows to have false instead of NULL
UPDATE public.produits
SET is_archived = false
WHERE is_archived IS NULL;
