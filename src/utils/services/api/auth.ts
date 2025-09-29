import api from "./axios";

export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export class AuthAPI {
  static async getCsrfCookie(): Promise<void> {
    return;
    await api.get("/api/v1/csrf-cookie");
  }

  // IMPORTANT: DUMMY . REMOVE LATER
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    if (credentials.email === "aminul@employers.io" && credentials.password === "password") {
      return {
        user: {
          id: 1,
          name: "Admin User",
          email: "aminul@employers.io",
          email_verified_at: new Date().toISOString(),
          created_at: "2024-01-01T00:00:00Z",
          updated_at: new Date().toISOString(),
        },
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error = new Error() as any;
    error.response = { data: { message: "Invalid credentials" } };
    throw error;
  }

  // static async login(credentials: LoginCredentials): Promise<AuthResponse> {
  //   const response = await api.post("/auth/login", credentials);
  //   return response.data;
  // }

  static async logout(): Promise<void> {
    await api.post("/api/v1/logout");
  }

  static async getUser(): Promise<User> {
    const response = await api.get("/api/v1/user");
    return response.data;
  }

  static async register(userData: { name: string; email: string; password: string; password_confirmation: string }): Promise<AuthResponse> {
    const response = await api.post("/api/v1/register", userData);
    return response.data;
  }

  static async verifyAuth(): Promise<boolean> {
    try {
      await this.getUser();
      return true;
    } catch {
      return false;
    }
  }
}
