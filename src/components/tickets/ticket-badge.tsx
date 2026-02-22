import { ticketColors } from "@/utils/ticket-colors"

export function TicketBadge({ variant }: {
    variant: "Urgente" |
    "Média" |
    "Baixa" |
    "Aberto" |
    "Em andamento" |
    "Fechado"
}) {
    const color = ticketColors[variant]

    return <div className="flex">
        <div className="px-3 py-1 text-xs rounded-full text-center" style={{ backgroundColor: color, color: variant === "Urgente" || variant === "Fechado" ? "white" : "black" }}>{variant}</div>
    </div>
}