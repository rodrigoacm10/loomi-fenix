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
                        placeholder="Buscar por nome ou email..."
                        value={globalFilter ?? ""}
                        onChange={(event) =>
                            setGlobalFilter(event.target.value)
                        }
                        className="w-full pl-10 rounded-full h-9 border-0 bg-[#0b1125] text-white placeholder:text-white"
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
                    <SelectTrigger className="w-[250px] px-5 bg-[#0b1125] border-0 rounded-full h-9 text-white">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1125] text-white border-0">
                        {filters.status.map(s => (
                            <SelectItem key={s} value={s} className="focus:bg-[#1876D2] focus:text-white">{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={(table.getColumn("secureType")?.getFilterValue() as string) ?? "Todos"}
                    onValueChange={(value) =>
                        table.getColumn("secureType")?.setFilterValue(value === "Todos" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[320px] px-5 bg-[#0b1125] border-0 rounded-full h-9 text-white truncate">
                        <SelectValue placeholder="Tipo de Seguro" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1125] text-white border-0">
                        {filters.secureType.map(t => (
                            <SelectItem key={t} value={t} className="focus:bg-[#1876D2] focus:text-white">{t}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={(table.getColumn("location")?.getFilterValue() as string) ?? "Todos"}
                    onValueChange={(value) =>
                        table.getColumn("location")?.setFilterValue(value === "Todos" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[250px] px-5 bg-[#0b1125] border-0 rounded-full h-9 text-white">
                        <SelectValue placeholder="Local" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1125] text-white border-0">
                        {filters.locations.map(l => (
                            <SelectItem key={l} value={l} className="focus:bg-[#1876D2] focus:text-white">{l}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md bg-[#0b1125] overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-b-[#2e344d] hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-muted-foreground whitespace-nowrap whitespace-nowrap">
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
                                    className="border-b-[#2e344d] hover:bg-[#171d30]/50 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center text-white">
                                    Nenhum cliente encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
