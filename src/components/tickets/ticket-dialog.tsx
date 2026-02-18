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

export function TicketDialog() {
    const { isTicketModalOpen, closeTicketModal, selectedTicket, isViewMode } = useTicketStore()

    return (
        <Dialog open={isTicketModalOpen} onOpenChange={(open) => !open && closeTicketModal()}>
            <DialogContent className="!rounded-[24px] sm:max-w-[500px] text-white bg-[#0b1125] border-0">
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-xl font-normal">{isViewMode ? "Visualizar Ticket" : (selectedTicket ? "Editar Ticket" : "Novo Ticket")}</DialogTitle>
                    <DialogDescription className="text-white text-sm">
                        Preencha os dados abaixo para registrar um novo ticket na plataforma.
                    </DialogDescription>
                </DialogHeader>
                <TicketForm key={selectedTicket ? selectedTicket.id : 'new-ticket'} />
            </DialogContent>
        </Dialog>
    )
}
