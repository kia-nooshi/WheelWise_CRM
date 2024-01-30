import FlexCenter from '@/components/ui/flex-center'
import LeadChart from './charts/page'
import LeadTable from './lead/page'

const page = () => {
   return (
      <div className='grid gap-10'>
         <LeadChart />
         <LeadTable />
      </div>
   )
}

export default page
