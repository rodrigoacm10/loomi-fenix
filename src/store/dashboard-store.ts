import { create } from 'zustand';
import { DashboardResponse, ActiveClient, MapLocation } from '@/types/dashboard';
import { dashboardService } from '@/services/dashboard';

interface DashboardStore {
    data: DashboardResponse | null;
    mapLocations: MapLocation[];
    loading: boolean;
    error: string | null;

    // Table Filters
    searchQuery: string;
    statusFilter: string;
    typeFilter: string;
    locationFilter: string;

    fetchDashboardData: () => Promise<void>;

    // Actions
    setSearchQuery: (query: string) => void;
    setStatusFilter: (status: string) => void;
    setTypeFilter: (type: string) => void;
    setLocationFilter: (location: string) => void;

    // Selectors
    getFilteredClients: () => ActiveClient[];
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
    data: null,
    mapLocations: [],
    loading: false,
    error: null,

    searchQuery: '',
    statusFilter: 'Todos',
    typeFilter: 'Todos',
    locationFilter: 'Todos',

    fetchDashboardData: async () => {
        set({ loading: true, error: null });
        console.log("[store] fetchDashboardData");
        try {
            const [data, mapData] = await Promise.all([
                dashboardService.getDashboardData(),
                dashboardService.getMapLocations()
            ]);
            console.log("[store] data", data);
            console.log("[store] mapData", mapData);
            set({
                data,
                mapLocations: mapData.data.locations,
                loading: false,
                // Optionally reset filters to default "Todos" when fetching new data
                statusFilter: 'Todos',
                typeFilter: 'Todos',
                locationFilter: 'Todos',
            });
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            set({ error: 'Failed to fetch dashboard data', loading: false });
        }
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setStatusFilter: (status) => set({ statusFilter: status }),
    setTypeFilter: (type) => set({ typeFilter: type }),
    setLocationFilter: (location) => set({ locationFilter: location }),

    getFilteredClients: () => {
        const state = get();
        if (!state.data?.activeClients?.data) return [];

        let filtered = state.data.activeClients.data;

        // Search
        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(client =>
                client.name.toLowerCase().includes(query) ||
                client.email.toLowerCase().includes(query)
            );
        }

        // Status
        if (state.statusFilter !== 'Todos') {
            filtered = filtered.filter(client => client.status === state.statusFilter);
        }

        // Type
        if (state.typeFilter !== 'Todos') {
            filtered = filtered.filter(client => client.secureType === state.typeFilter);
        }

        // Location
        if (state.locationFilter !== 'Todos') {
            filtered = filtered.filter(client => client.location === state.locationFilter);
        }

        return filtered;
    }
}));
