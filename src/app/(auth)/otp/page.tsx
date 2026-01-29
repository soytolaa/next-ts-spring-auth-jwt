"use client";
import React, { useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { resendOtpAction, verifyOtpAction } from "@/action/authAction";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import toast from "react-hot-toast";
import { ShoppingBag, Mail, Clock } from "lucide-react";

export default function OtpPage() {
  const [otpCode, setOtpCode] = useState<string>("");
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const [optExpired, setOptExpired] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const type = searchParams.get("type");
  const [timer, setTimer] = React.useState(60);

  const handleVerify = async () => {
    if (otpCode.length !== 6) {
      toast.error("Please enter a complete 6-digit code");
      return;
    }

    setIsLoadingVerify(true);
    try {
      const response = await verifyOtpAction(Number.parseInt(otpCode));
      if (response.statusCode === 200) {
        toast.success("OTP verified successfully!");
        if (type === "verify") {
          router.push("/admin");
        } else if (type === "register") {
          router.push("/login");
        } else if (type === "recovery") {
          router.push(`/forgot?email=${encodeURIComponent(email as string)}`);
        }
      } else {
        toast.error(response.errorMessage);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to verify OTP"
      );
    } finally {
      setIsLoadingVerify(false);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      setOptExpired(true);
      return;
    }
    setOptExpired(false);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    setOtpCode("");
    if (!email) {
      toast.error("Email context is missing");
      return;
    }
    setIsLoadingResend(true);
    try {
      const response = await resendOtpAction(email);
      toast.success(response.message || "OTP resent successfully!");
      setTimer(60);
      setOptExpired(false);
      setIsLoadingResend(false);
    } catch (error) {
      console.error("Resend error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to resend OTP"
      );
      setIsLoadingResend(false);
    }
  };

  const getPageTitle = () => {
    switch (type) {
      case "register":
        return "Complete Registration";
      case "verify":
        return "Verify Your Account";
      case "recovery":
        return "Reset Password";
      default:
        return "Verify Your Email";
    }
  };

  const getPageDescription = () => {
    switch (type) {
      case "register":
        return "We've sent a verification code to complete your account setup";
      case "verify":
        return "Please verify your email address to access your account";
      case "recovery":
        return "Enter the code to proceed with password reset";
      default:
        return "Enter the 6-digit code sent to your email";
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md border border-gray-100 shadow-xl">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              Bean Team
            </span>
          </div>

          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-emerald-600" />
          </div>

          <CardTitle className="text-2xl font-bold text-gray-900">
            {getPageTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            {getPageDescription()}
          </CardDescription>

          {email && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <p className="text-sm text-emerald-800">
                Code sent to: <span className="font-medium">{email}</span>
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6 pt-0">
          <div className="flex justify-center"> 
            <InputOTP
              maxLength={6}
              value={otpCode?.toString()}
              onChange={setOtpCode}
              className="gap-2"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="w-12 h-12 text-lg font-semibold border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                />
                <InputOTPSlot
                  index={1}
                  className="w-12 h-12 text-lg font-semibold border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                />
                <InputOTPSlot
                  index={2}
                  className="w-12 h-12 text-lg font-semibold border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                />
                <InputOTPSlot
                  index={3}
                  className="w-12 h-12 text-lg font-semibold border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                />
                <InputOTPSlot
                  index={4}
                  className="w-12 h-12 text-lg font-semibold border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                />
                <InputOTPSlot
                  index={5}
                  className="w-12 h-12 text-lg font-semibold border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
            onClick={handleVerify}
            disabled={isLoadingVerify || otpCode.length !== 6}
          >
            {isLoadingVerify ? "Verifying..." : "Verify Code"}
          </Button>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {optExpired
                  ? "Code expired"
                  : `Code expires in ${formatTime(timer)}`}
              </span>
            </div>

            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <button
                type="button"
                className={`font-medium transition-colors ${
                  optExpired || !isLoadingResend
                    ? "text-emerald-600 hover:text-emerald-800 hover:underline"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={handleResend}
                disabled={isLoadingResend || (!optExpired && timer > 0)}
              >
                {isLoadingResend ? "Resending..." : "Resend code"}
              </button>
            </p>

            {optExpired && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">
                  Your verification code has expired. Please request a new one.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Having trouble? Contact our support team for assistance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
