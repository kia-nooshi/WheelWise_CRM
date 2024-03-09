import { Do } from '@/components'
import { auth } from '@clerk/nextjs'

interface ReturnData<T> {
   data: T | null
   success: boolean
   message: string
}

async function getClerkID(): Promise<ReturnData<string>> {
   try {
      const { userId: data } = auth()
      if (!data) throw new Error('Failed to retrieve Clerk user ID')

      return Do.Util.ReturnData(data, true, 'Clerk user ID successfully retrieved', '🆗 getClerkID')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ getClerkID')
   }
}

const Auth = { getClerkID }
export default Auth
