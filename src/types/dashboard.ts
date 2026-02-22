export interface KpisTrend {
    labels: string[];
    arpuTrend: { name: string; data: number[] };
    conversionTrend: { name: string; data: number[] };
    churnTrend: { name: string; data: number[] };
    retentionTrend: { name: string; data: number[] };
}

export interface KpisResume {
    arpu: { valor: number; variacao: number };
    conversion: { valor: number; variacao: number };
    retention: { valor: number; variacao: number };
    churn: { valor: number; variacao: number };
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

export interface ActiveClientsData {
    filters: {
        status: string[];
        secureType: string[];
        locations: string[];
    };
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
