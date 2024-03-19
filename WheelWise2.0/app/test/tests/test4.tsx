import { TEST } from '@/lib'
import Test_Render from '../comps/render'
import Test_Section from '../comps/section'
import timer from '../comps/timer'

export async function Test_4() {
  // Step 0: Clean
  await TEST.DataBase.Organ.popOrgans()

  // Step 1: Create an organ
  const { result: createOrgan, executionTime: createOrgan_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )

  // Steps 2-4: Add leads 1-3 to the created organ
  const leadDetails = [
    { firstName: 'Lead1', lastName: 'LastName1', phone: '1234567891', email: 'lead1@example.com' },
    { firstName: 'Lead2', lastName: 'LastName2', phone: '1234567892', email: 'lead2@example.com' },
    { firstName: 'Lead3', lastName: 'LastName3', phone: '1234567893', email: 'lead3@example.com' },
  ]

  const leads = await Promise.all(
    leadDetails.map((detail) =>
      timer(() => TEST.DataBase.Lead.pushLead({ organId: createOrgan.data.id, ...detail }))
    )
  )

  // Step 5: Try to add lead 1 to organ again (Expect to fail)
  const { result: addLead1Again, executionTime: addLead1Again_executionTime } = await timer(() =>
    TEST.DataBase.Lead.pushLead({ organId: createOrgan.data.id, ...leadDetails[0] })
  )

  // Step 6: Try to add lead 1 to an organ that does not exist (Expect to fail)
  const {
    result: addLeadToNonExistentOrgan,
    executionTime: addLeadToNonExistentOrgan_executionTime,
  } = await timer(() =>
    TEST.DataBase.Lead.pushLead({ organId: 'NonExistentOrganId', ...leadDetails[0] })
  )

  // Step 7: Pop lead 2
  const { result: popLead2, executionTime: popLead2_executionTime } = await timer(() =>
    TEST.DataBase.Lead.popLead({ leadId: leads[1].result.data.id })
  )

  // Step 8: Try to pop lead 2 again (Expect to fail)
  const { result: popLead2Again, executionTime: popLead2Again_executionTime } = await timer(() =>
    TEST.DataBase.Lead.popLead({ leadId: leads[1].result.data.id })
  )

  // Step 9: Attempt to get Lead 2 (Expect to fail)
  const { result: getLead2Failed, executionTime: getLead2Failed_executionTime } = await timer(() =>
    TEST.DataBase.Lead.getLead({ leadId: leads[1].result.data.id })
  )

  // Step 10: Get Lead 1
  const { result: getLead1, executionTime: getLead1_executionTime } = await timer(() =>
    TEST.DataBase.Lead.getLead({ leadId: leads[0].result.data.id })
  )

  // Step 11: Get all leads
  const { result: getAllLeads, executionTime: getAllLeads_executionTime } = await timer(() =>
    TEST.DataBase.Lead.getLeads({ organId: createOrgan.data.id })
  )

  // Step 12: Attempt to get all leads from an organ that does not exist (Expect to fail)
  const { result: getAllLeadsNonExistent, executionTime: getAllLeadsNonExistent_executionTime } =
    await timer(() => TEST.DataBase.Lead.getLeads({ organId: 'NonExistentOrganId' }))

  // Step 13: Pop all leads
  const { result: popAllLeads, executionTime: popAllLeads_executionTime } = await timer(() =>
    TEST.DataBase.Lead.popLeads({ organId: createOrgan.data.id })
  )

  // Step 14: Attempt to pop all leads from an organ that does not exist (Expect to fail)
  const { result: popAllLeadsNonExistent, executionTime: popAllLeadsNonExistent_executionTime } =
    await timer(() => TEST.DataBase.Lead.popLeads({ organId: 'NonExistentOrganId' }))

  // Step 15: Get all leads after popping all to verify
  const { result: getAllLeadsFinalCheck, executionTime: getAllLeadsFinalCheck_executionTime } =
    await timer(() => TEST.DataBase.Lead.getLeads({ organId: createOrgan.data.id }))

  return (
    <Test_Section title='TEST - Improved Lead Series'>
      {/* Create Organ */}
      <Test_Render
        description='Create Organ'
        data={createOrgan}
        executionTime={createOrgan_executionTime}
      />

      {/* Add Lead 1 to Organ */}
      <Test_Render
        description='Add Lead 1 to Organ'
        data={leads[0].result}
        executionTime={leads[0].executionTime}
      />

      {/* Add Lead 2 to Organ */}
      <Test_Render
        description='Add Lead 2 to Organ'
        data={leads[1].result}
        executionTime={leads[1].executionTime}
      />

      {/* Add Lead 3 to Organ */}
      <Test_Render
        description='Add Lead 3 to Organ'
        data={leads[2].result}
        executionTime={leads[2].executionTime}
      />

      {/* Try to Add Lead 1 to Organ Again (Expect to Fail) */}
      <Test_Render
        description='Try to Add Lead 1 to Organ Again (Expect to Fail)'
        data={addLead1Again}
        executionTime={addLead1Again_executionTime}
      />

      {/* Try to Add Lead 1 to an Organ That Does Not Exist (Expect to Fail) */}
      <Test_Render
        description='Try to Add Lead 1 to an Organ That Does Not Exist (Expect to Fail)'
        data={addLeadToNonExistentOrgan}
        executionTime={addLeadToNonExistentOrgan_executionTime}
      />

      {/* Pop Lead 2 */}
      <Test_Render
        description='Pop Lead 2'
        data={popLead2}
        executionTime={popLead2_executionTime}
      />

      {/* Try to Pop Lead 2 Again (Expect to Fail) */}
      <Test_Render
        description='Try to Pop Lead 2 Again (Expect to Fail)'
        data={popLead2Again}
        executionTime={popLead2Again_executionTime}
      />

      {/* Attempt to Get Lead 2 (Expect to Fail) */}
      <Test_Render
        description='Attempt to Get Lead 2 (Expect to Fail)'
        data={getLead2Failed}
        executionTime={getLead2Failed_executionTime}
      />

      {/* Get Lead 1 */}
      <Test_Render
        description='Get Lead 1'
        data={getLead1}
        executionTime={getLead1_executionTime}
      />

      {/* Get All Leads */}
      <Test_Render
        description='Get All Leads'
        data={getAllLeads}
        executionTime={getAllLeads_executionTime}
      />

      {/* Attempt to Get All Leads from an Organ That Does Not Exist (Expect to Fail) */}
      <Test_Render
        description='Attempt to Get All Leads from an Organ That Does Not Exist (Expect to Fail)'
        data={getAllLeadsNonExistent}
        executionTime={getAllLeadsNonExistent_executionTime}
      />

      {/* Pop All Leads */}
      <Test_Render
        description='Pop All Leads'
        data={popAllLeads}
        executionTime={popAllLeads_executionTime}
      />

      {/* Attempt to Pop All Leads from an Organ That Does Not Exist (Expect to Fail) */}
      <Test_Render
        description='Attempt to Pop All Leads from an Organ That Does Not Exist (Expect to Fail)'
        data={popAllLeadsNonExistent}
        executionTime={popAllLeadsNonExistent_executionTime}
      />

      {/* Get All Leads After Popping All to Verify */}
      <Test_Render
        description='Get All Leads After Popping All to Verify'
        data={getAllLeadsFinalCheck}
        executionTime={getAllLeadsFinalCheck_executionTime}
      />
    </Test_Section>
  )
}
