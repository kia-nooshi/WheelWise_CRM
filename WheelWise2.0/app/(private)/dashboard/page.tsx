import { Comp } from '@/lib'
import Reval from './reval'

const Dashboard = async () => {
  return (
    <div>
      <Reval revalpath={`/dashboard`} sec={5} />
      <Comp.Private.Leads />
    </div>
  )
}

export default Dashboard
