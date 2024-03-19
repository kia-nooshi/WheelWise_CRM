import { Do, Ui } from '@/lib'
import Link from 'next/link'

export default async function Leads_Table() {
  const Leads = await Do.Service.Lead.getLeads()

  return (
    <Ui.Card.main className='w-full'>
      <Ui.Card.Header>
        <Ui.Card.Title>New Leads</Ui.Card.Title>
        <Ui.Card.Description>here is the list of the all of the newst leads</Ui.Card.Description>
      </Ui.Card.Header>
      <Ui.Card.Content>
        <Ui.Table.main>
          <Ui.Table.Caption>A list of your recent Leads.</Ui.Table.Caption>
          <Ui.Table.Header>
            <Ui.Table.Row>
              <Ui.Table.Head>Name</Ui.Table.Head>
              <Ui.Table.Head>Phone</Ui.Table.Head>
              <Ui.Table.Head>Email</Ui.Table.Head>
              <Ui.Table.Head>Status</Ui.Table.Head>
              <Ui.Table.Head></Ui.Table.Head>
            </Ui.Table.Row>
          </Ui.Table.Header>
          <Ui.Table.Body>
            {Leads.data?.map((lead, index) => (
              <Ui.Table.Row key={`${lead.id}-${index}`}>
                <Ui.Table.Cell>
                  <Link
                    href={`dashboard/${lead.id}`}
                    className={Ui.Button.buttonVariants({ variant: 'link' })}
                  >{`${lead.firstName} ${lead.lastName}`}</Link>{' '}
                </Ui.Table.Cell>
                <Ui.Table.Cell>{lead.phone}</Ui.Table.Cell>
                <Ui.Table.Cell>{lead.email}</Ui.Table.Cell>
                <Ui.Table.Cell>
                  <Ui.Badge.main variant='default'>OPEN</Ui.Badge.main>
                </Ui.Table.Cell>

                <Ui.Table.Cell className='flex flex-row justify-center items-center gap-3 text-zinc-500'>
                  <Ui.Icon name='Pen' />
                  <Ui.Icon name='Trash' />
                  <Ui.Style className=' text-zinc-100'>
                    <Ui.Icon name='Dots_Vertical' />
                  </Ui.Style>
                </Ui.Table.Cell>
              </Ui.Table.Row>
            ))}
          </Ui.Table.Body>
        </Ui.Table.main>
      </Ui.Card.Content>
    </Ui.Card.main>
  )
}
