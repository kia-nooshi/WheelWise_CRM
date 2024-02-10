import { isUserReady } from '@/lib/function'

const page = async () => {
   try {
      const user = await isUserReady()

      return <>{user.externalId}</>
   } catch (error) {
      if (error instanceof Error) {
         console.error('Error:', error.message)
         return <>🔥 {error.message}</>
      }
   }
}

export default page
