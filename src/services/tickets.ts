import api from '@/lib/api'
import {
  Ticket,
  CreateTicketDTO,
  UpdateTicketDTO,
  TicketsResponse,
} from '@/types/ticket'

export const ticketService = {
  getTickets: async (): Promise<TicketsResponse> => {
    const response = await api.get<TicketsResponse>('/tickets')
    return response.data
  },

  getTicketById: async (id: string): Promise<Ticket> => {
    const response = await api.get<Ticket>(`/tickets/${id}`)
    return response.data
  },

  createTicket: async (data: CreateTicketDTO): Promise<Ticket> => {
    const response = await api.post<Ticket>('/tickets', data)
    return response.data
  },

  updateTicket: async (id: string, data: UpdateTicketDTO): Promise<Ticket> => {
    const response = await api.patch<Ticket>(`/tickets/${id}`, data)
    return response.data
  },

  deleteTicket: async (id: string): Promise<void> => {
    await api.delete(`/tickets/${id}`)
  },
}
