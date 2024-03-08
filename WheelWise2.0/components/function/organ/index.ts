import prisma from '@/prisma/client'

async function push() {
   try {
      const data = await prisma.organization.create({ data: {} })

      if (!data) throw new Error('Failed to add organization')

      return {
         data,
         success: true,
         message: '🆗 pushOrgan → Organization successfully added',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ pushOrgan → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

const Organization = { push }
export default Organization
