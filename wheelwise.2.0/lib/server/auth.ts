'use server'

import { RegisterSchema } from '@/lib/schemas'
import prisma from '@/lib/server/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getUserByEmail } from '../utils/auth/user'

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
   const validation = RegisterSchema.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   const { email, password, name } = validation.data
   const hashedpass = await bcrypt.hash(password, 10)

   const existinguser = await getUserByEmail(email)

   if (existinguser) {
      return { error: 'email exist' }
   }

   await prisma.user.create({
      data: {
         name,
         email,
         password: hashedpass,
      },
   })

   // TODO : export tost notification
   // TODO : seend email verification later

   return { success: 'Login Authenticated !' }
}
