"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Trash2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import { SuccessToast } from "@/components/global/success-toast";
import { ErrorToast } from "@/components/global/error-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteUserDialog({ userId }: { userId: string }) {
    const t = useTranslations("UserPage");
    const { logout } = useAuthStore();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-[15px] py-6">
                    <Trash2 className="w-5 h-5 mr-2" />
                    {t("deleteAccount")}
                </Button>
            </DialogTrigger>
            <DialogContent className="!rounded-[24px] sm:max-w-[425px] text-white bg-[#0b1125] border-0">
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-xl font-normal">{t("deleteConfirmTitle")}</DialogTitle>
                    <DialogDescription className="text-white text-sm">
                        {t("deleteConfirmDesc")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                    <Button
                        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))}
                        variant="ghost"
                        className="ring-1 ring-inset w-[100px] p-6 rounded-[14px] hover:bg-[#070b19] hover:ring-[#ffffff] hover:text-white"
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-[#d21818ff] hover:bg-[#b51414] w-[100px] p-6 rounded-[14px]"
                    >
                        {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {t("confirm")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
