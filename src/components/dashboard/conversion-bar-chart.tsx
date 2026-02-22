"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import { createCustomTooltip } from "@/lib/chart-tooltip";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function ConversionBarChart() {
    const { data } = useDashboardStore();
    const t = useTranslations("ConversionChart");

    const chartSeries = useMemo(() => {
        if (!data?.kpisTrend) return [];
        const { conversionTrend } = data.kpisTrend;
        return [{
            name: t("conversion"),
            data: conversionTrend.data.slice(0, 6)
        }];
    }, [data, t]);

    const chartOptions: ApexCharts.ApexOptions = useMemo(() => {
        if (!data?.kpisTrend) return {} as ApexCharts.ApexOptions;
        return {
            chart: {
                type: 'bar',
                toolbar: { show: false },
                background: 'transparent',
                fontFamily: 'inherit'
            },
            colors: ['#4dd4ce'],
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 0,
                    opacityFrom: 1,
                    opacityTo: 0.5,
                    stops: [0, 100]
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    columnWidth: '50%',
                }
            },
            dataLabels: { enabled: false },
            xaxis: {
                categories: data.kpisTrend.labels.slice(0, 6),
                labels: { style: { colors: '#ffffff', fontSize: '14px' } },
                axisBorder: { show: false },
                axisTicks: { show: false },
                tooltip: { enabled: false },
                offsetY: 5
            },
            yaxis: {
                labels: {
                    style: { colors: '#ffffff', fontSize: '14px' },
                },
            },
            theme: { mode: 'dark' as const },
            tooltip: {
                theme: 'dark',
                custom: function (opts: any) {
                    return createCustomTooltip({ ...opts, activeMetric: 'conversion' });
                }
            },
            grid: {
                show: true,
                borderColor: '#2e344d',
                strokeDashArray: 3,
                xaxis: { lines: { show: false } },
                padding: {
                    left: 30,
                    bottom: 0
                }
            }
        };
    }, [data]);

    if (!data) return null;

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{t("conversionRate")}</h3>
                <ArrowRightIcon className="h-6 w-6" />
            </div>
            <div className="flex-1 -ml-4">
                {(typeof window !== 'undefined') && (
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        height="100%"
                        width="100%"
                    />
                )}
            </div>
        </div>
    );
}

function ArrowRightIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
