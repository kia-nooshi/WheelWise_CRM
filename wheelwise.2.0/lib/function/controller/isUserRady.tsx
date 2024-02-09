import {
   createOrganization,
   createUser,
   getUserByExternalID,
   getUserExternalID_ClerkSS,
} from '@/lib/function/'

import delay from 'delay'

/**
 * Controller
 * Make sure USER is loged in and it has an Orgnization
 * @returns {User} it will return the user
 * @throws {Error} if User Not Exist, or Clerk Fail
 */
export async function isUserReady() {
   await delay(2000)

   try {
      const userExternalId = await getUserExternalID_ClerkSS()

      if (!userExternalId) {
         throw new Error(
            'Clerk - User Authentication failed - Developer Code : 9999'
         )
      }

      let user = await getUserByExternalID(userExternalId)

      /**
       *  if User Does not exist - It must exist - It Must be belong to orgnization
       *  create orgnization - create user , add to orgnization
       */
      if (!user) {
         const organization = await createOrganization()

         user = await createUser({
            externalId: userExternalId,
            organizationId: organization.id,
         })

         if (!user) {
            throw new Error('Faild to create new user - Developer Code : 9998')
         }
      }

      return user
   } catch (error) {
      if (error instanceof Error) {
         throw error
      } else {
         throw new Error(
            'An unknown error occurred during user readiness check - Developer Code : 9000'
         )
      }
   }
}
