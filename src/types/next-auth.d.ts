import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      accessToken: string;
    };
  }

  interface User {
    email: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    accessToken: string;
  }
}
export interface ExceptionResponse {
  errorMessage: string;
  status: string;
  statusCode: number;
  timestamp: string; // ISO string, e.g. "2024-05-30T12:34:56.789Z"
}

export interface ApiResponse<T> {
  message: string;
  payload: T;
  status: string;
  statusCode: number;
  timestamp: string; // ISO string, e.g. "2024-05-30T12:34:56.789Z"
}

export interface TokenResponse {
  email: string;
  accessToken: string;
}
