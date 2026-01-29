-- SQL Script to update and create pack/set products with new images

-- Update existing sets 1-6
UPDATE produits SET
  image = '/images-pack-produit/set1-pack-de-3.png',
  images = ARRAY['/images-pack-produit/set1-pack-de-3.png']
WHERE nom LIKE 'SET #1%';

UPDATE produits SET
  image = '/images-pack-produit/set2-pack-de-3.png',
  images = ARRAY['/images-pack-produit/set2-pack-de-3.png']
WHERE nom LIKE 'SET #2%';

UPDATE produits SET
  image = '/images-pack-produit/set3-pack-de-3.png',
  images = ARRAY['/images-pack-produit/set3-pack-de-3.png']
WHERE nom LIKE 'SET #3%';

UPDATE produits SET
  image = '/images-pack-produit/set4-pack-de-3.png',
  images = ARRAY['/images-pack-produit/set4-pack-de-3.png']
WHERE nom LIKE 'SET #4%';

UPDATE produits SET
  image = '/images-pack-produit/set5-pack-de-3.png',
  images = ARRAY['/images-pack-produit/set5-pack-de-3.png']
WHERE nom LIKE 'SET #5%';

UPDATE produits SET
  image = '/images-pack-produit/set6-pack-de-3.png',
  images = ARRAY['/images-pack-produit/set6-pack-de-3.png']
WHERE nom LIKE 'SET #6%';

-- Insert new sets 7-13
-- If they already exist by slug, update them
INSERT INTO produits (nom, slug, prix_fcfa, stock, category, is_set_or_pack, image, images, is_archived)
VALUES
('SET #7', 'set-7', 32000, 10, 'Coffrets', true, '/images-pack-produit/set7-pack-de-2.png', ARRAY['/images-pack-produit/set7-pack-de-2.png'], false),
('SET #8', 'set-8', 32000, 10, 'Coffrets', true, '/images-pack-produit/set8-pack-de-2.png', ARRAY['/images-pack-produit/set8-pack-de-2.png'], false),
('SET #9', 'set-9', 32000, 10, 'Coffrets', true, '/images-pack-produit/set9-pack-de-3.png', ARRAY['/images-pack-produit/set9-pack-de-3.png'], false),
('SET #10', 'set-10', 32000, 10, 'Coffrets', true, '/images-pack-produit/set10-pack-de-2.png', ARRAY['/images-pack-produit/set10-pack-de-2.png'], false),
('SET #11', 'set-11', 32000, 10, 'Coffrets', true, '/images-pack-produit/set11-pack-de-2.png', ARRAY['/images-pack-produit/set11-pack-de-2.png'], false),
('SET #12', 'set-12', 32000, 10, 'Coffrets', true, '/images-pack-produit/set12-pack-de-2.png', ARRAY['/images-pack-produit/set12-pack-de-2.png'], false),
('SET #13', 'set-13', 32000, 10, 'Coffrets', true, '/images-pack-produit/set13-pack-de-2.png', ARRAY['/images-pack-produit/set13-pack-de-2.png'], false)
ON CONFLICT (slug) DO UPDATE SET
  nom = EXCLUDED.nom,
  prix_fcfa = EXCLUDED.prix_fcfa,
  category = EXCLUDED.category,
  is_set_or_pack = EXCLUDED.is_set_or_pack,
  image = EXCLUDED.image,
  images = EXCLUDED.images,
  is_archived = EXCLUDED.is_archived;
