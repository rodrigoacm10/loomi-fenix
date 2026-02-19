import { Ticket } from "@/types/ticket"

export const getNextTicketId = (tickets: Ticket[]) => {
    if (!tickets || tickets.length === 0) return "TK001"

    const maxId = tickets.reduce((max, ticket) => {
        const match = ticket.ticketId.match(/^TK(\d+)$/)
        if (match) {
            const num = parseInt(match[1], 10)
            return num > max ? num : max
        }
        return max
    }, 0)

    const nextId = maxId + 1
    return `TK${nextId.toString().padStart(3, '0')}`
}