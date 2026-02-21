"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { TicketForm } from "./ticket-form"
import { useTicketStore } from "@/store/ticket-store"
import { useTranslations } from "next-intl"

export function TicketDialog() {
    const { isTicketModalOpen, closeTicketModal, selectedTicket, isViewMode } = useTicketStore()
    const t = useTranslations("TicketForm");

    return (
        <Dialog open={isTicketModalOpen} onOpenChange={(open) => !open && closeTicketModal()}>
            <DialogContent className="!rounded-[24px] sm:max-w-[500px] text-white bg-[#0b1125] border-0">
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-xl font-normal">{isViewMode ? t("viewTicket") : (selectedTicket ? t("editTicket") : t("newTicket"))}</DialogTitle>
                    <DialogDescription className="text-white text-sm">
                        {t("dialogDescription")}
                    </DialogDescription>
                </DialogHeader>
                <TicketForm key={selectedTicket ? selectedTicket.id : 'new-ticket'} />
            </DialogContent>
        </Dialog>
    )
}
