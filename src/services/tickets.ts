import api from '@/lib/api';
import { Ticket, CreateTicketDTO, UpdateTicketDTO, TicketsResponse } from '@/types/ticket';

export const ticketService = {
    getTickets: async (): Promise<TicketsResponse> => {
        const response = await api.get<TicketsResponse>('/tickets');
        return response.data;
    },

    getTicketById: async (id: string): Promise<Ticket> => {
        const response = await api.get<Ticket>(`/tickets/${id}`);
        return response.data;
    },

    createTicket: async (data: CreateTicketDTO): Promise<Ticket> => {
        console.log('[createTicket] data ->', data)
        const response = await api.post<Ticket>('/tickets', data);
        console.log('[createTicket] response ->', response)
        return response.data;
    },

    updateTicket: async (id: string, data: UpdateTicketDTO): Promise<Ticket> => {
        console.log('[updateTicket] data ->', data)
        const response = await api.patch<Ticket>(`/tickets/${id}`, data);
        console.log('[updateTicket] response ->', response)
        return response.data;
    },

    deleteTicket: async (id: string): Promise<void> => {
        await api.delete(`/tickets/${id}`);
    },
};
