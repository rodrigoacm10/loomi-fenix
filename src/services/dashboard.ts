import api from '@/lib/api';
import { DashboardResponse, MapLocationsResponse } from '@/types/dashboard';

export const dashboardService = {
    getDashboardData: async (): Promise<DashboardResponse> => {
        const response = await api.get<DashboardResponse>('/nortus-v1/dashboard');
        return response.data;
    },
    getMapLocations: async (): Promise<MapLocationsResponse> => {
        const response = await api.get<MapLocationsResponse>('/map/locations');
        return response.data;
    }
};
