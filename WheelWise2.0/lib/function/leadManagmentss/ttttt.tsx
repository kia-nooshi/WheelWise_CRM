'use server'
import prisma from '@/prisma/client'

export const deleteLead = async (id: string) => {
   try {
      const lead = await prisma.lead.delete({
         where: {
            id: id,
         },
      })

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
}
