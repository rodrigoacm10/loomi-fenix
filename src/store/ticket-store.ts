import { create } from 'zustand';
import { Ticket, CreateTicketDTO, UpdateTicketDTO } from '@/types/ticket';
import { ticketService } from '@/services/tickets';

interface TicketState {
    tickets: Ticket[];
    loading: boolean;
    error: string | null;
    selectedTicket: Ticket | null;
    isTicketModalOpen: boolean;

    isViewMode: boolean; // Add view mode state

    // Delete Modal State
    ticketToDelete: Ticket | null;
    isDeleteModalOpen: boolean;

    fetchTickets: () => Promise<void>;
    createTicket: (data: CreateTicketDTO) => Promise<void>;
    updateTicket: (id: string, data: UpdateTicketDTO) => Promise<void>;
    deleteTicket: (id: string) => Promise<void>;

    setSelectedTicket: (ticket: Ticket | null) => void;
    openTicketModal: (ticket?: Ticket, viewMode?: boolean) => void; // Update signature
    closeTicketModal: () => void;

    openDeleteModal: (ticket: Ticket) => void;
    closeDeleteModal: () => void;
}

export const useTicketStore = create<TicketState>((set, get) => ({
    tickets: [],
    loading: false,
    error: null,
    selectedTicket: null,
    isTicketModalOpen: false,
    isViewMode: false, // Initialize view mode
    ticketToDelete: null,
    isDeleteModalOpen: false,

    fetchTickets: async () => {
        set({ loading: true, error: null });
        try {
            const response = await ticketService.getTickets();
            // The API returns { data, total, listed }
            set({ tickets: response.data || [], loading: false });
        } catch (error) {
            console.error('Failed to fetch tickets:', error);
            set({ error: 'Failed to fetch tickets', loading: false });
        }
    },

    createTicket: async (data: CreateTicketDTO) => {
        set({ loading: true, error: null });
        try {
            const newTicket = await ticketService.createTicket(data);
            set((state) => ({
                tickets: [newTicket, ...state.tickets],
                loading: false,
                isTicketModalOpen: false,
            }));
        } catch (error) {
            console.error('Failed to create ticket:', error);
            set({ error: 'Failed to create ticket', loading: false });
            throw error;
        }
    },

    updateTicket: async (id: string, data: UpdateTicketDTO) => {
        set({ loading: true, error: null });
        try {
            const updatedTicket = await ticketService.updateTicket(id, data);
            set((state) => ({
                tickets: state.tickets.map((t) => (t.id === id ? updatedTicket : t)),
                loading: false,
                selectedTicket: null,
                isTicketModalOpen: false,
            }));
        } catch (error) {
            console.error('Failed to update ticket:', error);
            set({ error: 'Failed to update ticket', loading: false });
            throw error;
        }
    },

    deleteTicket: async (id: string) => {
        set({ loading: true, error: null });
        try {
            await ticketService.deleteTicket(id);
            set((state) => ({
                tickets: state.tickets.filter((t) => t.id !== id),
                loading: false,
                isDeleteModalOpen: false,
                ticketToDelete: null
            }));
        } catch (error) {
            console.error('Failed to delete ticket:', error);
            set({ error: 'Failed to delete ticket', loading: false });
            throw error;
        }
    },

    setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
    openTicketModal: (ticket, viewMode = false) => set({ isTicketModalOpen: true, selectedTicket: ticket || null, isViewMode: viewMode }),
    closeTicketModal: () => set({ isTicketModalOpen: false, selectedTicket: null, isViewMode: false }),

    openDeleteModal: (ticket) => set({ isDeleteModalOpen: true, ticketToDelete: ticket }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false, ticketToDelete: null }),
}));
