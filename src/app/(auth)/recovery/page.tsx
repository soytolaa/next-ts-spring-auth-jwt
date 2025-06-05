"use client";
import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { recoveryAccountAction } from "@/action/authAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";
import { ShoppingBag, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

const recoverySchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type RecoveryFormData = z.infer<typeof recoverySchema>;

const RecoveryPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RecoveryFormData>>({});

  const handleRecoveryAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const recoveryData = {
      email: formData.get("email") as string,
    };

    try {
      const validatedData = recoverySchema.parse(recoveryData);
      setIsLoading(true);

      const response = await recoveryAccountAction(validatedData.email);

      if (response.statusCode === 200) {
        toast.success("Recovery code sent to your email");
        router.push(
          `/otp?type=recovery&email=${encodeURIComponent(validatedData.email)}`
        );
      } else {
        toast.error(response.errorMessage || "Failed to send recovery email");
        setErrors({ email: response.errorMessage });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<RecoveryFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof RecoveryFormData] = err.message;
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">StreamLine</span>
          </div>

          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-emerald-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Account Recovery</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email address and we'll send you a recovery code
          </p>
        </div>

        <form onSubmit={handleRecoveryAccount} className="mt-8 space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="name@example.com"
                className={`${
                  errors.email ? "border-red-500" : "border-gray-300"
                } h-11 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
              <p className="text-sm text-emerald-800">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-sm text-emerald-700 mt-2 space-y-1">
                <li>• We'll send a 6-digit verification code to your email</li>
                <li>• Enter the code on the next page</li>
                <li>• Create a new password for your account</li>
              </ul>
            </div>

            <Button
              className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Sending recovery code..." : "Send recovery code"}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            <Link
              href="/login"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to login
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
              >
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPage;
