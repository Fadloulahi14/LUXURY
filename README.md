# MG LUXURY - Plateforme E-commerce

## Description

MG LUXURY est une application web e-commerce moderne spécialisée dans les produits de beauté et de bien-être naturels inspirés des traditions sénégalaises. La plateforme propose une sélection soignée d'huiles naturelles premium, de parfums authentiques, de thiourayes traditionnels (encens) et de poudres de riz pour le maquillage et les soins de la peau.

Construite avec React, TypeScript et Supabase, cette application offre une expérience d'achat fluide avec authentification utilisateur, fonctionnalité de panier d'achat, gestion des commandes et un tableau de bord administrateur pour la gestion des produits et commandes.

## Fonctionnalités

### Fonctionnalités Client
- **Navigation Produits** : Parcourir les produits par catégories (huiles, parfums, thiourayes, poudre de riz)
- **Détails Produits** : Informations détaillées sur les produits incluant composition, prix et stock
- **Panier d'Achat** : Ajouter/supprimer des produits, mettre à jour les quantités, état persistant du panier
- **Authentification Utilisateur** : Connexion/inscription sécurisée avec Supabase Auth
- **Processus de Commande** : Placement complet de commande avec informations client
- **Historique des Commandes** : Voir l'historique personnel des commandes et leur statut
- **Design Réactif** : Optimisé pour ordinateur de bureau et appareils mobiles

### Fonctionnalités Administrateur
- **Tableau de Bord** : Panel administrateur complet pour gérer la boutique
- **Gestion des Produits** : Ajouter, modifier, supprimer des produits avec téléchargement d'images
- **Gestion des Commandes** : Voir et mettre à jour les statuts des commandes
- **Gestion des Utilisateurs** : Gérer les comptes clients et les rôles
- **Gestion des Catégories** : Organiser les produits en catégories

### Fonctionnalités Techniques
- **Mises à Jour en Temps Réel** : Synchronisation des données en direct avec Supabase
- **Sécurité au Niveau des Lignes** : Politiques de sécurité au niveau de la base de données
- **Stockage d'Images** : Stockage Supabase pour les images de produits
- **Validation de Formulaires** : Validation côté client avec React Hook Form et Zod
- **Notifications Toast** : Retours utilisateur avec les toasts Sonner
- **Thème Sombre/Clair** : Possibilité de changement de thème
- **SEO Friendly** : Balises meta et données structurées

## Pile Technologique

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Sécurité des types
- **Vite** - Outil de construction et serveur de développement
- **Tailwind CSS** - Framework CSS utilitaire
- **ShadCN/UI** - Bibliothèque de composants basée sur Radix UI
- **React Router** - Routage côté client
- **React Query** - Récupération et mise en cache des données
- **Framer Motion** - Animations
- **Lucide React** - Icônes

### Backend & Base de Données
- **Supabase** - Backend-as-a-Service
  - Base de données PostgreSQL
  - Authentification
  - Abonnements en temps réel
  - Stockage pour les images
  - Sécurité au Niveau des Lignes (RLS)

### Outils de Développement
- **ESLint** - Linting du code
- **Vitest** - Tests unitaires
- **TypeScript** - Vérification des types
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Préfixes CSS des vendeurs

## Installation

### Prérequis
- Node.js (v18 ou supérieur)
- Gestionnaire de paquets npm ou bun
- Compte et projet Supabase

### Étapes de Configuration

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-dépôt>
   cd luxury
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   bun install
   ```

3. **Configuration de l'Environnement**
   Créer un fichier `.env.local` dans le répertoire racine :
   ```env
   VITE_SUPABASE_URL=votre-url-supabase
   VITE_SUPABASE_ANON_KEY=votre-clé-anon-supabase
   ```

4. **Configuration de la Base de Données**
   - Créer un nouveau projet Supabase
   - Exécuter le schéma SQL depuis `supabase-schema.sql` dans votre éditeur SQL Supabase
   - Configurer le bucket de stockage pour les images si nécessaire

5. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   # ou
   bun run dev
   ```

6. **Construire pour la production**
   ```bash
   npm run build
   # ou
   bun run build
   ```

## Utilisation

### Développement
```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run preview      # Aperçu de la construction de production
npm run lint         # Exécuter ESLint
npm run test         # Exécuter les tests
```

