// src/Interfaces/UserInterface.ts
export interface User {
    user_id: number;
    username: string;
    email: string;
    fullname: string;
    status: boolean;
    password: string;
    role: boolean;
    avatar?: string;
    phone?: string;
    address?: string;
    created_at: string;
    updated_at: string;
  }
  