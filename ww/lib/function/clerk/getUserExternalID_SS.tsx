import { auth } from '@clerk/nextjs'

/**
 * this is an  Clerk Auth Function - To get User ID from SERVER SIDE
 * @returns {string | null}
 */
export function getUserExternalID_ClerkSS() {
   const { userId } = auth()

   if (!userId) {
      // If no user is currently authenticated, return null
      return null
   }

   // Return the authenticated user's ID for further use
   return userId
}
