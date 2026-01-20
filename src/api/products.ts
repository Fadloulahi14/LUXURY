export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  composition?: string;
  image: string;
  stock: number;
  featured?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Thiouraye Royal",
    price: 5000,
    category: "thiouraye",
    description: "Thiouraye artisanal aux senteurs nobles et profondes. Un encens traditionnel sénégalais qui parfume votre intérieur d'une fragrance envoûtante et raffinée.",
    image: "/image/thiouray11.jpeg",
    stock: 12,
    featured: true,
    isNew: false
  },
  {
    id: 2,
    name: "Huile de Coco Vierge",
    price: 3000,
    category: "huile",
    description: "Huile 100% naturelle, extraite à froid, hydratante pour peau et cheveux. Nourrit en profondeur et apporte brillance et douceur.",
    composition: "100% huile de coco vierge pure, extraite à froid sans additifs ni conservateurs.",
    image: "/image/huile1.jpeg",
    stock: 20,
    featured: true,
    isNew: true
  },
  {
    id: 3,
    name: "Thiouraye Nuit d'Orient",
    price: 7500,
    category: "thiouraye",
    description: "Un mélange exclusif aux notes orientales mystérieuses. Parfait pour créer une ambiance chaleureuse et luxueuse.",
    image: "/image/thiouray12.jpeg",
    stock: 8,
    featured: true,
    isNew: true
  },
  {
    id: 4,
    name: "Huile d'Argan Pure",
    price: 8500,
    category: "huile",
    description: "L'or liquide du Maroc. Cette huile précieuse régénère, nourrit et protège votre peau et vos cheveux.",
    composition: "100% huile d'argan biologique, pressée à froid, riche en vitamine E et acides gras essentiels.",
    image: "/image/huile2.jpeg",
    stock: 15,
    featured: false,
    isNew: false
  },
  {
    id: 5,
    name: "Thiouraye Tradition",
    price: 3500,
    category: "thiouraye",
    description: "La recette ancestrale transmise de génération en génération. Un classique intemporel.",
    image: "/image/thiouray13.jpeg",
    stock: 25,
    featured: false,
    isNew: false
  },
  {
    id: 6,
    name: "Huile de Baobab",
    price: 6000,
    category: "huile",
    description: "Trésor africain aux propriétés exceptionnelles. Hydrate, apaise et protège les peaux les plus sensibles.",
    composition: "Huile de baobab pure, riche en vitamines A, D, E et F. Pressée à froid.",
    image: "/image/huile3.jpeg",
    stock: 10,
    featured: true,
    isNew: false
  },
  {
    id: 7,
    name: "Thiouraye Prestige Collection",
    price: 12000,
    category: "thiouraye",
    description: "Notre création la plus exclusive. Un assemblage rare de résines précieuses pour les connaisseurs.",
    image: "/image/thiouray14.jpeg",
    stock: 5,
    featured: true,
    isNew: true
  },
  {
    id: 8,
    name: "Huile de Nigelle",
    price: 5500,
    category: "huile",
    description: "L'huile aux mille vertus. Renforce le système immunitaire et sublime votre beauté naturelle.",
    composition: "Huile de nigelle (cumin noir) 100% pure, pressée à froid, sans additifs.",
    image: "/image/huile1.jpeg",
    stock: 18,
    featured: false,
    isNew: true
  }
];
