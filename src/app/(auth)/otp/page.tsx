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
    try {
      const response = await verifyOtpAction(parseInt(otpCode));
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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Verify your email
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpCode?.toString()}
              onChange={setOtpCode}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={isLoadingVerify}
          >
            {isLoadingVerify ? "Verifying..." : "Verify OTP"}
          </Button>
          <p className="text-sm text-center text-muted-foreground cursor-pointer w-full">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => {
                setOtpCode("");
                handleResend();
              }}
              disabled={isLoadingResend}
            >
              {isLoadingResend ? "Resending..." : "Resend"} {timer}s
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
