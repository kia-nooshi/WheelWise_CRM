import * as z from 'zod'

/**
 * Schema for validating login data.
 * It includes two fields: email and password.
 * - email: Must be a valid email format. Custom error message if invalid.
 * - password: Must be a non-empty string. Custom error message if empty.
 */
export const LoginSchema = z.object({
   email: z.string().email({ message: 'Email is required!' }),
   password: z.string().min(1, { message: 'Password is reqierd!' }),
})
