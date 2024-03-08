import prisma from '@/prisma/client'
import z from 'zod'

// -------------------------------
// -------------------------------
// SCHEMA - TYPE
// -------------------------------
// -------------------------------

export const SchemaAddLead = z.object({
   organizationId: z.string().min(1),
   firstName: z.string().min(1),
   lastName: z.string().min(1),
   phone: z
      .string()
      .min(1)
      .regex(/^\d+$/)
      .transform((phone) => phone.replace(/[^\d]/g, '')),
   email: z
      .string()
      .optional()
      .transform((val) => (val === '' ? null : val)),
})

type SearchField = 'id' | 'phone' | 'email' | 'firstName' | 'lastName'

interface GetByPropInput {
   organizationId: string
   field: SearchField
   value: string
}

// -------------------------------
// -------------------------------
// START HERE
// -------------------------------
// -------------------------------

async function getAll({ organizationId }: { organizationId: string }) {
   try {
      const data = await prisma.lead.findMany({
         where: { organizationId },
      })

      if (data.length === 0) throw new Error('No leads found')

      return {
         data,
         success: true,
         message: '🆗 getAll → Leads successfully retrieved',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ getAll → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

async function get({ organizationId, field, value }: GetByPropInput) {
   try {
      const data = await prisma.lead.findFirst({
         where: {
            organizationId,
            [field]: value,
         },
      })

      if (!data) throw new Error(`No lead with → ${field}: ${value}`)

      return {
         data,
         success: true,
         message: `🆗 getByProp → Lead exists with → ${field}: ${value}`,
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ getByProp → ${e instanceof Error ? e.message : 'Unknown'}`,
      }
   }
}

async function push(Input: z.infer<typeof SchemaAddLead>) {
   try {
      // zod validation
      const Data = SchemaAddLead.safeParse(Input)
      if (!Data.success) throw new Error('zod validation')
      const { firstName, lastName, phone, email, organizationId } = Data.data

      // create the data structure
      const newData: {
         firstName: string
         lastName: string
         phone?: string
         email?: string
         Organization: { connect: { id: string } }
         conversation: { create: {} }
      } = {
         firstName,
         lastName,
         Organization: { connect: { id: organizationId } },
         conversation: { create: {} },
      }

      // Check if email is unique
      if (email) {
         const emailExists = await get({
            organizationId,
            field: 'email',
            value: email,
         })

         if (emailExists.success) throw new Error(emailExists.message)
         newData.email = email
      }

      // Check if phone is unique
      if (phone) {
         const phoneExists = await get({
            organizationId,
            field: 'phone',
            value: phone,
         })

         if (phoneExists.success) throw new Error(phoneExists.message)
         newData.phone = phone
      }

      const data = await prisma.lead.create({
         data: newData,
         include: { conversation: true },
      })

      if (!data) throw new Error('Failed to add lead')

      return {
         data,
         success: true,
         message: `🆗 push → Lead successfully added`,
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ push → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

async function pop({ id }: { id: string }) {
   try {
      const data = await prisma.lead.delete({
         where: {
            id,
         },
      })

      console.log(data)

      if (!data) throw new Error('Lead deletion failed in Prisma layer')

      return {
         data,
         success: true,
         message: '🆗 pop → Lead successfully deleted',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ pop → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

const Lead = { getAll, get, push, pop }
export default Lead
