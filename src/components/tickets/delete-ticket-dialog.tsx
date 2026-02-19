"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTicketStore } from "@/store/ticket-store"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function DeleteTicketDialog() {
    const {
        isDeleteModalOpen,
        closeDeleteModal,
        ticketToDelete,
        deleteTicket,
        loading
    } = useTicketStore()

    const handleDelete = async () => {
        if (!ticketToDelete) return

        try {
            await deleteTicket(ticketToDelete.id)
            toast.success("Ticket excluído com sucesso!")
        } catch (error) {
            toast.error("Erro ao excluir ticket")
        }
    }

    return (
        <Dialog open={isDeleteModalOpen} onOpenChange={(open) => !open && closeDeleteModal()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Excluir Ticket</DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir o ticket <strong>{ticketToDelete?.ticketId}</strong>?
                        Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={closeDeleteModal} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
