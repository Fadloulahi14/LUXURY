-- =========================================
-- MG LUXURY - SCHEMA BASE DE DONNÉES SUPABASE
-- Basé sur les interfaces API TypeScript
-- =========================================

-- Activer Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- =========================================
-- 1. TABLE UTILISATEURS
-- =========================================
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 2. TABLE CATÉGORIES
-- =========================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- 3. TABLE PRODUITS
-- =========================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  category VARCHAR(100) NOT NULL,
  description TEXT,
  composition TEXT,
  image VARCHAR(500),
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Clé étrangère vers categories (optionnel pour amélioration future)
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL
);

-- =========================================
-- 4. TABLE COMMANDES
-- =========================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  address TEXT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
  status VARCHAR(50) DEFAULT 'en cours' CHECK (status IN ('en cours', 'confirmée', 'expédiée', 'livrée', 'annulée')),
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Clé étrangère vers users (optionnel pour amélioration future)
  user_id UUID REFERENCES users(id) ON DELETE SET NULL
);

-- =========================================
-- 5. TABLE ARTICLES DE COMMANDE
-- =========================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0), -- Prix au moment de la commande
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================
-- INDEXES POUR LES PERFORMANCES
-- =========================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(date);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- =========================================
-- POLITIQUES ROW LEVEL SECURITY (RLS)
-- =========================================

-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Politiques utilisateurs
CREATE POLICY "Les utilisateurs peuvent voir leurs propres données" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Les utilisateurs peuvent mettre à jour leurs propres données" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Les admins peuvent voir tous les utilisateurs" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques catégories (lecture publique, écriture admin)
CREATE POLICY "Tout le monde peut voir les catégories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Seuls les admins peuvent modifier les catégories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques produits (lecture publique, écriture admin)
CREATE POLICY "Tout le monde peut voir les produits" ON products
  FOR SELECT USING (true);

CREATE POLICY "Seuls les admins peuvent modifier les produits" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques commandes
CREATE POLICY "Les utilisateurs peuvent voir leurs propres commandes" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Les utilisateurs peuvent créer leurs propres commandes" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Les admins peuvent voir toutes les commandes" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Les admins peuvent mettre à jour les commandes" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Politiques articles de commande
CREATE POLICY "Les utilisateurs peuvent voir leurs propres articles de commande" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Les utilisateurs peuvent créer des articles pour leurs commandes" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Les admins peuvent voir tous les articles de commande" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =========================================
-- INSERTION DE DONNÉES D'EXEMPLE
-- =========================================

-- Insérer les catégories
INSERT INTO categories (name, label, description, image) VALUES
('huile', 'Huiles Naturelles', 'Huiles pures et naturelles pour la beauté et le bien-être', '/image/huile1.jpeg'),
('parfum', 'Parfum', 'Parfums naturels et authentiques inspirés des traditions sénégalaises', '/image/thiouray11.jpeg'),
('thiouraye', 'Thiourayes', 'Encens traditionnels sénégalais aux parfums envoûtants', '/image/thiouray12.jpeg'),
('poudre-riz', 'Poudre de Riz', 'Poudres de riz naturelles pour le maquillage et les soins de la peau', '/image/thiouray13.jpeg')
ON CONFLICT (name) DO NOTHING;

-- Insérer les produits d'exemple
INSERT INTO products (name, price, category, description, composition, image, stock, featured, is_new) VALUES
-- Huiles Naturelles
('Huile de Coco Vierge', 3000, 'huile', 'Huile 100% naturelle, extraite à froid, hydratante pour peau et cheveux. Nourrit en profondeur et apporte brillance et douceur.', '100% huile de coco vierge pure, extraite à froid sans additifs ni conservateurs.', '/image/huile1.jpeg', 20, true, true),
('Huile d''Argan Pure', 8500, 'huile', 'L''or liquide du Maroc. Cette huile précieuse régénère, nourrit et protège votre peau et vos cheveux.', '100% huile d''argan biologique, pressée à froid, riche en vitamine E et acides gras essentiels.', '/image/huile2.jpeg', 15, false, false),
('Huile de Baobab', 6000, 'huile', 'Trésor africain aux propriétés exceptionnelles. Hydrate, apaise et protège les peaux les plus sensibles.', 'Huile de baobab pure, riche en vitamines A, D, E et F. Pressée à froid.', '/image/huile3.jpeg', 10, true, false),
('Huile de Nigelle', 5500, 'huile', 'L''huile aux mille vertus. Renforce le système immunitaire et sublime votre beauté naturelle.', 'Huile de nigelle (cumin noir) 100% pure, pressée à froid, sans additifs.', '/image/huile1.jpeg', 18, false, true),

