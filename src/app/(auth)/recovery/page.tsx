"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { recoveryAccountAction } from "@/action/authAction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

const recoverySchema = z.object({
  email: z.string().email(),
});

const RecoveryPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const handleRecoveryAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData(e.currentTarget);
    const recoveryData = {
      email: formData.get("email") as string,
    };
    const validatedData = recoverySchema.parse(recoveryData);
    setIsLoading(true);
    const response = await recoveryAccountAction(validatedData.email);
    if (response.statusCode === 200) {
      toast.success("OTP sent to your email");
      router.push(
        `/otp?type=recovery&email=${encodeURIComponent(validatedData.email)}`
      );
    } else {
      toast.error(response.errorMessage);
      setErrors({ email: response.errorMessage });
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Recovery Account </h2>
          <p className="text-sm text-muted-foreground">
            Enter your email to recover your account
          </p>
        </div>
        <form onSubmit={handleRecoveryAccount}>
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
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
          </div>
          <Button className="w-full mt-7" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default RecoveryPage;
