import { Auth } from '@/lib/function'

const Dashboard = async () => {
   const thisUser = await Auth.authReady()

   //! Debuging - Delete Later
   //console.log('\n---------------------\n⚙️  Debugging \n')
   //console.log('     😊  user:', thisUser.data)
   //console.log('     ⚠️  error:', thisUser.error)
   //console.log('\n---------------------\n')

   return <div>sss</div> //<LeadTable />
}

export default Dashboard
