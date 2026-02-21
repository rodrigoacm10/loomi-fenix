"use client";

import { useEffect } from "react";
import Container from "@/components/global/container";
import { useTicketStore } from "@/store/ticket-store";
import { TicketDataTable } from "@/components/tickets/ticket-data-table";
import { columns } from "@/components/tickets/ticket-columns";
import { TicketDialog } from "@/components/tickets/ticket-dialog";
import { DeleteTicketDialog } from "@/components/tickets/delete-ticket-dialog";
import { TicketCardInfo } from "@/components/tickets/ticket-card-info";
import { useTranslations } from "next-intl";

export default function TicketsPage() {
    const { tickets, loading, fetchTickets } = useTicketStore();
    const t = useTranslations("TicketsPage");

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const openTickets = tickets.filter(t => t.status === 'Aberto').length;
    const inProgressTickets = tickets.filter(t => t.status === 'Em andamento').length;
    const closedToday = tickets.filter(t => {
        if (t.status !== 'Fechado') return false;
        const today = new Date().toDateString();
        const updated = new Date(t.updatedAt).toDateString();
        return today === updated;
    }).length;
    const averageTime = "2h 30m";

    return (
        <div className="space-y-[32px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                <TicketCardInfo title={t("openTickets")} data={openTickets} icon="/icons/ticket/Icon1.svg" />
                <TicketCardInfo title={t("inProgressTickets")} data={inProgressTickets} icon="/icons/ticket/Icon4.svg" />
                <TicketCardInfo title={t("closedToday")} data={closedToday} icon="/icons/ticket/Icon3.svg" />
                <TicketCardInfo title={t("averageTime")} data={averageTime} icon="/icons/ticket/Icon2.svg" />
            </div>

            <Container className="pb-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{t("ticketListTitle")}</h2>
                </div>

                {loading ? (
                    <div className="flex justify-center p-8">{t("loadingTickets")}</div>
                ) : (
                    <TicketDataTable columns={columns} data={tickets} />
                )}
            </Container>

            <TicketDialog />
            <DeleteTicketDialog />
        </div>
    );
}
