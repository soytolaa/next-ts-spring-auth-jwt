"use server";
import {
  loginService,
  registerService,
  resendOtpService,
  changePasswordService,
  verifyOtpService,
  resetPasswordService,
  getUserDetailService,
  recoveryAccountService,
  oauthLoginService,
} from "@/service/authService";
import { Login, Register, ForgotPassword } from "@/types/auth";

export const loginAction = async (loginData: Login) => {
  const response = await loginService(loginData);
  return response;
};

export const registerAction = async (registerData: Register) => {
  const response = await registerService(registerData);
  return response;
};

export const verifyOtpAction = async (otpCode: number) => {
  const response = await verifyOtpService(otpCode);
  return response;
};

export const resendOtpAction = async (email: string) => {
  const response = await resendOtpService(email);
  return response;
};

export const changePasswordAction = async (email: string) => {
  const response = await changePasswordService(email);
  return response;
};

export const getUserDetailAction = async (email: string) => {
  const response = await getUserDetailService(email);
  return response;
};

export const resetPasswordAction = async (data: ForgotPassword) => {
  const response = await resetPasswordService(data);
  return response;
};

export const recoveryAccountAction = async (email: string) => {
  const response = await recoveryAccountService(email);
  return response;
};


export const oauthLoginAction = async (data: {}) => {
  const response = await oauthLoginService(data);
  return response;
};