### Schéma de Base de Données

L'application utilise les tables principales suivantes :
- `users` - Comptes utilisateurs et authentification
- `categories` - Catégories de produits
- `products` - Catalogue de produits
- `orders` - Commandes clients
- `order_items` - Articles de commande

Voir `supabase-schema.sql` pour le schéma complet de base de données incluant les politiques RLS, les index et les données d'exemple.

### Structure API

L'application utilise une structure API modulaire :
- `src/api/users.ts` - Gestion des utilisateurs
- `src/api/products.ts` - Opérations sur les produits
- `src/api/categories.ts` - Gestion des catégories
- `src/api/orders.ts` - Traitement des commandes

## Sécurité & Vulnérabilités

### Évaluation Actuelle des Vulnérabilités

**Taux de Vulnérabilité : 8 vulnérabilités (4 modérées, 4 élevées)**

Basé sur npm audit à la dernière vérification :

#### Sévérité Élevée (4)
1. **@remix-run/router** - XSS via Redirections Ouvertes
   - Affecte : React Router (react-router-dom)
   - Statut : Correction disponible via `npm audit fix`

2. **glob** - Injection de Commande via -c/--cmd
   - Affecte : Outils CLI utilisant glob
   - Statut : Correction disponible via `npm audit fix`

#### Sévérité Modérée (4)
3. **esbuild** - Gestion des requêtes du serveur de développement
   - Affecte : Vite (serveur de développement)
   - Statut : Correction disponible via `npm audit fix`

4. **js-yaml** - Pollution de prototype dans merge
   - Affecte : Utilitaires d'analyse YAML
   - Statut : Correction disponible via `npm audit fix`

5. **lodash** - Pollution de prototype dans _.unset et _.omit
   - Affecte : Fonctions utilitaires
   - Statut : Correction disponible via `npm audit fix`

### Mesures de Sécurité Implémentées
- **Sécurité au Niveau des Lignes (RLS)** : Contrôle d'accès au niveau de la base de données
- **Authentification** : Auth Supabase avec tokens JWT
- **Validation des Entrées** : Validation côté client et serveur
- **HTTPS** : Communication sécurisée (lors du déploiement)
- **Variables d'Environnement** : Protection des données sensibles

### Recommandations
1. Exécuter `npm audit fix` pour corriger les vulnérabilités réparables
2. Mettre à jour régulièrement les dépendances
3. Surveiller les avis de sécurité
4. Utiliser HTTPS en production
5. Implémenter une limitation de débit pour les points de terminaison API

## Structure du Projet

```
LUXURY/
├── public/                 # Ressources statiques
│   ├── image/             # Images de produits
│   └── favicon.ico
├── src/
│   ├── api/               # Fonctions API
│   ├── components/        # Composants UI réutilisables
│   │   ├── ui/           # Composants ShadCN UI
│   │   └── ...           # Composants personnalisés
│   ├── context/          # Contextes React
│   ├── hooks/            # Hooks personnalisés
│   ├── lib/              # Utilitaires
│   ├── pages/            # Composants de page
│   └── test/             # Fichiers de test
├── supabase-schema.sql   # Schéma de base de données
├── package.json          # Dépendances
├── vite.config.ts        # Configuration Vite
├── tailwind.config.ts    # Configuration Tailwind
└── README.md            # Ce fichier
```

## Contribution

1. Forker le dépôt
2. Créer une branche de fonctionnalité (`git checkout -b feature/fonctionnalite-incroyable`)
3. Commiter vos changements (`git commit -m 'Ajouter une fonctionnalité incroyable'`)
4. Pousser vers la branche (`git push origin feature/fonctionnalite-incroyable`)
5. Ouvrir une Pull Request

### Style de Code
- Utiliser TypeScript pour la sécurité des types
- Suivre la configuration ESLint
- Utiliser des messages de commit significatifs
- Tester vos changements

## Licence

Ce projet est un logiciel propriétaire. Tous droits réservés.

## Support

Pour le support ou les questions, veuillez contacter l'équipe de développement.

---

**Note** : Ce README est complet et couvre tous les aspects du projet MG LUXURY incluant l'évaluation actuelle des vulnérabilités. Des audits de sécurité réguliers et des mises à jour de dépendances sont recommandés pour maintenir les normes de sécurité.
