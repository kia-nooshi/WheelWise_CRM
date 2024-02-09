import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

const SchemaLead = z.object({
   firstName: z.string().min(2),
   lastName: z.string().min(2),
   email: z.string().optional(),
   phone: z.string().optional(),
   organization: z.string().optional(),
})

export async function POST(request: NextRequest) {
   console.log('👌👌👌 ssssssssssssssssssssssssssssssssssssssss')

   const body = await request.json()
   const validation = SchemaLead.safeParse(body)

   if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 })

   const createdLead = await prisma.lead.create({
      data: {
         firstName: body.firstName,
         lastName: body.lastName,
         phone: body.phone,
         email: body.email,
         Organization: {
            connect: {
               id: body.organization,
            },
         },
      },
   })

   revalidatePath('/dash/lead')

   return NextResponse.json(createdLead)
}
