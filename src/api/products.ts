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
  
];
