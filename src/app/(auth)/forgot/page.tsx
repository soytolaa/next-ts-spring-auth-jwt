"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/action/authAction";
import toast from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
const ForgotPasswordPage = () => {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const resetPasswordData = {
      email: searchParams.get("email") as string,
      newPassword: formData.get("newPassword") as string,
      confirmNewPassword: formData.get("confirmNewPassword") as string,
    };
    setIsLoading(true);
    const response = await resetPasswordAction(resetPasswordData);
    if (response.statusCode === 200) {
      toast.success("Password reset successfully!");
      router.push("/login");
      setIsLoading(false);
    } else {
      toast.error(response.errorMessage);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleForgotPassword} className="w-full max-w-md">
        <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Reset Password</h2>
            <p className="text-sm text-muted-foreground">
              Enter your new password and confirm it
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
