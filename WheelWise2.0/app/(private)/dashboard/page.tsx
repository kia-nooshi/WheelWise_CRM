import { Auth, Lead } from '@/lib/function'
import { LeadTable } from '@/components'
import { Toast } from '@/components/ui/toast'
import { Toaster } from 'sonner'
import { useState } from 'react'

const Dashboard = async () => {
   const thisUser = await Auth.authReady()

   //! Debuging - Delete Later
   //console.log('\n---------------------\n⚙️  Debugging \n')
   //console.log('     😊  user:', thisUser.data)
   //console.log('     ⚠️  error:', thisUser.error)
   //console.log('\n---------------------\n')

   return <LeadTable />
}

export default Dashboard
