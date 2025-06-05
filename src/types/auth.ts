export type User = {
  userId: number;
  userName: string;
  email: string;
  type: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
}

export interface Users {
  userId: number;
  email: string;
  accessToken: string;
}

export interface ForgotPassword {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}
