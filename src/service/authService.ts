import { headerToken } from "@/app/api/headerToken";
import { ForgotPassword, Login, Register } from "@/types/auth";

export async function loginService(data: Login) {
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...data }),
  });
  return response.json();
}

export async function registerService(data: Register) {
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/auth/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...data }),
  });
  console.log("response", JSON.stringify({...data}));
  return response.json();
}

export async function verifyOtpService(otpCode: number) {
  const { headers } = await headerToken(false);
  const response = await fetch(
    `${process.env.API_URL}/auth/verify-otp?otpCode=${otpCode}`,
    {
      method: "PUT",
      headers: headers,
    }
  );
  return response.json();
}

export async function resendOtpService(email: string) {
  const { headers } = await headerToken(false);
  const response = await fetch(
    `${process.env.API_URL}/auth/resend-otp?email=${email}`,
    {
      method: "PUT",
      headers: headers,
    }
  );
  return response.json();
}

export async function changePasswordService(email: string) {
  const { headers } = await headerToken(true);
  const response = await fetch(
    `${process.env.API_URL}/auth/change-password?email=${email}`,
    {
      method: "PUT",
      headers: headers,
    }
  );
  return response.json();
}

export async function getUserDetailService(email: string) {
  const { headers } = await headerToken(true);
  const response = await fetch(
    `${process.env.API_URL}/auth/user-detail?email=${email}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  return response.json();
}

export async function resetPasswordService(data: ForgotPassword) {
  const { headers } = await headerToken(true);
  const response = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({ ...data }),
  });
  return response.json();
}

export async function recoveryAccountService(email: string) {
  const { headers } = await headerToken(false);
  const response = await fetch(
    `${process.env.API_URL}/auth/recovery-password?email=${email}`,
    {
      method: "GET",
      headers: headers,
    }
  );
  return response.json();
}

export async function oauthLoginService(data: {}) {
  const { headers } = await headerToken(false);
  const response = await fetch(`${process.env.API_URL}/auth/oauth-login`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ ...data }),
  });
  console.log("$$OAuth Login Service", JSON.stringify({...data}));
  return response.json();
}
