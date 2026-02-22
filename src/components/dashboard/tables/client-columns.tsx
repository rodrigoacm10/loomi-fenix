'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ActiveClient } from '@/types/dashboard'
import { formatCurrency } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ClientBadge } from './client-badge'

const TranslatedHeader = ({ textKey }: { textKey: string }) => {
  const t = useTranslations('DataTable')
  return <>{t(textKey)}</>
}

export const columns: ColumnDef<ActiveClient>[] = [
  {
    accessorKey: 'name',
    header: () => <TranslatedHeader textKey="colName" />,
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      const email = row.original.email

      return (
        <div className="">
          <p className="font-bold">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </p>
          <p className="-mt-0.5">{email}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'secureType',
    header: () => <TranslatedHeader textKey="colType" />,
    cell: ({ row }) => {
      const type = row.getValue('secureType') as string
      return <div className="font-bold">{type}</div>
    },
  },
  {
    accessorKey: 'monthValue',
    header: () => <TranslatedHeader textKey="colValue" />,
    cell: ({ row }) => {
      const value = row.getValue('monthValue') as number
      return <div className="font-bold">{formatCurrency(value)}</div>
    },
  },
  {
    accessorKey: 'status',
    header: () => <TranslatedHeader textKey="colStatus" />,
    cell: ({ row }) => {
      const priority = row.getValue('status') as
        | 'Ativo'
        | 'Pendente'
        | 'Inativo'

      return <ClientBadge variant={priority} />
    },
  },
  {
    accessorKey: 'renewalDate',
    header: () => <TranslatedHeader textKey="colRenewal" />,
    cell: ({ row }) => {
      const dateStr = row.getValue('renewalDate') as string
      return <div className="font-bold">{dateStr}</div>
    },
  },
  {
    accessorKey: 'location',
    header: () => <TranslatedHeader textKey="colLocation" />,
    cell: ({ row }) => {
      const location = row.getValue('location') as string
      return <div className="font-bold">{location}</div>
    },
  },
]
