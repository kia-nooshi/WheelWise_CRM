import { Do, Ui } from '@/lib'
import { LeadBadge } from './leadBadge'
import { Card, Table, Text } from '@radix-ui/themes'
import Link from 'next/link'
import LeadRefresh from './leadRefresh'
import TestLeadImport from '../../testLeadImport'

export default async function Leads() {
  const Leads = await Do.Lead.getLeads()
  if (!Leads.data) return <>leads empty</>

  return (
    <Card variant='surface' className='p-5'>
      <Text as='div' size='2' weight='bold'>
        Lead Table
      </Text>
      <Table.Root variant='surface' className='mt-5'>
        <Table.Header>
          <Table.Row>
            {['Name', 'Phone', 'Email', 'Status', 'Created', ''].map((header) => (
              <Table.ColumnHeaderCell key={header}>{header}</Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <LeadRefresh />
          {Leads.data.map((lead) => (
            <Table.Row key={lead.id}>
              <Table.RowHeaderCell>
                <Link href={`/dashboard/${lead.id}`} className='text-indigo-500'>
                  {`${lead.firstName} ${lead.lastName}`}
                </Link>
              </Table.RowHeaderCell>
              <Table.Cell>{lead.phone}</Table.Cell>
              <Table.Cell>{lead.email}</Table.Cell>
              <Table.Cell>
                <LeadBadge leadType={lead.badge} />
              </Table.Cell>
              <Table.Cell>
                <div className='flex flex-row items-center gap-2 text-gray-600'>
                  <Ui.Icon name='Time' />
                  {lead.createdAt.toDateString()}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className='flex flex-row items-center gap-2 text-gray-600'>
                  <span>
                    <Ui.Icon name='Pen' />
                  </span>
                  <span>
                    <Ui.Icon name='Trash' />
                  </span>
                  <span className='text-gray-100'>
                    <Ui.Icon name='Dots_Vertical' />
                  </span>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <TestLeadImport />
    </Card>
  )
}
