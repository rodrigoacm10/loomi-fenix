"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { TicketForm } from "./ticket-form"
import { useTicketStore } from "@/store/ticket-store"

export function TicketDialog() {
    const { isTicketModalOpen, closeTicketModal, selectedTicket } = useTicketStore()

    return (
        <Dialog open={isTicketModalOpen} onOpenChange={(open) => !open && closeTicketModal()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{selectedTicket ? "Editar Ticket" : "Novo Ticket"}</DialogTitle>
                </DialogHeader>
                <TicketForm />
            </DialogContent>
        </Dialog>
    )
}
