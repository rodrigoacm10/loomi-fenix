import { Metadata } from 'next'
import { TicketsPageContent } from '@/components/tickets/tickets-page-content'

export const metadata: Metadata = {
  title: 'Tickets | Nortus',
  description: 'Manage and track customer support tickets.',
}

export default function TicketsPage() {
  return <TicketsPageContent />
}
