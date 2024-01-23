/**
 * This file defines the Login function, which is responsible for
 * validating user login credentials against a predefined schema.
 * It uses Zod for validation.
 */

'use server'

import { SchemaLogin } from '@/lib/schema'
import { z } from 'zod'

/**
 * Handles user login.
 * @param values {z.infer<typeof LoginSchema>} - User login credentials.
 * @returns A success or error message based on validation result.
 */

const ActionLogin = async (values: z.infer<typeof SchemaLogin>) => {
   console.log('Action Login')
   const validation = SchemaLogin.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   return { success: 'Login Authenticated !' }
}

export { ActionLogin }
