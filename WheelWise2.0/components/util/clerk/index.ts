import { Util } from '@/components'
import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs'

// Helper Function

type ReturnData<T> = {
   data: T | null
   success: boolean
   message: string
}

// ----------------------
// Clerk Management
// ----------------------
async function getClerkId(): Promise<ReturnData<string>> {
   return Util.Other.returnHandeler(
      async () => {
         const { userId: data } = await auth()
         if (!data) throw new Error('Failed to retrieve Clerk user ID')
         return data
      },
      'Clerk user ID successfully retrieved',
      'Failed to retrieve Clerk user ID',
      'getClerkID'
   )
}

const Clerk = { getClerkId }
export default Clerk
