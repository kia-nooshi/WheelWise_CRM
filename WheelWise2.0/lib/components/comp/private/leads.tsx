import { Do, Ui } from '@/lib'
import Leads_Table from './leads_table'
import TestLeadImport from './leads_test'

export default async function Leads() {
  return (
    <Ui.Flex gap={'large'} direction={'column'}>
      <Leads_Table />
      <TestLeadImport />
    </Ui.Flex>
  )
}
