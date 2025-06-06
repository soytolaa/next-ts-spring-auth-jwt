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
} from "@/service/authService";
import { Login, Register, ForgotPassword } from "@/types/auth";

export const loginAction = async (loginData: Login) => {
  const response = await loginService(loginData);
  console.log("response###ACTION", response);
  return response;
};

export const registerAction = async (registerData: Register) => {
  console.log("registerData###ACTION", { ...registerData });
  const response = await registerService(registerData);
  console.log("response###ACTION", response);
  return response;
};

export const verifyOtpAction = async (otpCode: number) => {
  console.log("otpCode###ACTION", otpCode);
  const response = await verifyOtpService(otpCode);
  console.log("response###ACTION", response);
  return response;
};

export const resendOtpAction = async (email: string) => {
  const response = await resendOtpService(email);
  console.log("response###ACTION", response);
  return response;
};

export const changePasswordAction = async (email: string) => {
  const response = await changePasswordService(email);
  console.log("response###ACTION", response);
  return response;
};

export const getUserDetailAction = async (email: string) => {
  const response = await getUserDetailService(email);
  console.log("response###ACTION", response);
  return response;
};

export const resetPasswordAction = async (data: ForgotPassword) => {
  const response = await resetPasswordService(data);
  console.log("response###ACTION", response);
  return response;
};

export const recoveryAccountAction = async (email: string) => {
  const response = await recoveryAccountService(email);
  console.log("response###ACTION", response);
  return response;
};
