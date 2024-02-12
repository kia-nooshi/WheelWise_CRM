import { isUserReady } from '@/lib/function'
import { LeadTable } from './lead/leadTable'

const Dashboard = async () => {
   try {
      const user = await isUserReady()

      return (
         <div>
            <LeadTable />
         </div>
      )
   } catch (error) {
      if (error instanceof Error) {
         console.error('Error:', error.message)
         return <>🔥 {error.message}</>
      }
   }
}

export default Dashboard
