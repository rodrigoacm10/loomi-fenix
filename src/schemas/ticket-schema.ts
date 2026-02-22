import z from 'zod'

export const ticketSchema = z.object({
  subject: z.string().min(1, 'Assunto é obrigatório'),
  client: z.string().min(1, 'Cliente é obrigatório'),
  email: z.string().email('Email inválido'),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  priority: z.enum(['Urgente', 'Média', 'Baixa']),
  status: z.enum(['Aberto', 'Em andamento', 'Fechado']),
})

export type TicketValues = z.infer<typeof ticketSchema>
