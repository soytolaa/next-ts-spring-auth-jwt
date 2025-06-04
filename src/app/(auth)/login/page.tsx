"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
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
        redirect: false,
        ...validatedData,
      });
      console.log("response###LOGIN", res);

      if (!res) {
        toast.error("No response from server");
        return;
      }
      if (res.ok) {
        toast.success("Login successfully!");
        router.push("/admin");
        setIsLoading(false);
      } else {
        switch (res.error) {
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
        const fieldErrors: Partial<LoginFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error("An unexpected error occurred");
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Login to your account</h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={errors.password ? "border-red-500" : ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
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
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="text-right">
              <Link
                href="/recovery"
                className="text-sm text-muted-foreground hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login in"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              {/* <IconGo className="mr-2 h-4 w-4" /> */}
              Sign in with Google
            </Button>
            <div className="text-center text-sm text-muted-foreground ">
              Don&apos;t have an account? <Link href="/register">Register</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
