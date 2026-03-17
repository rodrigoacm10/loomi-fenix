import { columns } from '@/components/dashboard/tables/client-columns'
import { ClientDataTable } from '@/components/dashboard/tables/client-data-table'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

const mockData = [
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
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@mail.com',
    status: 'Inativo',
    secureType: 'Auto',
    monthValue: 800,
    renewalDate: '2024-03-01',
    location: 'RJ',
  },
]

const mockFilters = {
  status: ['Ativo', 'Inativo', 'Pendente'],
  secureType: ['Vida', 'Auto'],
  locations: ['SP', 'RJ'],
}

describe('ClientDataTable', () => {
  it('renders the table correctly, all the clients', () => {
    render(
      <ClientDataTable
        columns={columns}
        data={mockData}
        filters={mockFilters}
      />,
    )

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
    expect(screen.getByText('Ativo')).toBeInTheDocument()
    expect(screen.getByText('Inativo')).toBeInTheDocument()
    expect(screen.getByText('Vida')).toBeInTheDocument()
    expect(screen.getByText('Auto')).toBeInTheDocument()
    expect(screen.getByText('SP')).toBeInTheDocument()
    expect(screen.getByText('RJ')).toBeInTheDocument()
  })

  it('filter by input name', () => {
    render(
      <ClientDataTable
        columns={columns}
        data={mockData}
        filters={mockFilters}
      />,
    )
    const searchInput = screen.getByPlaceholderText('searchPlaceholder')

    fireEvent.change(searchInput, { target: { value: 'João' } })

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument()
  })

  it('filter by status', async () => {
    const user = userEvent.setup()

    render(
      <ClientDataTable
        columns={columns}
        data={mockData}
        filters={mockFilters}
      />,
    )

    const statusTrigger = screen.getByRole('combobox', {
      name: 'statusPlaceholder',
    })
    await user.click(statusTrigger)

    const ativoOption = screen.getByRole('option', { name: 'Inativo' })
    await user.click(ativoOption)

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })

  it('filter by secureType', async () => {
    const user = userEvent.setup()

    render(
      <ClientDataTable
        columns={columns}
        data={mockData}
        filters={mockFilters}
      />,
    )

    const secureTypeTrigger = screen.getByRole('combobox', {
      name: 'secureTypePlaceholder',
    })
    await user.click(secureTypeTrigger)

    const autoOption = screen.getByRole('option', { name: 'Auto' })
    await user.click(autoOption)

    expect(screen.queryByText('João Silva')).not.toBeInTheDocument()
    expect(screen.getByText('Maria Santos')).toBeInTheDocument()
  })

  it('filter by location', async () => {
    const user = userEvent.setup()

    render(
      <ClientDataTable
        columns={columns}
        data={mockData}
        filters={mockFilters}
      />,
    )

    const locationTrigger = screen.getByRole('combobox', {
      name: 'locationPlaceholder',
    })
    await user.click(locationTrigger)

    const spOption = screen.getByRole('option', { name: 'SP' })
    await user.click(spOption)

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.queryByText('Maria Santos')).not.toBeInTheDocument()
  })

  it('render empty table when data is empty', () => {
    render(
      <ClientDataTable columns={columns} data={[]} filters={mockFilters} />,
    )
    expect(screen.getByText('emptyState')).toBeInTheDocument()
  })
})
