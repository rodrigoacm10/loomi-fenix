export interface TrendItem {
    name: string;
    data: number[];
}

export interface KpisTrend {
    labels: string[];
    arpuTrend: TrendItem;
    conversionTrend: TrendItem;
    churnTrend: TrendItem;
    retentionTrend: TrendItem;
}

export interface KpiResumeItem {
    valor: number;
    variacao: number;
}

export interface KpisResume {
    arpu: KpiResumeItem;
    conversion: KpiResumeItem;
    retention: KpiResumeItem;
    churn: KpiResumeItem;
}

export interface Segment {
    nome: string;
    valor: number;
}

export interface ActiveClient {
    id: string;
    name: string;
    email: string;
    secureType: string;
    monthValue: number;
    status: string;
    renewalDate: string;
    location: string;
}

export interface ClientFilters {
    status: string[];
    secureType: string[];
    locations: string[];
}

export interface ActiveClientsData {
    filters: ClientFilters;
    data: ActiveClient[];
}

export interface DashboardResponse {
    kpisTrend: KpisTrend;
    kpisResume: KpisResume;
    segments: Segment[];
    activeClients: ActiveClientsData;
}

export interface MapLocation {
    id: string;
    name: string;
    description: string;
    coordinates: [number, number];
    category: string;
    address: string;
    icon: string;
    color: string;
}

export interface MapLocationsResponse {
    data: {
        locations: MapLocation[];
    };
}
