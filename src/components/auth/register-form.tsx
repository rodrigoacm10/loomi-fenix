"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import api from "@/lib/api";
import { SuccessToast } from "../global/success-toast";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const t = useTranslations("RegisterPage");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterFormValues) {
        setIsLoading(true);
        try {
            await api.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password,
                challengeLevel: 1,
            });

            toast.custom((toastProps) => (
                <SuccessToast
                    t={toastProps}
                    title={t("successMessage")}
                    description={t("successDescription")}
                />
            ))
            router.push("/login");
        } catch (error) {
            console.error(error);
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || t("failMessage"));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-full w-full grid gap-6 space-y-4">
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
                <p className="text-sm text-muted-foreground">
                    {t("description")}
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Input
                            id="name"
                            placeholder={t("namePlaceholder")}
                            type="text"
                            autoCapitalize="words"
                            autoComplete="name"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("name")}
                            className="px-5 py-6 rounded-[15px] border-[#ffffff]/40"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Input
                            id="email"
                            placeholder={t("emailPlaceholder")}
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                            className="px-5 py-6 rounded-[15px] border-[#ffffff]/40"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                autoCapitalize="none"
                                autoComplete="new-password"
                                disabled={isLoading}
                                placeholder={t("passwordPlaceholder")}
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
                    <div className="grid gap-2">
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                autoCapitalize="none"
                                autoComplete="new-password"
                                disabled={isLoading}
                                placeholder={t("confirmPasswordPlaceholder")}
                                {...register("confirmPassword")}
                                className="px-5 py-6 rounded-[15px] border-[#ffffff]/40"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <Button disabled={isLoading} className="mt-4 bg-[#1876D2] py-6 rounded-[15px]">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t("submit")}
                    </Button>
                </div>
            </form>
            <div className="text-center text-sm">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/login" className="font-semibold text-[#1876D2] hover:underline">
                    {t("signIn")}
                </Link>
            </div>
        </div>
    );
}
