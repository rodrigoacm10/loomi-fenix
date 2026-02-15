"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTicketStore } from '@/store/ticket-store'
import { useEffect } from "react"
import { toast } from "sonner"

const ticketSchema = z.object({
    subject: z.string().min(1, "Assunto é obrigatório"),
    client: z.string().min(1, "Cliente é obrigatório"),
    email: z.string().email("Email inválido"),
    responsible: z.string().min(1, "Responsável é obrigatório"),
    priority: z.enum(["Urgente", "Média", "Baixa"]),
    status: z.enum(["Aberto", "Em andamento", "Fechado"]),
})

type TicketValues = z.infer<typeof ticketSchema>

export function TicketForm() {
    const { selectedTicket, createTicket, updateTicket, closeTicketModal } = useTicketStore()

    const form = useForm<TicketValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            subject: "",
            client: "",
            email: "",
            responsible: "",
            priority: "Baixa",
            status: "Aberto",
        },
    })

    // Reset form when selectedTicket changes
    useEffect(() => {
        if (selectedTicket) {
            form.reset({
                subject: selectedTicket.subject,
                client: selectedTicket.client,
                email: selectedTicket.email,
                responsible: selectedTicket.responsible,
                priority: selectedTicket.priority,
                status: selectedTicket.status,
            })
        } else {
            form.reset({
                subject: "",
                client: "",
                email: "",
                responsible: "",
                priority: "Baixa",
                status: "Aberto",
            })
        }
    }, [selectedTicket, form])

    const onSubmit = async (data: TicketValues) => {
        try {
            if (selectedTicket) {
                await updateTicket(selectedTicket.id, data)
                toast.success("Ticket atualizado com sucesso!")
            } else {
                await createTicket(data)
                toast.success("Ticket criado com sucesso!")
            }
            closeTicketModal()
        } catch (error) {
            toast.error("Erro ao salvar ticket")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assunto</FormLabel>
                            <FormControl>
                                <Input placeholder="Resumo do problema" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="client"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cliente</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome do cliente" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@exemplo.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prioridade</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a prioridade" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Baixa">Baixa</SelectItem>
                                        <SelectItem value="Média">Média</SelectItem>
                                        <SelectItem value="Urgente">Urgente</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Aberto">Aberto</SelectItem>
                                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                                        <SelectItem value="Fechado">Fechado</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="responsible"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Responsável</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome do responsável" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => closeTicketModal()}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        {selectedTicket ? "Salvar Alterações" : "Criar Ticket"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
