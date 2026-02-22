import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useTicketStore } from '@/store/ticket-store';
import { getNextTicketId } from "@/utils/get-next-ticket-id";
import { SuccessToast } from "@/components/global/success-toast";
import { ErrorToast } from "@/components/global/error-toast";
import { ticketSchema, TicketValues } from "@/schemas/ticket-schema";

export function useTicketForm() {
    const { selectedTicket, createTicket, updateTicket, closeTicketModal, tickets, isViewMode } = useTicketStore();
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
    };

    const form = useForm<TicketValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: formattedDefaultValues,
        values: formattedDefaultValues,
    });

    const onSubmit = async (data: TicketValues) => {
        try {
            if (selectedTicket) {
                await updateTicket(selectedTicket.id, data);
                toast.custom((toastProps) => (
                    <SuccessToast
                        t={toastProps}
                        title={t("successUpdateMessage")}
                        description={t("successUpdateDescription")}
                    />
                ));
            } else {
                const newTicketData = {
                    ...data,
                    ticketId: getNextTicketId(tickets)
                };

                await createTicket(newTicketData);
                toast.custom((toastProps) => (
                    <SuccessToast
                        t={toastProps}
                        title={t("successCreateMessage")}
                        description={t("successCreateDescription")}
                    />
                ));
            }
            closeTicketModal();
        } catch (error) {
            console.error(error);
            toast.custom((toastProps) => (
                <ErrorToast t={toastProps} title={t("errorSaveMessage")} description="" />
            ));
        }
    };

    return {
        form,
        onSubmit,
        isViewMode,
        closeTicketModal,
        t,
    };
}
