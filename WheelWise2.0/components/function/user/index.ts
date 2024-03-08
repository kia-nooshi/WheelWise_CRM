import { Do } from '@/components'
import prisma from '@/prisma/client'

async function getCurrentUser() {
   try {
      const ClerkID = await Do.Auth.getClerkID()
      if (!ClerkID.success || !ClerkID.data) throw new Error(ClerkID.message)

      const data = await prisma.user.findUnique({
         where: { externalId: ClerkID.data },
         include: {
            organization: true,
         },
      })

      if (!data) throw new Error('User does not exist')

      return {
         data,
         success: true,
         message: '🆗 getUser → User successfully retrieved',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ getUser → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

async function pushAdmin() {
   try {
      const ClerkID = await Do.Auth.getClerkID()
      if (!ClerkID.success) throw new Error(ClerkID.message)

      const Organ = await Do.Organ.push()
      if (!Organ.success || !Organ.data) throw new Error(Organ.message)

      const data = await prisma.user.create({
         data: {
            externalId: ClerkID.data,
            organizationId: Organ.data.id,
         },
         include: { organization: true },
      })

      if (!data) throw new Error('Failed to add admin')

      return {
         data,
         success: true,
         message: '🆗 pushAdmin → Admin successfully added',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ pushAdmin → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

const User = { getCurrentUser, pushAdmin }
export default User
