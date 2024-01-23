'use server'

import { SchemaRegister } from '@/lib/schema'
import { prisma } from '@/lib/server/'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getUserByEmail } from '@/lib/util'

const Register = async (values: z.infer<typeof SchemaRegister>) => {
   const validation = SchemaRegister.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   const { email, password, name } = validation.data
   const hashedpass = await bcrypt.hash(password, 10)

   const existingUser = await getUserByEmail(email)

   if (existingUser) {
      console.log('hellyessa')
   }

   // TODO : export tost notification
   // TODO : seend email verification later

   return { success: 'Login Authenticated !' }
}

export default Register
