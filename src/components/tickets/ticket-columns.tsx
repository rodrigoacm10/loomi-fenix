'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Ticket } from '@/types/ticket'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { format } from 'date-fns'
import { useTicketStore } from '@/store/ticket-store'
import { TicketBadge } from './ticket-badge'
import { useTranslations } from 'next-intl'

const TranslatedHeader = ({ textKey }: { textKey: string }) => {
  const t = useTranslations('TicketsPage')
  return <>{t(textKey)}</>
}

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'ticketId',
    header: () => <TranslatedHeader textKey="colId" />,
    cell: ({ row }) => {
      const ticketId = row.getValue('ticketId') as string

      return <div className="font-bold">{ticketId}</div>
    },
  },
  {
    accessorKey: 'priority',
    header: () => <TranslatedHeader textKey="colPriority" />,
    cell: ({ row }) => {
      const priority = row.getValue('priority') as 'Urgente' | 'Média' | 'Baixa'

      return <TicketBadge variant={priority} />
    },
  },
  {
    accessorKey: 'client',
    header: () => <TranslatedHeader textKey="colClient" />,
    cell: ({ row }) => {
      const client = row.getValue('client') as string
      const email = row.original.email

      return (
        <div className="">
          <p className="font-bold">
            {client.charAt(0).toUpperCase() + client.slice(1)}
          </p>
          <p className="-mt-0.5">{email}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'subject',
    header: () => <TranslatedHeader textKey="colSubject" />,
    cell: ({ row }) => {
      const subject = row.getValue('subject') as string

      return <div className="font-bold">{subject}</div>
    },
  },
  {
    accessorKey: 'status',
    header: () => <TranslatedHeader textKey="colStatus" />,
    cell: ({ row }) => {
      const status = row.getValue('status') as
        | 'Aberto'
        | 'Em andamento'
        | 'Fechado'

      return <TicketBadge variant={status} />
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <TranslatedHeader textKey="colCreatedAt" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return <div className="font-bold">{format(date, 'dd/MM/yyyy')}</div>
    },
  },
  {
    accessorKey: 'responsible',
    header: () => <TranslatedHeader textKey="colResponsible" />,
    cell: ({ row }) => {
      const responsible = row.getValue('responsible') as string

      return <div className="font-bold">{responsible}</div>
    },
  },
  {
    id: 'actions',
    header: () => <TranslatedHeader textKey="colActions" />,
    cell: function CellComponent({ row }) {
      const ticket = row.original
      const { openTicketModal } = useTicketStore()
      const t = useTranslations('TicketsPage')

      return (
        <div className="flex items-center gap-5">
          <Button
            onClick={() => openTicketModal(ticket, false)}
            variant="ghost"
            className="p-0 hover:cursor-pointer hover:bg-transparent font-normal hover:text-white"
          >
            {t('edit')}{' '}
            <Image
              src="/icons/ticket/edit.svg"
              alt="Edit"
              width={16}
              height={16}
            />
          </Button>
          <Button
            onClick={() => openTicketModal(ticket, true)}
            variant="ghost"
            className="p-0 hover:cursor-pointer hover:bg-transparent font-normal hover:text-white"
          >
            {t('view')}{' '}
            <Image
              src="/icons/ticket/see.svg"
              alt="View"
              width={16}
              height={16}
            />
          </Button>
        </div>
      )
    },
  },
]
