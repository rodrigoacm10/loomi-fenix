"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function TicketDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    // Simple pagination state
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    })

    // Global Filter State (for searching by ID, Client, Subject)
    const [globalFilter, setGlobalFilter] = React.useState("")

    // Responsible Combobox State
    const [isResponsibleOpen, setIsResponsibleOpen] = React.useState(false)
    const [responsibleSearch, setResponsibleSearch] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        globalFilterFn: (row, columnId, filterValue) => {
            const search = filterValue.toLowerCase();
            const client = (row.getValue('client') as string)?.toLowerCase() || '';
            const subject = (row.getValue('subject') as string)?.toLowerCase() || '';
            const ticketId = (row.getValue('ticketId') as string)?.toLowerCase() || '';
            return client.includes(search) || subject.includes(search) || ticketId.includes(search);
        },
        state: {
            columnFilters,
            pagination,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    })

    // Get unique responsibles
    const uniqueResponsibles = React.useMemo(() => {
        return Array.from(new Set(data.map(item => (item as any).responsible as string)))
    }, [data])

    const currentResponsibleFilter = (table.getColumn("responsible")?.getFilterValue() as string) ?? ""

    return (
        <div>
            <div className="flex items-center py-4 gap-4">
                {/* Search Input */}
                <Input
                    placeholder="Buscar por ID, cliente ou assunto..."
                    value={globalFilter ?? ""}
                    onChange={(event) =>
                        setGlobalFilter(event.target.value)
                    }
                    className="max-w-sm"
                />

                {/* Status Filter */}
                <Select
                    value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todos os Status</SelectItem>
                        <SelectItem value="Aberto">Aberto</SelectItem>
                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                        <SelectItem value="Fechado">Fechado</SelectItem>
                    </SelectContent>
                </Select>

                {/* Priority Filter */}
                <Select
                    value={(table.getColumn("priority")?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) =>
                        table.getColumn("priority")?.setFilterValue(value === "all" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Todas as Prioridades</SelectItem>
                        <SelectItem value="Urgente">Urgente</SelectItem>
                        <SelectItem value="Média">Média</SelectItem>
                        <SelectItem value="Baixa">Baixa</SelectItem>
                    </SelectContent>
                </Select>

                {/* Responsible Combobox */}
                <Popover open={isResponsibleOpen} onOpenChange={setIsResponsibleOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={isResponsibleOpen}
                            className="w-[200px] justify-between"
                        >
                            {currentResponsibleFilter
                                ? uniqueResponsibles.find((responsible) => responsible === currentResponsibleFilter)
                                : "Todos os Responsáveis"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command shouldFilter={false}>
                            <CommandInput
                                placeholder="Buscar responsável..."
                                value={responsibleSearch}
                                onValueChange={setResponsibleSearch}
                            />
                            <CommandList>
                                {responsibleSearch.length > 0 && (
                                    <>
                                        <CommandEmpty>Nenhum responsável encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem
                                                value="all"
                                                onSelect={() => {
                                                    table.getColumn("responsible")?.setFilterValue(undefined)
                                                    setIsResponsibleOpen(false)
                                                    setResponsibleSearch("")
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        !currentResponsibleFilter ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                Todos os Responsáveis
                                            </CommandItem>
                                            {uniqueResponsibles
                                                .filter(responsible => responsible.toLowerCase().includes(responsibleSearch.toLowerCase()))
                                                .map((responsible) => (
                                                    <CommandItem
                                                        key={responsible}
                                                        value={responsible}
                                                        onSelect={(currentValue) => {
                                                            table.getColumn("responsible")?.setFilterValue(
                                                                currentValue === currentResponsibleFilter ? undefined : currentValue
                                                            )
                                                            setIsResponsibleOpen(false)
                                                            setResponsibleSearch("") // Clear search on select if desired, or keep it
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                currentResponsibleFilter === responsible ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {responsible}
                                                    </CommandItem>
                                                ))}
                                        </CommandGroup>
                                    </>
                                )}
                                {/* Show "Search to find responsible" placeholder if empty */}
                                {responsibleSearch.length === 0 && (
                                    <div className="py-6 text-center text-sm text-muted-foreground">
                                        Digite para buscar...
                                    </div>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próximo
                </Button>
            </div>
        </div>
    )
}
