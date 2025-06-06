"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "nextjs-toploader/app";
import { z } from "zod";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(2, "Password must be at least 2 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<LoginFormData>>({});

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const loginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const validatedData = loginSchema.parse(loginData);
      setIsLoading(true);

      const res = await signIn("credentials", {
        // login with credentials
        redirect: false, // prevent redirect to /admin it will wait for the response
        ...validatedData, // validated data
      });

      if (!res) {
        // if response is not ok then show error
        toast.error("No response from server");
        return;
      }
      if (res.ok) {
        // if response is ok then login successfully
        toast.success("Login successfully!");
        router.push("/admin");
        setIsLoading(false);
      } else {
        switch (
          res.error // if response is not ok then show error
        ) {
          case "Invalid password!":
            toast.error("Invalid password!");
            setIsLoading(false);
            break;
          case "User email not found!":
            toast.error("User email not found!");
            setIsLoading(false);
            break;
          case "User not verified!":
            toast.error("User not verified!");
            router.push(
              `/otp?type=verify&email=${encodeURIComponent(loginData.email)}`
            );
            setIsLoading(false);
            break;
          default:
            toast.error(res.error || "Login failed");
            setIsLoading(false);
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // if error is zod error then show error
        const fieldErrors: Partial<LoginFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      setIsLoading(false);
    }
  }
  // google sign in
  const handleGoogleSignIn = async () => {
    try {
      const res = await signIn("google", {
        callbackUrl: "/admin", // after login redirect to admin page
        redirect: false, // prevent redirect to /admin it will wait for the response
      });
      if (res?.ok) {
        // if response is ok then login successfully
        toast.success("Login successfully!");
        router.push("/admin");
        setIsLoading(false);
      }
    } catch (error) {
      // if response is not ok then show error
      toast.error("Failed to sign in with Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              Cocoon Team
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Link
                  href="/recovery"
                  className="text-sm text-emerald-600 hover:text-emerald-800 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } h-11 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <Button
              className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full h-11 border-gray-300 hover:bg-gray-50 hover:border-gray-400 flex items-center justify-center"
          onClick={handleGoogleSignIn}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </Button>
        <div className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
