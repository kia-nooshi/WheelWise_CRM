import { Comp, Do, Util } from '@/components'

const Dashboard = async () => {
   const startTime = Date.now()
   const u = await Do.User.Onboarding()
   const endTime = Date.now()

   const duration = endTime - startTime
   console.log('\n\n☑️Time taken:', duration, 'milliseconds')
   console.log(u.data)
   console.log(u.message)
   console.log(u.success)

   return <Comp.Private.Leads />
}

export default Dashboard
