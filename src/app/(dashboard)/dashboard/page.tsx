"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import Container from "@/components/global/container";
import { ClientDataTable } from "@/components/dashboard/client-data-table";
import { columns as clientColumns } from "@/components/dashboard/client-columns";
import { DashboardMap } from "@/components/dashboard/dashboard-map";
import { KpiTrendsChart } from "@/components/dashboard/kpi-trends-chart";
import { ConversionBarChart } from "@/components/dashboard/conversion-bar-chart";

export default function DashboardPage() {
    const { fetchDashboardData, data, loading, error } = useDashboardStore();

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    if (loading || !data) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-500">{error}</div>;
    }

    console.log("[page] data", data);

    return (
        <div className="space-y-[40px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] h-[380px]">
                <Container className="lg:col-span-2 bg-[#171d30] text-white">
                    <KpiTrendsChart />
                </Container>

                <Container className="bg-[#171d30] text-white ">
                    <ConversionBarChart />
                </Container>

            </div>

            <Container className="bg-[#171d30] text-white overflow-hidden h-[450px]">
                <DashboardMap />
            </Container>

            <div className="h-[400px] overflow-hidden">
                <ClientDataTable columns={clientColumns} data={data.activeClients.data} filters={data.activeClients.filters} />
            </div>

        </div>
    );
}
