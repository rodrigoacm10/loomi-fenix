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
import { Textarea } from "@/components/ui/textarea"
import { useTicketStore } from '@/store/ticket-store'
import { toast } from "sonner"
import { getNextTicketId } from "@/utils/get-next-ticket-id"
import { SuccessToast } from "@/components/global/success-toast"
import { useTranslations } from "next-intl"

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
    const { selectedTicket, createTicket, updateTicket, closeTicketModal, tickets, isViewMode } = useTicketStore()
    const t = useTranslations("TicketForm");

    const formattedDefaultValues: TicketValues = selectedTicket ? {
        subject: selectedTicket.subject || "",
        client: selectedTicket.client || "",
        email: selectedTicket.email || "",
        responsible: selectedTicket.responsible || "",
        priority: (selectedTicket.priority as "Urgente" | "Média" | "Baixa") || "Baixa",
        status: (selectedTicket.status as "Aberto" | "Em andamento" | "Fechado") || "Aberto",
    } : {
        subject: "",
        client: "",
        email: "",
        responsible: "",
        priority: "Baixa",
        status: "Aberto",
    }

    const form = useForm<TicketValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: formattedDefaultValues,
        values: formattedDefaultValues,
    })

    const onSubmit = async (data: TicketValues) => {
        try {
            if (selectedTicket) {
                await updateTicket(selectedTicket.id, data)
                toast.custom((t) => (
                    <SuccessToast
                        t={t}
                        title="Ticket atualizado com sucesso!"
                        description="O ticket foi atualizado e já está na sua lista."
                    />
                ))
            } else {
                const newTicketData = {
                    ...data,
                    ticketId: getNextTicketId(tickets)
                }

                await createTicket(newTicketData)
                toast.custom((t) => (
                    <SuccessToast
                        t={t}
                        title="Ticket criado com sucesso!"
                        description="O ticket foi criado e já está na sua lista."
                    />
                ))
            }
            closeTicketModal()
        } catch (error) {
            console.error(error)
            toast.error("Erro ao salvar ticket")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="pl-4 font-semibold">{t("clientName")}</FormLabel>
                            <FormControl>
                                {isViewMode ? (
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Input
                                        className="px-5 py-6 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10"
                                        placeholder={t("clientPlaceholder")} {...field} />
                                )}
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
                            <FormLabel className="pl-4 font-semibold">{t("email")}</FormLabel>
                            <FormControl>
                                {isViewMode ? (
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Input
                                        className="px-5 py-6 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10"
                                        placeholder={t("emailPlaceholder")} {...field} />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="pl-4 font-semibold">{t("priority")}</FormLabel>
                            {isViewMode ? (
                                <div className="px-5 py-4 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 border text-white">
                                    <p className="text-sm">{field.value}</p>
                                </div>
                            ) : (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full px-5 py-6 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 focus:ring-4 focus:ring-[#171d30]/20 focus:border-[#171d30]">
                                            <SelectValue placeholder={t("priorityPlaceholder")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-[20px] bg-[#171d30] border-0 text-white">
                                        <SelectItem className="rounded-[20px] !text-white !bg-[#171d30] hover:!text-white hover:!bg-[#156abd]" value="Baixa">Baixa</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-[#171d30] hover:!text-white hover:!bg-[#156abd]" value="Média">Média</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-[#171d30] hover:!text-white hover:!bg-[#156abd]" value="Urgente">Urgente</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="pl-4 font-semibold">{t("status")}</FormLabel>
                            {isViewMode ? (
                                <div className="px-5 py-4 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 border text-white">
                                    <p className="text-sm">{field.value}</p>
                                </div>
                            ) : (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full px-5 py-6 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 focus:ring-4 focus:ring-[#171d30]/20 focus:border-[#171d30]">
                                            <SelectValue placeholder={t("statusPlaceholder")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-[20px] bg-[#171d30] border-0 text-white">
                                        <SelectItem className="rounded-[20px] !text-white !bg-[#171d30] hover:!text-white hover:!bg-[#156abd]" value="Aberto">Aberto</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-[#171d30] hover:!text-white hover:!bg-[#156abd]" value="Em andamento">Em andamento</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-[#171d30] hover:!text-white hover:!bg-[#156abd]" value="Fechado">Fechado</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="responsible"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="pl-4 font-semibold">{t("responsible")}</FormLabel>
                            <FormControl>
                                {isViewMode ? (
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Input
                                        className="px-5 py-6 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10"
                                        placeholder={t("responsiblePlaceholder")} {...field} />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="pl-4 font-semibold">{t("subject")}</FormLabel>
                            <FormControl>
                                {isViewMode ? (
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Textarea className="px-5 py-6 mt-1 rounded-[20px] bg-[#171d30] border-[#ffffff]/10 min-h-[120px]" placeholder={t("subjectPlaceholder")} {...field} />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="ghost"
                        className="ring-1 ring-inset w-[100px] p-6 rounded-[14px] hover:bg-[#070b19] hover:ring-[#ffffff] hover:text-white"
                        onClick={() => closeTicketModal()}
                    >
                        {isViewMode ? t("close") : t("cancel")}
                    </Button>

                    {!isViewMode && (
                        <Button className="bg-[#1876D2] hover:bg-[#156abd] w-[100px] p-6 rounded-[14px]" type="submit" onClick={() => console.log('ENVIAR ')}>
                            {t("save")}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}
