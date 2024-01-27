import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'

export async function POST(request: NextRequest) {
   const body = await request.json()

   /*
   const org = await prisma.organization.create({
      data: {
         users: {
            create: {
               externalId: body.id,
               name: body.name,
            },
         },
      },
   })
   */

   const org = await prisma.user.create({
      data: {
         externalId: body.id,
         organization: {
            create: {},
         },
      },
      select: {
         organization: true,
      },
   })

   const lead = await prisma.lead.create({
      data: {
         Organization: {
            connect: { id: org.organization.id },
         },
      },
   })

   console.log(org)

   /*
   const newLead = await prisma.lead.create({
      data: {
         firstName: body.fistName,
         lastName: body.lastName,
         organization: '222222',
      },
   })
   */

   return NextResponse.json(org)
}
