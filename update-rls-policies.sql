-- =========================================
-- MISE À JOUR DES POLITIQUES RLS
-- Pour corriger l'erreur 401 Unauthorized
-- =========================================

-- Supprimer les anciennes politiques restrictives
DROP POLICY IF EXISTS "Seuls les admins peuvent modifier les catégories" ON categories;
DROP POLICY IF EXISTS "Seuls les admins peuvent modifier les produits" ON products;

-- Ajouter des politiques temporaires ouvertes pour les tests
CREATE POLICY "Écriture ouverte temporaire" ON categories FOR ALL USING (true);
CREATE POLICY "Écriture ouverte temporaire" ON products FOR ALL USING (true);
CREATE POLICY "Écriture ouverte temporaire" ON orders FOR ALL USING (true);
CREATE POLICY "Écriture ouverte temporaire" ON order_items FOR ALL USING (true);
CREATE POLICY "Écriture ouverte temporaire" ON users FOR ALL USING (true);

-- =========================================
-- NOTE: En production, remplacez par des politiques sécurisées :
-- =========================================
--
-- -- Politiques sécurisées pour la production
-- CREATE POLICY "Admins peuvent gérer les produits" ON products
--   FOR ALL USING (
--     EXISTS (
--       SELECT 1 FROM users
--       WHERE id = auth.uid()::text::integer
--       AND role = 'admin'
--     )
--   );
--
-- CREATE POLICY "Admins peuvent gérer les catégories" ON categories
--   FOR ALL USING (
--     EXISTS (
--       SELECT 1 FROM users
--       WHERE id = auth.uid()::text::integer
--       AND role = 'admin'
--     )
--   );