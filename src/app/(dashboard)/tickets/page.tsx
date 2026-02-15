"use client";

import { useEffect } from "react";
import Container from "@/components/global/container";
import { useTicketStore } from "@/store/ticket-store";
import { TicketDataTable } from "@/components/tickets/ticket-data-table";
import { columns } from "@/components/tickets/ticket-columns";
import { TicketDialog } from "@/components/tickets/ticket-dialog";
import { DeleteTicketDialog } from "@/components/tickets/delete-ticket-dialog";
import { Ticket as TicketIcon, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    // Mock for average time as we don't have enough data logic yet
    const averageTime = "2h 30m";

    return (
        <div className="grid gap-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tickets Abertos</CardTitle>
                        <TicketIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{openTickets}</div>
                        <p className="text-xs text-muted-foreground">Total de tickets aguardando</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{inProgressTickets}</div>
                        <p className="text-xs text-muted-foreground">Sendo resolvidos agora</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Resolvidos Hoje</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{closedToday}</div>
                        <p className="text-xs text-muted-foreground">Tickets fechados nas últimas 24h</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{averageTime}</div>
                        <p className="text-xs text-muted-foreground">Para resolução de tickets</p>
                    </CardContent>
                </Card>
            </div>

            <Container className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Lista de Tickets</h2>
                    {/* Botão de Novo Ticket movido para o Header */}
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
