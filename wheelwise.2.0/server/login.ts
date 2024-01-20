'use server'

import { LoginSchema } from '@/import/schemas'

import { z } from 'zod'

export const Login = async (values: z.infer<typeof LoginSchema>) => {
   const validation = LoginSchema.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   return { success: 'Login Authenticated !' }
}
