'use server'

import { LoginSchema } from '@/lib/schemas'
import { RegisterSchema } from '@/lib/schemas'
import { z } from 'zod'

export const Login = async (values: z.infer<typeof LoginSchema>) => {
   const validation = LoginSchema.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   return { success: 'Login Authenticated !' }
}

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
   const validation = RegisterSchema.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   return { success: 'Login Authenticated !' }
}
