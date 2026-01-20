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
    name: "Admin MG",
    email: "admin@mg.com",
    password: "admin123",
    role: "admin"
  },
  {
    id: 2,
    name: "Client Test",
    email: "client@test.com",
    password: "client123",
    role: "customer"
  }
];
