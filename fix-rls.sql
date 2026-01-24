-- =========================================
-- SOLUTION RAPIDE : DÉSACTIVER RLS TEMPORAIREMENT
-- =========================================

-- Désactiver RLS sur toutes les tables pour les tests
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- =========================================
-- POUR RÉACTIVER RLS PLUS TARD (en production) :
-- =========================================
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;