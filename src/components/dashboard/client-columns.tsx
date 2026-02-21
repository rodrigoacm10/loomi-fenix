"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ActiveClient } from "@/types/dashboard"
import { formatCurrency } from "@/lib/utils"
import { useTranslations } from "next-intl"

const TranslatedHeader = ({ textKey }: { textKey: string }) => {
    const t = useTranslations("DataTable")
    return <>{t(textKey)}</>
}

export const columns: ColumnDef<ActiveClient>[] = [
    {
        accessorKey: "name",
        header: () => <TranslatedHeader textKey="colName" />,
        cell: ({ row }) => {
            const name = row.getValue("name") as string
            const email = row.original.email

            return (
                <div className="">
                    <p className="font-bold">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
                    <p className="-mt-0.5">{email}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "secureType",
        header: () => <TranslatedHeader textKey="colType" />,
        cell: ({ row }) => {
            const type = row.getValue("secureType") as string
            return <div className="font-bold">{type}</div>
        }
    },
    {
        accessorKey: "monthValue",
        header: () => <TranslatedHeader textKey="colValue" />,
        cell: ({ row }) => {
            const value = row.getValue("monthValue") as number
            return <div className="font-bold">{formatCurrency(value)}</div>
        }
    },
    {
        accessorKey: "status",
        header: () => <TranslatedHeader textKey="colStatus" />,
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            let bgColor = "bg-gray-500/10";
            let textColor = "text-gray-500";
            let dotColor = "bg-gray-500";

            if (status === "Ativo") {
                bgColor = "bg-green-500/10"; textColor = "text-green-500"; dotColor = "bg-green-500";
            } else if (status === "Pendente") {
                bgColor = "bg-yellow-500/10"; textColor = "text-yellow-500"; dotColor = "bg-yellow-500";
            } else if (status === "Inativo") {
                bgColor = "bg-red-500/10"; textColor = "text-red-500"; dotColor = "bg-red-500";
            }

            return (
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                    {status}
                </div>
            )
        }
    },
    {
        accessorKey: "renewalDate",
        header: () => <TranslatedHeader textKey="colRenewal" />,
        cell: ({ row }) => {
            const dateStr = row.getValue("renewalDate") as string
            return <div className="font-bold">{dateStr}</div>
        }
    },
    {
        accessorKey: "location",
        header: () => <TranslatedHeader textKey="colLocation" />,
        cell: ({ row }) => {
            const location = row.getValue("location") as string
            return <div className="font-bold">{location}</div>
        }
    },
]
