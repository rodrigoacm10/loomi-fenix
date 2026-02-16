"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Ticket } from "@/types/ticket"
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
import { TicketBadge } from "./ticket-badge"

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "ticketId",
        header: "ID",
        cell: ({ row }) => {
            const ticketId = row.getValue('ticketId') as string

            return <div className="font-bold">{ticketId}</div>
        }
    },
    {
        accessorKey: "priority",
        header: "Prioridade",
        cell: ({ row }) => {
            const priority = row.getValue("priority") as "Urgente" | "Média" | "Baixa"


            return <TicketBadge variant={priority} />
        },
    },
    {
        accessorKey: "client",
        header: "Cliente",
        cell: ({ row }) => {
            const client = row.getValue("client") as string
            const email = row.original.email

            return <div className="flex flex-col">
                <p className="font-bold">{client.charAt(0).toUpperCase() + client.slice(1)}</p>
                <p>{email}</p>
            </div>
        }
    },
    {
        accessorKey: "subject",
        header: "Assunto",
        cell: ({ row }) => {
            const subject = row.getValue('subject') as string

            return <div className="font-bold">{subject}</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as "Aberto" | "Em andamento" | "Fechado"

            return <TicketBadge variant={status} />
        },
    },
    {
        accessorKey: "createdAt",
        header: "Criado em",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt"));
            return <div className="font-bold">{format(date, "dd/MM/yyyy")}</div>;
        }
    },
    {
        accessorKey: "responsible",
        header: "Responsável",
        cell: ({ row }) => {
            const responsible = row.getValue('responsible') as string

            return <div className="font-bold">{responsible}</div>
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
