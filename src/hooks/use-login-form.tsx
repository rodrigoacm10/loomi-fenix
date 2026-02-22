import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import api from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { SuccessToast } from "@/components/global/success-toast";
import { ErrorToast } from "@/components/global/error-toast";
import { LoginFormValues, loginSchema } from "@/schemas/login-schema";

export function useLoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const { login } = useAuthStore();
    const t = useTranslations("LoginPage");

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", data);
            const { access_token } = response.data;

            const user = { email: data.email };

            login(access_token, user, data.rememberMe);
            toast.custom((toastProps) => (
                <SuccessToast
                    t={toastProps}
                    title={t("successMessage")}
                    description={t("successDescription")}
                />
            ));
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            const err = error as { response?: { data?: { message?: string } } };
            toast.custom((toastProps) => (
                <ErrorToast
                    t={toastProps}
                    title={err.response?.data?.message || t("failMessage")}
                    description=""
                />
            ));
        } finally {
            setIsLoading(false);
        }
    }

    return {
        form,
        onSubmit,
        isLoading,
        showPassword,
        setShowPassword,
        t,
    };
}
