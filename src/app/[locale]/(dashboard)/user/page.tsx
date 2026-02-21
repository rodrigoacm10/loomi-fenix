"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, LogOut, Save, Trash2, Camera } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuccessToast } from "@/components/global/success-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ErrorToast } from "@/components/global/error-toast";

export default function UserPage() {
    const t = useTranslations("UserPage");
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [userId, setUserId] = useState<string>("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.email) return;

            try {
                const response = await api.get(`/users/by-email/${user.email}`);
                const data = response.data;
                if (data && data.id) {
                    setUserId(data.id);
                    setName(data.name || "");
                    setEmail(data.email || "");
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

    const handleSave = async () => {
        if (!userId) return;

        setIsSaving(true);
        try {
            await api.patch(`/users/${userId}`, {
                name,
                email,
                state: "CONFIRMED"
            });
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

    const handleDelete = async () => {
        if (!userId) return;

        setIsDeleting(true);
        try {
            await api.delete(`/users/${userId}`);
            toast.custom((toastProps) => (
                <SuccessToast
                    t={toastProps}
                    title={t("successDeleteMessage")}
                    description={t("successDeleteDesc")}
                />
            ));

            logout();
            router.push("/login");

        } catch (error) {
            console.error("Failed to delete user:", error);
            toast.custom((toastProps) => (
                <ErrorToast t={toastProps} title={t("deleteError")} description="" />
            ));
            setIsDeleting(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (isLoading) {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#1876D2]" />
            </div>
        );
    }

    const initials = name ? name.split(" ").map(n => n.charAt(0)).join("").substring(0, 2).toUpperCase() : "AA";

    return (
        <div className="flex flex-col space-y-8 w-full max-w-[600px]">
            <div>
                <h1 className="text-xl font-bold text-white">{t("title")}</h1>
            </div>

            <div className="bg-[#20273e] rounded-[24px] p-8 space-y-8">
                <div className="flex flex-col items-center justify-center space-y-4 relative">
                    <div className="relative group cursor-pointer">
                        <Avatar className="h-32 w-32 border-4 border-[#1876D2]">
                            <AvatarImage src="" alt="User" />
                            <AvatarFallback className="bg-[#1876D2] text-white text-4xl font-semibold">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-5">{t("nameLabel")}</label>
                        <Input
                            placeholder={t("namePlaceholder")}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-5 py-6 rounded-[15px] border-[#ffffff]/20 bg-[#171d30] text-white focus-visible:ring-[#1876D2]"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70 ml-5">{t("emailLabel")}</label>
                        <Input
                            placeholder={t("emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-5 py-6 rounded-[15px] border-[#ffffff]/20 bg-[#171d30] text-white focus-visible:ring-[#1876D2]"
                        />
                    </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex-1 bg-[#1876D2] hover:bg-[#1876D2]/80 text-white rounded-[15px] py-6"
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                        {t("save")}
                    </Button>

                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="flex-1 border-[#ffffff]/20 bg-transparent text-white hover:bg-[#ffffff]/10 rounded-[15px] py-6"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        {t("logout")}
                    </Button>
                </div>

                <div className="pt-8 mt-8 border-t border-[#ffffff]/10">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-[15px] py-6">
                                <Trash2 className="w-5 h-5 mr-2" />
                                {t("deleteAccount")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="!rounded-[24px] sm:max-w-[425px] text-white bg-[#0b1125] border-0">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-normal text-red-500">{t("deleteConfirmTitle")}</DialogTitle>
                                <DialogDescription className="text-white/70">
                                    {t("deleteConfirmDesc")}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-4 gap-2 sm:gap-0">
                                <Button
                                    variant="outline"
                                    onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}
                                    className="border-white/20 bg-transparent text-white hover:bg-white/10 rounded-xl"
                                >
                                    {t("cancel")}
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="bg-red-500 hover:bg-red-600 rounded-xl"
                                >
                                    {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {t("confirm")}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
