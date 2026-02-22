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
