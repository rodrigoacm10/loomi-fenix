"use client";

import { useEffect } from "react";
import Container from "@/components/global/container";
import { useTicketStore } from "@/store/ticket-store";
import { TicketDataTable } from "@/components/tickets/ticket-data-table";
import { columns } from "@/components/tickets/ticket-columns";
import { TicketDialog } from "@/components/tickets/ticket-dialog";
import { DeleteTicketDialog } from "@/components/tickets/delete-ticket-dialog";
import { TicketCardInfo } from "@/components/tickets/ticket-card-info";

export default function TicketsPage() {
    const { tickets, loading, fetchTickets } = useTicketStore();

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    // Calculate KPI metrics locally for now
    const openTickets = tickets.filter(t => t.status === 'Aberto').length;
    const inProgressTickets = tickets.filter(t => t.status === 'Em andamento').length;
    const closedToday = tickets.filter(t => {
        if (t.status !== 'Fechado') return false;
        const today = new Date().toDateString();
        const updated = new Date(t.updatedAt).toDateString();
        return today === updated;
    }).length;
    const averageTime = "2h 30m";

    console.log('[TICKETS] -><>:', tickets)
    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <TicketCardInfo title="TIckets Abertos" data={openTickets} icon="/icons/ticket/Icon1.svg" />
                <TicketCardInfo title="Em AndameSnto" data={inProgressTickets} icon="/icons/ticket/Icon4.svg" />
                <TicketCardInfo title="Resolvidos hoje" data={closedToday} icon="/icons/ticket/Icon3.svg" />
                <TicketCardInfo title="Tempo Médio" data={averageTime} icon="/icons/ticket/Icon2.svg" />
            </div>

            <Container>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Lista de Tickets</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8">Carregando tickets...</div>
                ) : (
                    <TicketDataTable columns={columns} data={tickets} />
                )}
            </Container>

            <TicketDialog />
            <DeleteTicketDialog />
        </div>
    );
}
