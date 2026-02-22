"use client"

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
import { useTicketForm } from "@/hooks/use-ticket-form"

export function TicketForm() {
    const { form, onSubmit, isViewMode, closeTicketModal, t } = useTicketForm();

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
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Input
                                        className="px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10"
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
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Input
                                        className="px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10"
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
                                <div className="px-5 py-4 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 border text-white">
                                    <p className="text-sm">{field.value}</p>
                                </div>
                            ) : (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 focus:ring-4 focus:ring-loomi-bg-card/20 focus:border-loomi-bg-card">
                                            <SelectValue placeholder={t("priorityPlaceholder")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-[20px] bg-loomi-bg-card border-0 text-white">
                                        <SelectItem className="rounded-[20px] !text-white !bg-loomi-bg-card hover:!text-white hover:!bg-loomi-primary-hover" value="Baixa">Baixa</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-loomi-bg-card hover:!text-white hover:!bg-loomi-primary-hover" value="Média">Média</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-loomi-bg-card hover:!text-white hover:!bg-loomi-primary-hover" value="Urgente">Urgente</SelectItem>
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
                                <div className="px-5 py-4 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 border text-white">
                                    <p className="text-sm">{field.value}</p>
                                </div>
                            ) : (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 focus:ring-4 focus:ring-loomi-bg-card/20 focus:border-loomi-bg-card">
                                            <SelectValue placeholder={t("statusPlaceholder")} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="rounded-[20px] bg-loomi-bg-card border-0 text-white">
                                        <SelectItem className="rounded-[20px] !text-white !bg-loomi-bg-card hover:!text-white hover:!bg-loomi-primary-hover" value="Aberto">Aberto</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-loomi-bg-card hover:!text-white hover:!bg-loomi-primary-hover" value="Em andamento">Em andamento</SelectItem>
                                        <SelectItem className="rounded-[20px] !text-white !bg-loomi-bg-card hover:!text-white hover:!bg-loomi-primary-hover" value="Fechado">Fechado</SelectItem>
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
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Input
                                        className="px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10"
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
                                    <div className="px-5 py-4 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 border text-white">
                                        <p className="text-sm">{field.value}</p>
                                    </div>
                                ) : (
                                    <Textarea className="px-5 py-6 mt-1 rounded-[20px] bg-loomi-bg-card border-white/10 min-h-[120px]" placeholder={t("subjectPlaceholder")} {...field} />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="ghost"
                        className="ring-1 ring-inset w-[100px] p-6 rounded-[14px] hover:bg-black hover:ring-white hover:text-white"
                        onClick={() => closeTicketModal()}
                    >
                        {isViewMode ? t("close") : t("cancel")}
                    </Button>

                    {!isViewMode && (
                        <Button className="bg-loomi-primary hover:bg-loomi-primary-hover w-[100px] p-6 rounded-[14px]" type="submit">
                            {t("save")}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    )
}
