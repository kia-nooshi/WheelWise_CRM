import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'

const SchemaLead = z.object({
   firstName: z.string().min(2),
   lastName: z.string().min(2),
   email: z.string().optional(),
   phone: z.string().optional(),
   organizationId: z.string().optional(),
})

export async function POST(request: NextRequest) {
   const body = await request.json()
   const validation = SchemaLead.safeParse(body)

   if (!validation.success) {
      return NextResponse.json(validation.error.errors)
   }

   console.log('☑️ body : ', body)
   console.log('☑️ validation : ', validation)
   console.log('☑️ validation.success: ', validation.success)

   /*
   const newLead = await prisma.lead.create({
      data: {
         firstName: body.fistName,
         lastName: body.lastName,
         organization: '222222',
      },
   })
   */

   return NextResponse.json(body)
}
