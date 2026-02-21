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
import { Ticket } from "@/types/ticket"
import { useTranslations } from "next-intl"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function TicketDataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const t = useTranslations("TicketsPage");
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
        return Array.from(new Set(data.map(item => (item as Ticket).responsible)))
    }, [data])

    const currentResponsibleFilter = (table.getColumn("responsible")?.getFilterValue() as string) ?? ""

    const totalPages = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex + 1;

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
                    value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[250px] px-5 bg-loomi-bg-dark border-0 rounded-full h-9">
                        <SelectValue placeholder={t("statusPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-loomi-bg-dark text-white border-0">
                        <SelectItem value="all" className="focus:bg-loomi-primary focus:text-white">{t("allStatus")}</SelectItem>
                        <SelectItem value="Aberto" className="focus:bg-loomi-primary focus:text-white">{t("open")}</SelectItem>
                        <SelectItem value="Em andamento" className="focus:bg-loomi-primary focus:text-white">{t("inProgress")}</SelectItem>
                        <SelectItem value="Fechado" className="focus:bg-loomi-primary focus:text-white">{t("closed")}</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                    value={(table.getColumn("priority")?.getFilterValue() as string) ?? "all"}
                    onValueChange={(value) =>
                        table.getColumn("priority")?.setFilterValue(value === "all" ? undefined : value)
                    }
                >
                    <SelectTrigger className="w-[320px] px-5 bg-loomi-bg-dark border-0 rounded-full h-9">
                        <SelectValue placeholder={t("priorityPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-loomi-bg-dark text-white border-0">
                        <SelectItem value="all" className="focus:bg-loomi-primary focus:text-white">{t("allPriorities")}</SelectItem>
                        <SelectItem value="Urgente" className="focus:bg-loomi-primary focus:text-white">{t("urgent")}</SelectItem>
                        <SelectItem value="Média" className="focus:bg-loomi-primary focus:text-white">{t("medium")}</SelectItem>
                        <SelectItem value="Baixa" className="focus:bg-loomi-primary focus:text-white">{t("low")}</SelectItem>
                    </SelectContent>
                </Select>

                <Popover open={isResponsibleOpen} onOpenChange={setIsResponsibleOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={isResponsibleOpen}
                            className="w-[320px] px-5 bg-loomi-bg-dark hover:bg-loomi-bg-dark hover:text-white border-0 rounded-full justify-between h-9"
                        >
                            {currentResponsibleFilter
                                ? uniqueResponsibles.find((responsible) => responsible === currentResponsibleFilter)
                                : t("allResponsibles")}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 border-0 bg-loomi-bg-dark">
                        <Command shouldFilter={false} className="bg-loomi-bg-dark border-0 text-white">
                            <CommandInput
                                placeholder={t("searchResponsible")}
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
                                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-white hover:!bg-loomi-primary hover:text-white"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            !currentResponsibleFilter ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {t("allResponsibles")}
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
                                                        className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-white hover:!bg-loomi-primary hover:text-white"
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
                                        {t("typeToSearch")}
                                    </div>
                                )}
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>

            <div className="rounded-[20px] bg-loomi-table px-6 pb-6">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow className="border-white/10 hover:bg-transparent text-sm !py-2" key={headerGroup.id}>
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
                                        <TableCell className="!px-0 py-4" key={cell.id}>
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
                                    {t("noResults")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end pt-3">
                <Button
                    variant="ghost"
                    className="hidden h-8 w-8 p-0 mr-8 lg:flex hover:text-white hover:bg-loomi-primary"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 mr-4 hover:text-white hover:bg-loomi-primary"
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
                    className="h-8 w-8 p-0 ml-4 hover:text-white hover:bg-loomi-primary"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    className="hidden h-8 w-8 p-0 ml-8 lg:flex hover:text-white hover:bg-loomi-primary"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div >
    )
}
