import prisma from '@/prisma/client'
import Auth from '../Auth/authManagment'
import { SchemaLeadCreate, TypeLeadCreate } from '@/components/lib/schema'

const Lead = {
   /**
    * Create a lead with validation
    */
   createLead: async (input: TypeLeadCreate) => {
      try {
         const valid = SchemaLeadCreate.safeParse(input)
         if (!valid.success) throw new Error(valid.error.message)

         const lead = await prisma.lead.create({
            data: {
               firstName: input.firstName,
               lastName: input.lastName,
               phone: input.phone,
               email: input.email,
               Organization: { connect: { id: input.organizationId } },
               conversation: { create: {} },
            },
            include: { conversation: true },
         })

         if (!lead) throw new Error('createLead → Prisma Part')

         return { data: lead }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'creatLead → Unknown error',
         }
      }
   },

   delete: async (id: string) => {
      try {
         console.log(id)
         const lead = await prisma.lead.delete({
            where: {
               id,
            },
         })

         console.log('⚠️⚠️⚠️⚠️')
         console.log(lead)

         if (!lead) throw new Error('delete → Prisma Part')

         return { data: lead }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'creatLead → Unknown error',
         }
      }
   },

   /**
    * Get User External ID using Clerk
    */
   getAll: async () => {
      try {
         const user = await Auth.getUser()

         if (!user.data) throw new Error(user.error)

         const leads = await prisma.lead.findMany({
            where: { Organization: { users: { some: { id: user.data.id } } } },
         })

         if (leads.length === 0) throw new Error('getAll → there is no lead')

         return { data: leads }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'getAll → Unknown error',
         }
      }
   },
}

export default Lead
