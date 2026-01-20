export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalPrice: number;
  status: "en cours" | "confirmée" | "expédiée" | "livrée" | "annulée";
  date: string;
  address: string;
}

export const orders: Order[] = [
  {
    id: 1,
    userId: 1,
    customerName: "Fatou Diallo",
    customerEmail: "fatou@example.com",
    customerPhone: "+221 77 123 45 67",
    items: [
      { productId: 1, quantity: 2, price: 5000 },
      { productId: 2, quantity: 1, price: 3000 }
    ],
    totalPrice: 13000,
    status: "en cours",
    date: "2026-01-15",
    address: "Dakar, Almadies"
  },
  {
    id: 2,
    userId: 2,
    customerName: "Amadou Sow",
    customerEmail: "amadou@example.com",
    customerPhone: "+221 78 987 65 43",
    items: [
      { productId: 3, quantity: 1, price: 7500 }
    ],
    totalPrice: 7500,
    status: "confirmée",
    date: "2026-01-14",
    address: "Dakar, Plateau"
  },
  {
    id: 3,
    userId: 3,
    customerName: "Mariama Ba",
    customerEmail: "mariama@example.com",
    customerPhone: "+221 76 555 44 33",
    items: [
      { productId: 7, quantity: 1, price: 12000 },
      { productId: 4, quantity: 2, price: 8500 }
    ],
    totalPrice: 29000,
    status: "livrée",
    date: "2026-01-10",
    address: "Saint-Louis, Centre-ville"
  }
];
