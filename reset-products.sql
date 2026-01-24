-- =========================================
-- RÉINITIALISER LES PRODUITS
-- Supprimer et réinsérer sans IDs explicites
-- =========================================

-- Supprimer tous les produits existants
DELETE FROM products;

-- Réinsérer les produits SANS IDs (SERIAL s'en charge)
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
('Poudre de Riz Transparente', 4000, 'poudre-riz', 'Poudre transparente pour fixer le maquillage sans altérer les couleurs. Fini naturel.', 'Poudre de riz ultra-fine, 100% transparente.', '/image/thiouray11.jpeg', 20, true, false);