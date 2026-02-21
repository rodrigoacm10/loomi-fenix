"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/global/container";
import { ClientDataTable } from "@/components/dashboard/client-data-table";
import { columns as clientColumns } from "@/components/dashboard/client-columns";
import { DashboardMap } from "@/components/dashboard/dashboard-map";
import { KpiTrendsChart } from "@/components/dashboard/kpi-trends-chart";
import { ConversionBarChart } from "@/components/dashboard/conversion-bar-chart";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
    const { fetchDashboardData, data, loading, error } = useDashboardStore();
    const t = useTranslations("Dashboard");

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    if (loading || !data) {
        return (
            <div className="space-y-[40px]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] h-[380px]">
                    <Skeleton className="lg:col-span-2 h-full rounded-[24px]" />
                    <Skeleton className="h-full rounded-[24px]" />
                </div>
                <Skeleton className="h-[450px] w-full rounded-[24px]" />
                <Container className="pb-4 space-y-[24px]">
                    <Skeleton className="h-[40px] w-[200px] rounded-md" />
                    <Skeleton className="h-[400px] w-full rounded-[24px]" />
                </Container>
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-500">{error}</div>;
    }

    console.log("[page] data", data);

    return (
        <div className="space-y-[40px]">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-[40px]">
                <Container className="xl:col-span-2 bg-[linear-gradient(to_top_right,#2f384f_0%,#171d30_30%,#171d30_70%,#2f384f_100%)]">
                    <KpiTrendsChart />
                </Container>

                <Container>
                    <ConversionBarChart />
                </Container>

            </div>

            <Container className="bg-[linear-gradient(5deg,#2f384f_0%,#171d30_30%,#171d30_70%,#2f384f_100%)] h-[450px]">
                <DashboardMap />
            </Container>


            <Container className="pb-4 min-w-0">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{t("activeClients")}</h2>
                </div>

                <ClientDataTable columns={clientColumns} data={data.activeClients.data} filters={data.activeClients.filters} />
            </Container>

        </div>
    );
}
