-- Ajouter le statut 'en attente' aux commandes
-- Ce statut permet aux commandes WhatsApp d'être approuvées ou rejetées par l'admin

-- Modifier la contrainte CHECK pour inclure le nouveau statut
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE orders ADD CONSTRAINT orders_status_check
CHECK (status IN ('en attente', 'en cours', 'confirmée', 'expédiée', 'livrée', 'annulée'));

-- Créer un index pour les commandes en attente
CREATE INDEX IF NOT EXISTS idx_orders_pending ON orders(status) WHERE status = 'en attente';