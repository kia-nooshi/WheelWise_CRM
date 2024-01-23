'use server'

import { SchemaRegister } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getUserByEmail } from '@/lib/util'
import { prisma } from '@/lib/server'

/**
 * Handles user registration.
 * This function is responsible for registering a new user by validating the user's
 * registration credentials against a predefined schema using Zod, hashing the password,
 * checking for an existing user with the same email, and finally creating a new user record.
 *
 * @param values {z.infer<typeof SchemaRegister>} - User registration credentials.
 * @returns An object containing either a success message or an error message.
 *
 * The function performs the following steps:
 * 1. Validates the input values against the SchemaRegister using Zod.
 *    - If validation fails, returns an error message: 'Invalid Fields!'.
 * 2. Extracts the email, password, and name from the validated data.
 * 3. Hashes the password using bcryptjs.
 * 4. Checks if a user with the provided email already exists using getUserByEmail.
 *    - If a user exists, logs 'Email In Use' and returns an error message: 'Email In Use'.
 * 5. Creates a new user record in the database using Prisma, with the hashed password.
 * 6. Logs 'user created' and returns a success message: 'Login Authenticated !'.
 *
 */

// TODO : export tost notification
// TODO : seend email verification later

const ActionRegister = async (values: z.infer<typeof SchemaRegister>) => {
   console.log('Action Register')

   const validation = SchemaRegister.safeParse(values)

   if (!validation.success) {
      return { error: 'Invalid Fields!' }
   }

   const { email, password, name } = validation.data
   const hashedpass = await bcrypt.hash(password, 10)

   const existingUser = await getUserByEmail(email)

   if (existingUser) {
      console.log('Email In Use')
      return { error: 'Email In Use' }
   }

   await prisma.user.create({
      data: {
         name,
         email,
         password: hashedpass,
      },
   })

   console.log('user created')
   return { success: 'Login Authenticated !' }
}

export { ActionRegister }
