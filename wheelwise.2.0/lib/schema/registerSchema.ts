import * as z from 'zod'

/**
 * Schema for validating registration data.
 * It includes three fields: email, password, and name.
 * - email: Must be a valid email format. Custom error message if invalid.
 * - password: Must be at least 6 characters long.
 * - name: Must be a non-empty string.
 */
export const RegisterSchema = z.object({
   email: z.string().email({ message: 'Email is required!' }),
   password: z.string().min(6),
   name: z.string().min(1),
})
