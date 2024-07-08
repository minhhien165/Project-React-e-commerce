// src/Interfaces/UserInterface.ts
export interface User {
    id: number;
    username: string;
    email: string;
    fullname: string;
    status: 'active' | 'locked';
    password: string;
    role: 'admin' | 'user';
    avatar?: string;
    phone?: string;
    address?: string;
    created_at: string;
    updated_at: string;
  }
  