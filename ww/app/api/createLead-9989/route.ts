/**
 * TODO CLEAN LATER
 * ! Prisma function must be sprate later
 * ! revalidate data is not ok
 * ! Zod schema mustbe sprate later
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

const S = z.object({
   // ! here
   organization: z.string().min(5),
   firstName: z.string().min(2),
   lastName: z.string().min(2),
   email: z.string().optional(),
   phone: z.string().optional(),
})

export async function POST(request: NextRequest) {
   try {
      const body = await request.json()
      const { organization, firstName, lastName, phone, email } = body
      const validation = S.safeParse(body)

      if (!validation.success)
         return NextResponse.json(validation.error.errors, { status: 400 })

      const lead = await prisma.lead.create({
         // ! here
         data: {
            firstName,
            lastName,
            phone, // Make sure to match the case and spelling with your schema definitions
            email,
            Organization: {
               connect: { id: organization },
            },
         },
      })

      revalidatePath('/dashboard') //! not good practice, happen for all user at same time

      return NextResponse.json(lead)
   } catch (error) {
      return NextResponse.json('there is an error in the server', {
         status: 400,
      })
   }
}
