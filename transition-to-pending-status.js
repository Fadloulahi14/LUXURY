// Script pour remettre le système en mode 'en attente' après exécution du script SQL
// À exécuter une fois que add-pending-status.sql a été exécuté dans Supabase

// 1. Dans Checkout.tsx, changer :
// status: 'en cours' as const,
// Par :
// status: 'en attente' as const,

// 2. Dans DashboardAdmin.tsx, changer :
// 'en cours': 'bg-orange-100 text-orange-800',
// Par :
// 'en attente': 'bg-orange-100 text-orange-800',

// 3. Et changer toutes les conditions :
// order.status === 'en cours'
// Par :
// order.status === 'en attente'

console.log('Instructions pour la transition vers le statut "en attente"');