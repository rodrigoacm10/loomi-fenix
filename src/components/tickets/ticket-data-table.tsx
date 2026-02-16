"use client"

import { useState, useMemo } from "react"
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
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function TicketDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    // Simple pagination state
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })

    // Global Filter State (for searching by ID, Client, Subject)
    const [globalFilter, setGlobalFilter] = useState("")

    // Responsible Combobox State
    const [isResponsibleOpen, setIsResponsibleOpen] = useState(false)
    const [responsibleSearch, setResponsibleSearch] = useState("")

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
    const uniqueResponsibles = useMemo(() => {
        return Array.from(new Set(data.map(item => (item as any).responsible as string)))
    }, [data])

    const currentResponsibleFilter = (table.getColumn("responsible")?.getFilterValue() as string) ?? ""

    console.log("ROWS -><>", table.getRowModel().rows)

    return (
        <div>
            <div className="flex items-center pt-2 pb-4 gap-2">
                {/* Search Input */}
                <div className="relative w-full">
                    <Input
                        placeholder="Buscar por ID, cliente ou assunto..."
                        value={globalFilter ?? ""}
                        onChange={(event) =>
                            setGlobalFilter(event.target.value)
                        }
                        className="w-full pl-10 rounded-full border-0 bg-[#0b1125] text-white placeholder:text-white"
                    />
                    <div className="absolute left-3 top-0 h-full flex items-center pr-3">
                        <Search className="h-5 w-5 text-white" />
                    </div>
                </div>


                <Select
                    value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[250px] px-5 bg-[#0b1125] border-0 rounded-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1125] text-white border-0">
                        <SelectItem value="all" className="focus:bg-[#1876D2] focus:text-white">Todos os Status</SelectItem>
                        <SelectItem value="Aberto" className="focus:bg-[#1876D2] focus:text-white">Aberto</SelectItem>
                        <SelectItem value="Em andamento" className="focus:bg-[#1876D2] focus:text-white">Em andamento</SelectItem>
                        <SelectItem value="Fechado" className="focus:bg-[#1876D2] focus:text-white">Fechado</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={(table.getColumn("priority")?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) =>
                        table.getColumn("priority")?.setFilterValue(value === "all" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[320px] px-5 bg-[#0b1125] border-0 rounded-full">
                        <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0b1125] text-white border-0">
                        <SelectItem value="all" className="focus:bg-[#1876D2] focus:text-white">Todas as Prioridades</SelectItem>
                        <SelectItem value="Urgente" className="focus:bg-[#1876D2] focus:text-white">Urgente</SelectItem>
                        <SelectItem value="Média" className="focus:bg-[#1876D2] focus:text-white">Média</SelectItem>
                        <SelectItem value="Baixa" className="focus:bg-[#1876D2] focus:text-white">Baixa</SelectItem>
                    </SelectContent>
                </Select>

                <Popover open={isResponsibleOpen} onOpenChange={setIsResponsibleOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={isResponsibleOpen}
                            className="w-[320px] px-5 bg-[#0b1125] hover:bg-[#0b1125] hover:text-white border-0 rounded-full justify-between"
                        >
                            {currentResponsibleFilter
                                ? uniqueResponsibles.find((responsible) => responsible === currentResponsibleFilter)
                                : "Todos os Responsáveis"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 border-0 bg-[#0b1125]">
                        <Command shouldFilter={false} className="bg-[#0b1125] border-0 text-white">
                            <CommandInput
                                placeholder="Buscar responsável..."
                                className="text-white placeholder:text-gray-400"
                                value={responsibleSearch}
                                onValueChange={setResponsibleSearch}
                            />
                            <CommandList className="border-0">
                                <div
                                    onClick={() => {
                                        table.getColumn("responsible")?.setFilterValue(undefined)
                                        setIsResponsibleOpen(false)
                                        setResponsibleSearch("")
                                    }}
                                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-white hover:!bg-[#1876D2] hover:text-white"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            !currentResponsibleFilter ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    Todos os Responsáveis
                                </div>
                                {responsibleSearch.length > 0 && (
                                    <>
                                        <CommandGroup>

                                            {uniqueResponsibles
                                                .filter(responsible => responsible.toLowerCase().includes(responsibleSearch.toLowerCase()))
                                                .map((responsible) => (
                                                    <div
                                                        key={responsible}
                                                        onClick={() => {
                                                            table.getColumn("responsible")?.setFilterValue(
                                                                responsible === currentResponsibleFilter ? undefined : responsible
                                                            )
                                                            setIsResponsibleOpen(false)
                                                            setResponsibleSearch("")
                                                        }}
                                                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-white hover:!bg-[#1876D2] hover:text-white"
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                currentResponsibleFilter === responsible ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {responsible}
                                                    </div>
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

            <div className="rounded-[20px] bg-[#23283a] p-6 pt-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="!px-0" key={header.id}>
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
                                        <TableCell className="!px-0" key={cell.id}>
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
        </div >
    )
}
