import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs'

const Auth = {
   /**
    * Get User External ID using Clerk
    */
   externalId: async () => {
      try {
         const { userId } = auth()
         if (!userId) {
            throw new Error('No Clerk ID')
         }
         return { data: userId }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'externalId → Unknown error',
         }
      }
   },

   /**
    * Create an organization using Prisma
    */
   createOrganization: async () => {
      try {
         const data = await prisma.organization.create({ data: {} })
         return { data }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'createOrganization → Unknown error',
         }
      }
   },

   /**
    * Create a user with associated organization and external ID
    */
   createUser: async () => {
      try {
         const externalId = await Auth.externalId()

         if (!externalId.data) throw new Error(externalId.error)

         const orgenzation = await Auth.createOrganization()

         if (!orgenzation.data) throw new Error(orgenzation.error)

         const user = await prisma.user.create({
            data: {
               externalId: externalId.data,
               organizationId: orgenzation.data.id,
            },
            include: {
               organization: true,
            },
         })
         return { data: user }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'createUser → Unknown error',
         }
      }
   },

   /**
    * Fetch a user by their external ID
    */
   getUser: async () => {
      try {
         const externalId = await Auth.externalId()

         if (!externalId.data) throw new Error(externalId.error)

         const user = await prisma.user.findUnique({
            where: { externalId: externalId.data },
            include: {
               organization: true,
            },
         })

         if (!user) throw new Error('createUser → User does not exist')

         return { data: user }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'createUser → Unknown error',
         }
      }
   },

   /**
    * Get User By External Id
    */
   authReady: async () => {
      try {
         const user = await Auth.getUser()

         if (user.data) return { data: user.data }

         const newUser = await Auth.createUser()

         if (!newUser.data) throw new Error(newUser.error)

         return { data: newUser.data }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error ? error.message : 'Auth → Unknown error',
         }
      }
   },
}

export default Auth
