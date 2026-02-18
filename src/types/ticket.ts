export type TicketPriority = 'Urgente' | 'Média' | 'Baixa';
export type TicketStatus = 'Aberto' | 'Em andamento' | 'Fechado';

export interface Ticket {
    id: string;
    ticketId: string;
    priority: TicketPriority;
    client: string;
    email: string;
    subject: string;
    status: TicketStatus;
    responsible: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTicketDTO {
    ticketId: string;
    priority: TicketPriority;
    client: string;
    email: string;
    subject: string;
    status: TicketStatus;
    responsible: string;
}

export interface UpdateTicketDTO extends Partial<CreateTicketDTO> { }

export interface TicketsResponse {
    data: Ticket[];
    total: number;
    listed?: number;
}
