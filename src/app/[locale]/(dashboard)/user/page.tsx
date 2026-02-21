"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, LogOut, Save, Camera } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuccessToast } from "@/components/global/success-toast";
import { ErrorToast } from "@/components/global/error-toast";
import Container from "@/components/global/container";
import { DeleteUserDialog } from "@/components/user/delete-user-dialog";
import { Skeleton } from "@/components/ui/skeleton";

const userSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
});
type UserValues = z.infer<typeof userSchema>;

export default function UserPage() {
    const t = useTranslations("UserPage");
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [userId, setUserId] = useState<string>("");
    const [nameInitials, setNameInitials] = useState("");

    const form = useForm<UserValues>({
        resolver: zodResolver(userSchema),
        defaultValues: { name: "", email: "" },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) return;

            try {
                const response = await api.get(`/users/by-email/${user.email}`);
                const data = response.data;
                if (data && data.id) {
                    setUserId(data.id);
                    form.reset({ name: data.name || "", email: data.email || "" });
                    setNameInitials(data.name || "");
                }
            } catch (error) {
                console.error("Failed to fetch user by email:", error);
                toast.custom((toastProps) => (
                    <ErrorToast t={toastProps} title={t("fetchError")} description="" />
                ));
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user?.email, t]);

    const onSubmit = async (data: UserValues) => {
        if (!userId) return;

        setIsSaving(true);
        try {
            await api.patch(`/users/${userId}`, {
                name: data.name,
                email: data.email,
                state: "CONFIRMED"
            });
            setNameInitials(data.name);
            toast.custom((toastProps) => (
                <SuccessToast
                    t={toastProps}
                    title={t("successUpdateMessage")}
                    description={t("successUpdateDesc")}
                />
            ));
        } catch (error) {
            console.error("Failed to update user:", error);
            toast.custom((toastProps) => (
                <ErrorToast t={toastProps} title={t("updateError")} description="" />
            ));
        } finally {
            setIsSaving(false);
        }
    };



    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (isLoading) {
        return (
            <div className="flex w-full justify-center">
                <Container className="max-w-[600px] w-full space-y-6">
                    <Skeleton className="h-7 w-48 rounded" />

                    <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                        <Skeleton className="h-32 w-32 rounded-full" />
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24 ml-5 rounded" />
                            <Skeleton className="h-14 w-full rounded-[20px]" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24 ml-5 rounded" />
                            <Skeleton className="h-14 w-full rounded-[20px]" />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Skeleton className="h-[72px] flex-1 rounded-[15px]" />
                        <Skeleton className="h-[72px] flex-1 rounded-[15px]" />
                    </div>

                    <div className="pt-8 mt-8 border-t border-white/10">
                        <Skeleton className="h-14 w-full rounded-[15px]" />
                    </div>
                </Container>
            </div>
        );
    }

    const initials = nameInitials ? nameInitials.split(" ").map(n => n.charAt(0)).join("").substring(0, 2).toUpperCase() : "AA";

    return (
        <div className="flex w-full justify-center">
            <Container className="max-w-[600px] w-full">
                <h1 className="text-xl font-bold text-white">{t("title")}</h1>
                <div className="flex flex-col items-center justify-center space-y-4 relative">
                    <div className="relative group cursor-pointer">
                        <div className="h-32 w-32 border-4 border-loomi-primary rounded-full flex">
                            <div className="bg-loomi-primary text-white text-4xl font-semibold rounded-full flex-1 flex items-center justify-center">
                                <p>{initials}</p> </div>
                        </div>
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="pl-4 font-semibold">{t("nameLabel")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10"
                                            placeholder={t("namePlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="pl-4 font-semibold">{t("emailLabel")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10"
                                            placeholder={t("emailPlaceholder")} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4 flex flex-col sm:flex-row gap-4">
                            <Button
                                type="submit"
                                disabled={isSaving}
                                className="flex-1 bg-loomi-primary hover:bg-loomi-primary-hover w-[100px] p-6 rounded-[14px]"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                                {t("save")}
                            </Button>

                            <Button
                                type="button"
                                onClick={handleLogout}
                                variant="ghost"
                                className="flex-1 ring-1 ring-inset w-[100px] p-6 rounded-[14px] hover:bg-black hover:ring-white hover:text-white"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                {t("logout")}
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="pt-8 mt-8 border-t border-white/10">
                    <DeleteUserDialog userId={userId} />
                </div>
            </Container>

        </div>
    );
}
