import { Do, Ui } from '@/lib'

export default async function Leads_Table() {
  const Leads = await Do.Service.Lead.getLeads()

  return (
    <Ui.Card.main>
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
            </Ui.Table.Row>
          </Ui.Table.Header>
          <Ui.Table.Body>
            {Leads.data?.map((lead, index) => (
              <Ui.Table.Row key={`${lead.id}-${index}`}>
                <Ui.Table.Cell> {`${lead.firstName} ${lead.lastName}`}</Ui.Table.Cell>
                <Ui.Table.Cell>{lead.phone}</Ui.Table.Cell>
                <Ui.Table.Cell>{lead.email}</Ui.Table.Cell>
                <Ui.Table.Cell>More</Ui.Table.Cell>
              </Ui.Table.Row>
            ))}
          </Ui.Table.Body>
        </Ui.Table.main>
      </Ui.Card.Content>
    </Ui.Card.main>
  )
}