-- Thiourayes
('Thiouraye Royal', 5000, 'thiouraye', 'Thiouraye artisanal aux senteurs nobles et profondes. Un encens traditionnel sénégalais qui parfume votre intérieur d''une fragrance envoûtante et raffinée.', NULL, '/image/thiouray11.jpeg', 12, true, false),
('Thiouraye Nuit d''Orient', 7500, 'thiouraye', 'Un mélange exclusif aux notes orientales mystérieuses. Parfait pour créer une ambiance chaleureuse et luxueuse.', NULL, '/image/thiouray12.jpeg', 8, true, true),
('Thiouraye Tradition', 3500, 'thiouraye', 'La recette ancestrale transmise de génération en génération. Un classique intemporel.', NULL, '/image/thiouray13.jpeg', 25, false, false),
('Thiouraye Prestige Collection', 12000, 'thiouraye', 'Notre création la plus exclusive. Un assemblage rare de résines précieuses pour les connaisseurs.', NULL, '/image/thiouray14.jpeg', 5, true, true),

-- Parfums
('Parfum Traditionnel Sénégalais', 12000, 'parfum', 'Un parfum authentique qui capture l''essence des traditions sénégalaises. Notes boisées et florales.', 'Huiles essentielles naturelles, extraits de fleurs locales.', '/image/thiouray11.jpeg', 8, true, true),
('Parfum aux Notes Florales', 9500, 'parfum', 'Un bouquet floral délicat inspiré des jardins tropicaux. Parfum frais et léger.', 'Essences florales pures, huiles végétales.', '/image/thiouray11.jpeg', 12, false, false),
('Parfum Oriental', 15000, 'parfum', 'Notes orientales mystérieuses et envoûtantes. Un parfum sophistiqué pour les occasions spéciales.', 'Résines précieuses, épices orientales, huiles essentielles.', '/image/thiouray11.jpeg', 6, true, false),

-- Poudre de Riz
('Poudre de Riz Naturelle', 4500, 'poudre-riz', 'Poudre de riz 100% naturelle pour un maquillage léger et naturel. Convient à tous les types de peau.', 'Poudre de riz micronisée, sans additifs.', '/image/thiouray11.jpeg', 15, false, true),
('Poudre de Riz Compacte', 5500, 'poudre-riz', 'Poudre compacte pour un fini mat et longue tenue. Idéale pour les peaux mixtes à grasses.', 'Poudre de riz, agents matifiants naturels.', '/image/thiouray11.jpeg', 10, false, false),
('Poudre de Riz Transparente', 4000, 'poudre-riz', 'Poudre transparente pour fixer le maquillage sans altérer les couleurs. Fini naturel.', 'Poudre de riz ultra-fine, 100% transparente.', '/image/thiouray11.jpeg', 20, true, false)
ON CONFLICT DO NOTHING;

-- =========================================
-- FONCTIONS ET DÉCLENCHEURS
-- =========================================

-- Fonction pour mettre à jour le timestamp updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Déclencheurs pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- VUES POUR LES REQUÊTES COURANTES
-- =========================================

-- Vue pour les détails complets de commande
CREATE OR REPLACE VIEW order_details AS
SELECT
    o.id as order_id,
    o.customer_name,
    o.customer_email,
    o.customer_phone,
    o.address,
    o.total_price,
    o.status,
    o.date,
    oi.quantity,
    oi.price as item_price,
    p.name as product_name,
    p.image as product_image,
    (oi.quantity * oi.price) as item_total
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;

-- Vue pour les statistiques de produits
CREATE OR REPLACE VIEW product_stats AS
SELECT
    p.id,
    p.name,
    p.category,
    p.price,
    p.stock,
    p.featured,
    p.is_new,
    COUNT(oi.id) as times_ordered,
    COALESCE(SUM(oi.quantity), 0) as total_quantity_sold,
    COALESCE(SUM(oi.quantity * oi.price), 0) as total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.category, p.price, p.stock, p.featured, p.is_new;

-- =========================================
-- BUCKET DE STOCKAGE POUR LES IMAGES (si utilisation de Supabase Storage)
-- =========================================

-- Note: Créer un bucket de stockage appelé 'images' dans le Dashboard Supabase
-- et configurer les politiques suivantes:

-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Politiques de stockage pour le bucket images
-- CREATE POLICY "Tout le monde peut voir les images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
-- CREATE POLICY "Seuls les admins peuvent télécharger des images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
-- CREATE POLICY "Seuls les admins peuvent mettre à jour les images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
-- CREATE POLICY "Seuls les admins peuvent supprimer des images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));