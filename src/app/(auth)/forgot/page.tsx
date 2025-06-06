"use client";
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Eye,
  EyeOff,
  ShoppingBag,
  Lock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/action/authAction";
import toast from "react-hot-toast";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ResetPasswordFormData>>({});
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.target as HTMLFormElement);
    const resetPasswordData = {
      email: email as string,
      newPassword: formData.get("newPassword") as string,
      confirmNewPassword: formData.get("confirmNewPassword") as string,
    };

    try {
      const validatedData = resetPasswordSchema.parse({
        ...resetPasswordData,
      });

      setIsLoading(true);
      const response = await resetPasswordAction(validatedData);

      if (response.statusCode === 200) {
        toast.success("Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(response.errorMessage || "Failed to reset password");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ResetPasswordFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ResetPasswordFormData] =
              err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Check password strength
  const [password, setPassword] = useState("");
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordStrength =
    hasMinLength && hasUppercase && hasLowercase && hasNumber
      ? "strong"
      : hasMinLength && (hasUppercase || hasLowercase || hasNumber)
      ? "medium"
      : "weak";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              Coocon Team
            </span>
          </div>

          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-emerald-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Create a new password for your account
          </p>

          {email && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-emerald-800">
                <span className="font-medium">{email}</span>
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleForgotPassword} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-700">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  className={`${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } h-11 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.newPassword}
                </p>
              )}

              {/* Password strength indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordStrength === "weak"
                            ? "w-1/3 bg-red-500"
                            : passwordStrength === "medium"
                            ? "w-2/3 bg-yellow-500"
                            : "w-full bg-green-500"
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength === "weak"
                          ? "text-red-500"
                          : passwordStrength === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {passwordStrength === "weak"
                        ? "Weak"
                        : passwordStrength === "medium"
                        ? "Medium"
                        : "Strong"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword" className="text-gray-700">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  className={`${
                    errors.confirmNewPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } h-11 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Password requirements:
              </p>
              <ul className="space-y-1">
                <li className="flex items-center text-sm">
                  {hasMinLength ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-300 mr-2" />
                  )}
                  <span
                    className={hasMinLength ? "text-gray-700" : "text-gray-500"}
                  >
                    At least 8 characters long
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  {hasUppercase ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-300 mr-2" />
                  )}
                  <span
                    className={hasUppercase ? "text-gray-700" : "text-gray-500"}
                  >
                    At least one uppercase letter
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  {hasLowercase ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-300 mr-2" />
                  )}
                  <span
                    className={hasLowercase ? "text-gray-700" : "text-gray-500"}
                  >
                    At least one lowercase letter
                  </span>
                </li>
                <li className="flex items-center text-sm">
                  {hasNumber ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 text-gray-300 mr-2" />
                  )}
                  <span
                    className={hasNumber ? "text-gray-700" : "text-gray-500"}
                  >
                    At least one number
                  </span>
                </li>
              </ul>
            </div>

            <Button
              className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
              type="submit"
              disabled={isLoading || passwordStrength === "weak"}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
