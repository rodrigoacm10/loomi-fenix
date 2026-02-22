"use client";

import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLoginForm } from "@/hooks/use-login-form";

export default function LoginForm() {
    const { form, onSubmit, isLoading, showPassword, setShowPassword, t } = useLoginForm();
    const { register, handleSubmit, setValue, formState: { errors } } = form;

    return (
        <div className="h-full w-full grid gap-6 space-y-4">
            <div className="flex flex-col space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
                <p className="">
                    {t("description")}
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
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
                            className="px-5 py-6 rounded-[15px] border-white/40"
                        />
                        <p className="text-sm text-white/40 ml-5">{t("emailLabel")}</p>
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder={t("passwordPlaceholder")}
                                autoCapitalize="none"
                                autoComplete="current-password"
                                disabled={isLoading}
                                {...register("password")}
                                className="px-5 py-6 rounded-[15px] border-white/40"
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
                            <Checkbox id="remember" onCheckedChange={(checked) => setValue("rememberMe", checked as boolean)} className="border-white !border-[1px]" />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {t("rememberMe")}
                            </label>
                        </div>

                        <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-loomi-primary hover:underline"
                        >
                            {t("forgotPassword")}
                        </Link>

                    </div>

                    <Button disabled={isLoading} className="mt-4 bg-loomi-secondary hover:bg-loomi-secondary-hover py-6 rounded-[15px]">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t("submit")}
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-loomi-bg-dark px-2">
                        {t("orContinueWith")}
                    </span>
                </div>
            </div>
            <div className="text-center text-sm">
                {t("dontHaveAccount")}{" "}
                <Link href="/register" className="font-semibold text-loomi-primary hover:underline">
                    {t("signUp")}
                </Link>
            </div>
        </div>
    );
}
