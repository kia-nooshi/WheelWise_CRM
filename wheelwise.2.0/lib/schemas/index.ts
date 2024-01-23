import * as z from 'zod'

export const LoginSchema = z.object({
   email: z.string().email({ message: 'Email is required!' }),
   password: z.string().min(1, { message: 'Password is reqierd!' }),
})

export const RegisterSchema = z.object({
   email: z.string().email({ message: 'Email is required!' }),
   password: z.string().min(6),
   name: z.string().min(1),
})
