"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTicketStore } from "@/store/ticket-store"
import { toast } from "sonner"
import { SuccessToast } from "@/components/global/success-toast"
import { ErrorToast } from "@/components/global/error-toast"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

export function DeleteTicketDialog() {
    const {
        isDeleteModalOpen,
        closeDeleteModal,
        ticketToDelete,
        deleteTicket,
        loading
    } = useTicketStore()
    const t = useTranslations("DeleteTicketDialog")

    const handleDelete = async () => {
        if (!ticketToDelete) return

        try {
            await deleteTicket(ticketToDelete.id)
            toast.custom((toastProps) => (
                <SuccessToast t={toastProps} title={t("successDeleteMessage")} description="" />
            ))
        } catch (error) {
            toast.custom((toastProps) => (
                <ErrorToast t={toastProps} title={t("errorDeleteMessage")} description="" />
            ))
        }
    }

    return (
        <Dialog open={isDeleteModalOpen} onOpenChange={(open) => !open && closeDeleteModal()}>
            <DialogContent showCloseButton={false} className="!rounded-[24px] sm:max-w-[425px] text-white bg-loomi-bg-dark border-0">
                <DialogHeader className="space-y-4">
                    <div className="flex items-center justify-between pointer-events-none">
                        <DialogTitle className="text-xl font-normal pointer-events-auto">
                            {t("title")}
                        </DialogTitle>
                        <DialogClose className="rounded-full hover:bg-white/10 cursor-pointer pointer-events-auto">
                            <Image src="/icons/ticket/close.svg" alt="Close" width={45} height={45} />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </div>
                    <DialogDescription>
                        {t("description")} <strong>{ticketToDelete?.ticketId}</strong>?
                        {t("warning")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={closeDeleteModal} disabled={loading}>
                        {t("cancel")}
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t("delete")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
