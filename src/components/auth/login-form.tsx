"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useAuthStore();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", data);
            const { access_token } = response.data;

            // Mock user data since API doesn't return it on login
            // Ideally we would fetch /users/me or decode the token
            const user = { email: data.email };

            login(access_token, user, data.rememberMe);
            toast.success("Successfully logged in!");
            router.push("/dashboard");
        } catch (error: any) { // using any for error for simplicity, usually strict typing is better
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-full w-full grid gap-6 space-y-4">
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Input
                            id="email"
                            placeholder="Usuário"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                            className="px-5 py-6 rounded-[15px] border-[#ffffff]/40"
                        />
                        <p className="text-sm text-[#ffffff]/40 ml-5">Insira o seu e-mail, CPF ou passaporte.</p>
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Senha"
                                autoCapitalize="none"
                                autoComplete="current-password"
                                disabled={isLoading}
                                {...register("password")}
                                className="px-5 py-6 rounded-[15px] border-[#ffffff]/40"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)} className="border-[#ffffff] !border-[1px]" />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>

                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-[#1876D2] hover:underline"
                        >
                            Forgot password?
                        </Link>

                    </div>

                    <Button disabled={isLoading} className="mt-4 bg-[#1876D2] py-6">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0b1125] px-2">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="text-center text-sm"> {/* Added Register Link */}
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-[#1876D2] hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
}
