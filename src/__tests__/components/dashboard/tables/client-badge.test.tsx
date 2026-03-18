import { render, screen } from '@testing-library/react'
import { ClientBadge } from '@/components/dashboard/tables/client-badge'
import { clientColors } from '@/utils/client-colors'

describe('ClientBadge', () => {
  it('renders "Ativo" variant with correct text and background color', () => {
    render(<ClientBadge variant="Ativo" />)
    expect(screen.getByText('Ativo')).toBeInTheDocument()
    expect(screen.getByText('Ativo')).toHaveStyle(
      `background-color: ${clientColors.Ativo}`,
    )
  })

  it('renders "Pendente" variant with correct text and background color', () => {
    render(<ClientBadge variant="Pendente" />)
    expect(screen.getByText('Pendente')).toBeInTheDocument()
    expect(screen.getByText('Pendente')).toHaveStyle(
      `background-color: ${clientColors.Pendente}`,
    )
  })

  it('renders "Inativo" variant with white text color', () => {
    render(<ClientBadge variant="Inativo" />)
    expect(screen.getByText('Inativo')).toBeInTheDocument()
    expect(screen.getByText('Inativo')).toHaveStyle(
      `background-color: ${clientColors.Inativo}`,
    )
    expect(screen.getByText('Inativo')).toHaveStyle(`color: #ffffff`)
  })
})
