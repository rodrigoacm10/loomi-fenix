export interface PlanIndicator {
    name: string;
    conversion: number;
    roi: number;
    value: number;
}

export interface SimulatorResponse {
    includedBenefits: string[];
    plansIndicators: PlanIndicator[];
}

export interface SimulatorState {
    vehicleValue: number;
    clientAge: number;
    selectedAddons: string[];
}

export interface CoverageAddon {
    id: string;
    label: string;
    price: number;
}
