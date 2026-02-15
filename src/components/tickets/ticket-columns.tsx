"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Ticket } from "@/types/ticket"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { format } from "date-fns"
import { useTicketStore } from '@/store/ticket-store'

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "ticketId",
        header: "ID",
    },
    {
        accessorKey: "priority",
        header: "Prioridade",
        cell: ({ row }) => {
            const priority = row.getValue("priority") as string
            let variant: "default" | "destructive" | "warning" | "success" | "secondary" = "default"

            switch (priority) {
                case "Urgente":
                    variant = "destructive"
                    break
                case "Média":
                    variant = "warning"
                    break
                case "Baixa":
                    variant = "success"
                    break
                default:
                    variant = "secondary"
            }

            return <Badge variant={variant}>{priority}</Badge>
        },
    },
    {
        accessorKey: "client",
        header: "Cliente",
    },
    {
        accessorKey: "subject",
        header: "Assunto",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string
            let variant: "default" | "destructive" | "warning" | "success" | "secondary" | "outline" = "outline"

            switch (status) {
                case "Aberto":
                    variant = "default" // or blue
                    break
                case "Em andamento":
                    variant = "secondary"
                    break
                case "Fechado":
                    variant = "outline"
                    break
            }
            return <Badge variant={variant}>{status}</Badge>
        },
    },
    {
        accessorKey: "responsible",
        header: "Responsável",
    },
    {
        accessorKey: "createdAt",
        header: "Criado em",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return format(date, "dd/MM/yyyy");
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const ticket = row.original
            const { openTicketModal, openDeleteModal } = useTicketStore()

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => openTicketModal(ticket)}
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => openDeleteModal(ticket)}
                            className="text-destructive focus:text-destructive"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
