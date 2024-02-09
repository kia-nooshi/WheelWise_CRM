import { getUserExternalID_ClerkSS, isUserReady } from '@/lib/function'
import { toast } from 'sonner'
import Ttt from './ttt'

const page = async () => {
   try {
      const user = await isUserReady()

      //toast.success('Event has been created')
      return (
         <>
            <Ttt />
            {user.externalId}
         </>
      )
   } catch (error) {
      if (error instanceof Error) {
         console.error('Error:', error.message)
         return <>🔥 {error.message}</>
      }
   }
}

export default page
