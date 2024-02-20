import { z } from 'zod'

export const SchemaLeadCreate = z.object({
   organizationId: z.string().min(1),
   firstName: z.string().min(1),
   lastName: z.string().min(1),
   phone: z
      .string()
      .min(1)
      .regex(/^\d+$/)
      .transform((phone) => phone.replace(/[^\d]/g, '')),
   email: z.string().email().optional(),
})

export type TypeLeadCreate = z.infer<typeof SchemaLeadCreate>
