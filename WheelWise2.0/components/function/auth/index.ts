import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs'

async function getClerkID() {
   try {
      const { userId: data } = auth()
      if (!data) throw new Error('Failed to retrieve Clerk user ID')

      return {
         data,
         success: true,
         message: '🆗 getClerkID → Clerk user ID successfully retrieved',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ getClerkID → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

/*


const Auth = {

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
*/

const Auth = { getClerkID }

export default Auth
