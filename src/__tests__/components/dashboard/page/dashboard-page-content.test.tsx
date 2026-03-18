import { DashboardPageContent } from '@/components/dashboard/page/dashboard-page-content'
import { render, screen } from '@testing-library/react'

// um teste de integração para o dashboard page content

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

const mockFetchDashboardData = jest.fn()
jest.mock('@/store/dashboard-store', () => ({
  useDashboardStore: jest.fn(),
}))

import { useDashboardStore } from '@/store/dashboard-store'
const mockUseDashboardStore = useDashboardStore as jest.MockedFunction<
  typeof useDashboardStore
>

jest.mock('@/components/dashboard/page/skeleton-dashboard', () => ({
  SkeletonDashboard: () => <div data-testid="skeleton-dashboard" />,
}))
jest.mock('@/components/dashboard/graphs/dashboard-map', () => ({
  DashboardMap: () => <div data-testid="dashboard-map" />,
}))
jest.mock('@/components/dashboard/graphs/kpi-trends-chart', () => ({
  KpiTrendsChart: () => <div data-testid="kpi-chart" />,
}))
jest.mock('@/components/dashboard/graphs/conversion-bar-chart', () => ({
  ConversionBarChart: () => <div data-testid="conversion-chart" />,
}))
jest.mock('@/components/dashboard/tables/client-data-table', () => ({
  ClientDataTable: () => <div data-testid="client-data-table" />,
}))

const mockData = {
  activeClients: {
    data: [
      {
        id: '1',
        name: 'João Silva',
        email: 'joao@mail.com',
        status: 'Ativo',
        secureType: 'Vida',
        monthValue: 1200,
        renewalDate: '2024-01-01',
        location: 'SP',
      },
    ],
    filters: { status: ['Ativo'], secureType: ['Vida'], locations: ['SP'] },
  },
}

describe('DashboardPageContent', () => {
  beforeEach(() => {
    mockFetchDashboardData.mockClear()
  })

  it('shows skeleton while loading', () => {
    mockUseDashboardStore.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      fetchDashboardData: mockFetchDashboardData,
    })

    render(<DashboardPageContent />)
    expect(screen.getByTestId('skeleton-dashboard')).toBeInTheDocument()
  })

  it('shows error when there is an error', () => {
    mockUseDashboardStore.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching dashboard data',
      fetchDashboardData: mockFetchDashboardData,
    })

    render(<DashboardPageContent />)
    expect(
      screen.getByText('Error fetching dashboard data'),
    ).toBeInTheDocument()
  })

  it('renders the dashboard page content correctly', () => {
    mockUseDashboardStore.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      fetchDashboardData: mockFetchDashboardData,
    })

    render(<DashboardPageContent />)

    expect(screen.getByTestId('kpi-chart')).toBeInTheDocument()
    expect(screen.getByTestId('conversion-chart')).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-map')).toBeInTheDocument()
    expect(screen.getByTestId('client-data-table')).toBeInTheDocument()
  })

  it('calls fetchDashboardData on mount', () => {
    mockUseDashboardStore.mockReturnValue({
      fetchDashboardData: mockFetchDashboardData,
      data: null,
      loading: true,
      error: null,
    })
    render(<DashboardPageContent />)
    expect(mockFetchDashboardData).toHaveBeenCalledTimes(1)
  })
})
