/**
 * This file defines the Login function, which is responsible for
 * validating user login credentials against a predefined schema.
 * It uses Zod for validation.
 */

'use server'

import { LoginSchema } from '@/lib/schemas'
import { z } from 'zod'

/**
 * Handles user login.
 * @param values {z.infer<typeof LoginSchema>} - User login credentials.
 * @returns A success or error message based on validation result.
 */

const Login = async (values: z.infer<typeof LoginSchema>) => {
   const validation = LoginSchema.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   return { success: 'Login Authenticated !' }
}

export default Login
