"use client"

import { useState } from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    filters: {
        status: string[],
        secureType: string[],
        locations: string[]
    }
}

export function ClientDataTable<TData, TValue>({
    columns,
    data,
    filters
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const t = useTranslations("DataTable")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        globalFilterFn: (row, columnId, filterValue) => {
            const search = filterValue.toLowerCase();
            const name = (row.getValue('name') as string)?.toLowerCase() || '';
            const email = (row.original as { email?: string }).email?.toLowerCase() || '';
            return name.includes(search) || email.includes(search);
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <div>
            <div className="flex items-center pt-2 pb-4 gap-2">
                <div className="relative w-full">
                    <Input
                        placeholder={t("searchPlaceholder")}
                        value={globalFilter ?? ""}
                        onChange={(event) =>
                            setGlobalFilter(event.target.value)
                        }
                        className="w-full pl-10 rounded-full h-9 border-0 bg-loomi-bg-dark text-white placeholder:text-white"
                    />
                    <div className="absolute left-3 top-0 h-full flex items-center pr-3">
                        <Search className="h-5 w-5 text-white" />
                    </div>
                </div>

                <Select
                    value={(table.getColumn("status")?.getFilterValue() as string) ?? "Todos"}
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value === "Todos" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[250px] px-5 bg-loomi-bg-dark border-0 rounded-full h-9 text-white">
                        <SelectValue placeholder={t("statusPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-loomi-bg-dark text-white border-0">
                        <SelectItem value="Todos" className="focus:bg-loomi-primary focus:text-white">{t("all")}</SelectItem>
                        {filters.status.filter(s => s !== "Todos" && s !== "all").map(s => (
                            <SelectItem key={s} value={s} className="focus:bg-loomi-primary focus:text-white">{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={(table.getColumn("secureType")?.getFilterValue() as string) ?? "Todos"}
                    onValueChange={(value) =>
                        table.getColumn("secureType")?.setFilterValue(value === "Todos" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[320px] px-5 bg-loomi-bg-dark border-0 rounded-full h-9 text-white truncate">
                        <SelectValue placeholder={t("secureTypePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-loomi-bg-dark text-white border-0">
                        <SelectItem value="Todos" className="focus:bg-loomi-primary focus:text-white">{t("all")}</SelectItem>
                        {filters.secureType.filter(t => t !== "Todos" && t !== "all").map(t => (
                            <SelectItem key={t} value={t} className="focus:bg-loomi-primary focus:text-white">{t}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={(table.getColumn("location")?.getFilterValue() as string) ?? "Todos"}
                    onValueChange={(value) =>
                        table.getColumn("location")?.setFilterValue(value === "Todos" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[250px] px-5 bg-loomi-bg-dark border-0 rounded-full h-9 text-white">
                        <SelectValue placeholder={t("locationPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-loomi-bg-dark text-white border-0">
                        <SelectItem value="Todos" className="focus:bg-loomi-primary focus:text-white">{t("all")}</SelectItem>
                        {filters.locations.filter(l => l !== "Todos" && l !== "all").map(l => (
                            <SelectItem key={l} value={l} className="focus:bg-loomi-primary focus:text-white">{l}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-[20px] bg-loomi-table px-6 pb-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-white/10 hover:bg-transparent text-sm" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="px-0 py-4 text-loomi-muted" key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-white/10 hover:bg-loomi-bg-card-hover text-sm"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className="px-0 py-4" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center text-white">
                                    {t("emptyState")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
