import z from "zod";

export const userSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
});

export type UserValues = z.infer<typeof userSchema>;