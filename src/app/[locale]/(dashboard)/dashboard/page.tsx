import { Metadata } from 'next'
import { DashboardPageContent } from '@/components/dashboard/dashboard-page-content'

export const metadata: Metadata = {
  title: 'Dashboard | Nortus',
  description: 'Overview of your business KPIs and active clients.',
}

export default function DashboardPage() {
  return <DashboardPageContent />
}
