"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function KpiTrendsChart() {
    const { data } = useDashboardStore();
    const [activeMetric, setActiveMetric] = useState<'arpu' | 'conversion' | 'churn' | 'retention'>('arpu');

    const chartSeries = useMemo(() => {
        if (!data?.kpisTrend) return [];
        const trendData = data.kpisTrend[`${activeMetric}Trend` as keyof typeof data.kpisTrend];

        return [{
            name: activeMetric.toUpperCase(),
            data: (trendData as { data: number[] }).data
        }];
    }, [data, activeMetric]);

    const chartOptions: ApexCharts.ApexOptions = useMemo(() => {
        if (!data?.kpisTrend) return {} as ApexCharts.ApexOptions;
        return {
            chart: {
                type: 'area',
                toolbar: { show: false },
                background: 'transparent',
                fontFamily: 'inherit',
                animations: { enabled: false }
            },
            colors: ['#4dd4ce'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0,
                    opacityFrom: 1,
                    opacityTo: 0,
                    stops: [0, 100]
                }
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: {
                categories: data.kpisTrend.labels,
                labels: { style: { colors: '#6b7280' } },
                axisBorder: { show: false },
                axisTicks: { show: false },
                tooltip: { enabled: false }
            },
            yaxis: {
                labels: {
                    style: { colors: '#6b7280' },
                    formatter: (val: number) => {
                        if (activeMetric === 'arpu') return `R$ ${(val / 1000).toFixed(0)}k`;
                        return `${val}`;
                    }
                }
            },
            grid: {
                show: true,
                borderColor: '#2e344d',
                strokeDashArray: 3,
                xaxis: { lines: { show: false } }
            },
            theme: { mode: 'dark' as const },
            tooltip: {
                theme: 'dark'
            }
        };
    }, [data, activeMetric]);

    if (!data) return null;

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Evolução dos KPI&apos;s</h3>
                <div className="flex bg-[#23283b] rounded-full py-2 px-3 gap-3">
                    {['retention', 'conversion', 'churn', 'arpu'].map((metric) => (
                        <Button
                            key={metric}
                            className={cn(
                                "px-3 text-sm rounded-full cursor-pointer",
                                activeMetric === metric
                                    ? "bg-[#38b5cc] hover:bg-[#32a3b8] !shadow-[0px_0px_15px_0px_rgba(56,181,204,0.5)]"
                                    : "bg-[#383d4e] hover:bg-[#333847]"
                            )}
                            onClick={() => setActiveMetric(metric as 'arpu' | 'conversion' | 'churn' | 'retention')}
                        >
                            {metric}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="flex-1 min-h-[0px] -ml-4">
                {(typeof window !== 'undefined') && (
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="area"
                        height="100%"
                        width="100%"
                    />
                )}
            </div>
        </div>
    );
}