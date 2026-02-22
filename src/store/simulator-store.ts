import { create } from 'zustand';
import { PlanIndicator } from '@/types/simulator';
import { simulatorService, MOCK_ADDONS } from '@/services/simulator';

interface SimulatorStore {
    plans: PlanIndicator[];
    includedBenefits: string[];
    loading: boolean;
    error: string | null;

    vehicleValue: number;
    clientAge: number;
    selectedAddons: string[];
    selectedPlan: string;

    fetchSimulatorData: () => Promise<void>;

    setVehicleValue: (value: number) => void;
    setClientAge: (age: number) => void;
    toggleAddon: (id: string) => void;
    setSelectedPlan: (plan: string) => void;
}

export const useSimulatorStore = create<SimulatorStore>((set, get) => ({
    plans: [],
    includedBenefits: [],
    loading: false,
    error: null,

    vehicleValue: 50000,
    clientAge: 28,
    selectedAddons: ['theft', 'collision', 'fire'],
    selectedPlan: 'Premium',

    fetchSimulatorData: async () => {
        set({ loading: true, error: null });
        try {
            const data = await simulatorService.getSimulatorData();
            set({
                plans: data.plansIndicators || [],
                includedBenefits: data.includedBenefits || [],
                loading: false
            });
        } catch (error) {
            console.error('Failed to fetch simulator data:', error);
            set({ error: 'Failed to fetch simulator data', loading: false });
        }
    },

    setVehicleValue: (value) => set({ vehicleValue: value }),
    setClientAge: (age) => set({ clientAge: age }),
    toggleAddon: (id) => set((state) => {
        const isSelected = state.selectedAddons.includes(id);
        return {
            selectedAddons: isSelected
                ? state.selectedAddons.filter((a) => a !== id)
                : [...state.selectedAddons, id]
        };
    }),
    setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));
