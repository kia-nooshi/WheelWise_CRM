'use server'

import { RegisterSchema } from '@/import/schemas'
import { z } from 'zod'

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
   const validation = RegisterSchema.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   return { success: 'Login Authenticated !' }
}
