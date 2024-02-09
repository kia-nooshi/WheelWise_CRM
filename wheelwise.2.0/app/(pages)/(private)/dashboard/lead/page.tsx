import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card'
import LeadTableData from './leadTableData'

const LeadTable = () => {
   return (
      <Card>
         <CardHeader>
            <CardTitle className='text-2xl mb-5'>Lead Table</CardTitle>
            <CardDescription></CardDescription>
         </CardHeader>
         <CardContent>
            <LeadTableData />
         </CardContent>
         <CardFooter>
            <div className='flex flex-col gap-2'>
               <span>✅ Real Time is activated</span>
               <span>❌ Real is not customized to active session yet</span>
               <span>🔨 Filltering, Sorting Comming soon!</span>
            </div>
         </CardFooter>
      </Card>
   )
}

export default LeadTable
