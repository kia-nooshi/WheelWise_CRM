'use client'

import { useUser } from '@clerk/nextjs'

/**
 * this is an  Clerk Auth Function - To get User ID from CLIENT SIDE
 * @returns {string | null}
 */
export function getUserExternalID_ClerkCS() {
   const { isLoaded, isSignedIn, user } = useUser()

   if (!isLoaded || !isSignedIn) {
      return null
   }

   return user.id
}
