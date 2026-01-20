export interface Category {
  id: number;
  name: string;
  label: string;
  description: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "huile",
    label: "Huiles Naturelles",
    description: "Huiles pures et naturelles pour la beauté et le bien-être",
    image: "/image/huile1.jpeg"
  },
  {
    id: 2,
    name: "parfum",
    label: "Parfum",
    description: "Parfums naturels et authentiques inspirés des traditions sénégalaises",
    image: "/image/thiouray11.jpeg"
  },
  {
    id: 3,
    name: "thiouraye",
    label: "Thiourayes",
    description: "Encens traditionnels sénégalais aux parfums envoûtants",
    image: "/image/thiouray12.jpeg"
  },
  {
    id: 4,
    name: "poudre-riz",
    label: "Poudre de Riz",
    description: "Poudres de riz naturelles pour le maquillage et les soins de la peau",
    image: "/image/thiouray13.jpeg"
  }
];
