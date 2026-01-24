export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}

export const users: User[] = [
  {
    id: 1,
    name: "Admin MG Luxury",
    email: "admin@mgluxury.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: 2,
    name: "Client Test",
    email: "client@test.com",
    password: "client123",
    role: "customer"
  },
  {
    id: 3,
    name: "Fatou Diallo",
    email: "fatou@example.com",
    password: "fatou123",
    role: "customer"
  }
];
