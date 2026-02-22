'use client'

import { useDashboardStore } from '@/store/dashboard-store'
import { useEffect } from 'react'
import { SkeletonDashboard } from '@/components/dashboard/page/skeleton-dashboard'
import Container from '@/components/global/container'
import { ClientDataTable } from '@/components/dashboard/tables/client-data-table'
import { columns as clientColumns } from '@/components/dashboard/tables/client-columns'
import { DashboardMap } from '@/components/dashboard/graphs/dashboard-map'
import { KpiTrendsChart } from '@/components/dashboard/graphs/kpi-trends-chart'
import { ConversionBarChart } from '@/components/dashboard/graphs/conversion-bar-chart'
import { useTranslations } from 'next-intl'

export function DashboardPageContent() {
  const { fetchDashboardData, data, loading, error } = useDashboardStore()
  const t = useTranslations('Dashboard')

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  if (loading || !data) {
    return <SkeletonDashboard />
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <Container className="h-95 xl:col-span-2 bg-[linear-gradient(to_top_right,#2f384f_0%,#171d30_30%,#171d30_70%,#2f384f_100%)]">
          <KpiTrendsChart />
        </Container>

        <Container className="h-95">
          <ConversionBarChart />
        </Container>
      </div>

      <Container className="bg-[linear-gradient(5deg,#2f384f_0%,#171d30_30%,#171d30_70%,#2f384f_100%)] h-112.5">
        <DashboardMap />
      </Container>

      <Container className="pb-4 min-w-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t('activeClients')}</h2>
        </div>

        <ClientDataTable
          columns={clientColumns}
          data={data.activeClients.data}
          filters={data.activeClients.filters}
        />
      </Container>
    </div>
  )
}
