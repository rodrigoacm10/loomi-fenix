import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import api from "@/lib/api";
import { SuccessToast } from "@/components/global/success-toast";
import { ErrorToast } from "@/components/global/error-toast";
import { RegisterFormValues, registerSchema } from "@/schemas/register-schema";

export function useRegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const t = useTranslations("RegisterPage");

    const form = useForm<RegisterFormValues>({
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
            ));
            router.push("/login");
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
