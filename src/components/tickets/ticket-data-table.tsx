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
    CommandGroup,
    CommandInput,
    CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
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

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    })

    const [globalFilter, setGlobalFilter] = useState("")

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

    const uniqueResponsibles = useMemo(() => {
        return Array.from(new Set(data.map(item => (item as any).responsible as string)))
    }, [data])

    const currentResponsibleFilter = (table.getColumn("responsible")?.getFilterValue() as string) ?? ""

    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;

    return (
        <div>
            <div className="flex items-center pt-2 pb-4 gap-2">
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
                            <TableRow className="border-[#ffffff]/10" key={headerGroup.id}>
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
                                    className="border-[#ffffff]/10"
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

            <div className="flex items-center justify-end py-4">
                <Button
                    variant="ghost"
                    className="hidden h-8 w-8 p-0 mr-8 lg:flex hover:text-white hover:bg-[#1876D2]"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 mr-4 hover:text-white hover:bg-[#1876D2]"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    {currentPage} de {totalPages}
                </div>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 ml-4 hover:text-white hover:bg-[#1876D2]"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className="hidden h-8 w-8 p-0 ml-8 lg:flex hover:text-white hover:bg-[#1876D2]"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div >
    )
}
