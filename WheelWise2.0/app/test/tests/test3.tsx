import React from 'react'
import Test_Section from '../comps/section'
import { Util } from '@/components/do'
import Test_Render from '../comps/render'
import timer from '../comps/timer'

export async function Test_3() {
   const { result: pushOrgan_1, executionTime: pushOrgan_1_executionTime } = await timer(
      Util.DataBase.Organ.pushOrgan
   )

   if (!pushOrgan_1.data) return <>TEST 3 - FAILED FOR UNKNOWN REASON.</>

   const { result: pushLead_1, executionTime: pushLead_1_executionTime } = await timer(() =>
      Util.DataBase.Lead.pushLead({
         organId: pushOrgan_1.data.id,
         firstName: 'John',
         lastName: 'Doe',
         email: 'test1@gmail.com',
         phone: '123456789',
      })
   )

   const { result: pushLead_1Again, executionTime: pushLead_1Again_executionTime } = await timer(
      () =>
         Util.DataBase.Lead.pushLead({
            organId: pushOrgan_1.data.id,
            firstName: 'John',
            lastName: 'Doe',
            email: 'test1@gmail.com',
            phone: '123456789',
         })
   )

   const { result: pushLead_2, executionTime: pushLead_2_executionTime } = await timer(() =>
      Util.DataBase.Lead.pushLead({
         organId: pushOrgan_1.data.id,
         firstName: 'Jane',
         lastName: 'Smith',
         email: 'test2@gmail.com',
         phone: '987654321',
      })
   )

   const { result: pushLead_3, executionTime: pushLead_3_executionTime } = await timer(() =>
      Util.DataBase.Lead.pushLead({
         organId: pushOrgan_1.data.id,
         firstName: 'Alice',
         lastName: 'Johnson',
         email: 'test3@gmail.com',
         phone: '555555555',
      })
   )

   const { result: pushLead_4, executionTime: pushLead_4_executionTime } = await timer(() =>
      Util.DataBase.Lead.pushLead({
         organId: pushOrgan_1.data.id,
         firstName: 'Bob',
         lastName: 'Brown',
         email: 'test4@gmail.com',
         phone: '666666666',
      })
   )
   if (!!!pushLead_2.data) return <>{pushLead_2.message}</>
   if (!!!pushLead_3.data) return <>{pushLead_3.message}</>

   const { result: getLead_2, executionTime: getLead_2_executionTime } = await timer(() =>
      Util.DataBase.Lead.getLead({ leadId: pushLead_2.data.id })
   )

   const { result: getLeads, executionTime: getLeads_executionTime } = await timer(() =>
      Util.DataBase.Lead.getLeads({ organId: pushOrgan_1.data.id })
   )

   const { result: popLead_3, executionTime: popLead_3_executionTime } = await timer(() =>
      Util.DataBase.Lead.popLead({ leadId: pushLead_3.data.id })
   )

   const { result: getLead_3, executionTime: getLead_3_executionTime } = await timer(() =>
      Util.DataBase.Lead.getLead({ leadId: pushLead_3.data.id })
   )

   const { result: getLeads_AfterPop, executionTime: getLeads_AfterPop_executionTime } =
      await timer(() => Util.DataBase.Lead.getLeads({ organId: pushOrgan_1.data.id }))

   const { result: popLeads, executionTime: popLeads_executionTime } = await timer(() =>
      Util.DataBase.Lead.popLeads({ organId: pushOrgan_1.data.id })
   )

   const { result: getLeads_AfterPopLeads, executionTime: getLeads_AfterPopLeads_executionTime } =
      await timer(() => Util.DataBase.Lead.getLeads({ organId: pushOrgan_1.data.id }))

   const { result: clear, executionTime: clear_executionTime } = await timer(() =>
      Util.DataBase.Organ.popOrgan({ organId: pushOrgan_1.data.id })
   )
   return (
    <Test_Section title='TEST #3 - Lead Functionality'>
       <Test_Render
          label='Organ.pushOrgan'
          description='Push Organ #1'
          data={pushOrgan_1}
          executionTime={pushOrgan_1_executionTime}
       />
       <Test_Render
          label='Lead.pushLead'
          description='Push Lead #1'
          data={pushLead_1}
          executionTime={pushLead_1_executionTime}
       />
       <Test_Render
          label='Lead.pushLead (Duplicate)'
          description='Try Pushing Lead #1 Again (Expected to Fail)'
          data={pushLead_1Again}
          executionTime={pushLead_1Again_executionTime}
       />
       <Test_Render
          label='Lead.pushLead'
          description='Push Lead #2'
          data={pushLead_2}
          executionTime={pushLead_2_executionTime}
       />
       <Test_Render
          label='Lead.pushLead'
          description='Push Lead #3'
          data={pushLead_3}
          executionTime={pushLead_3_executionTime}
       />
<Test_Render
          label='Lead.pushLead'
          description='Push Lead #4'
          data={pushLead_4}
          executionTime={pushLead_4_executionTime}
       />
       <Test_Render
          label='Lead.getLead'
          description='Get Lead #2'
          data={getLead_2}
          executionTime={getLead_2_executionTime}
       />
       <Test_Render
          label='Lead.getAllLeads'
          description='Get All Leads'
          data={getLeads}
          executionTime={getLeads_executionTime}
       />
       <Test_Render
          label='Lead.popLead'
          description='Pop Lead #3'
          data={popLead_3}
          executionTime={popLead_3_executionTime}
       />
       <Test_Render
          label='Lead.getLead'
          description='Get Lead #3 (After Pop)'
          data={getLead_3}
          executionTime={getLead_3_executionTime}
       />
       <Test_Render
          label='Lead.getAllLeads (After Pop)'
          description='Get All Leads (After Pop)'
          data={getLeads_AfterPop}
          executionTime={getLeads_AfterPop_executionTime}
       />
       <Test_Render
          label='Lead.popAllLeads'
          description='Pop All Leads'
          data={popLeads}
          executionTime={popLeads_executionTime}
       />
       <Test_Render
          label='Lead.getAllLeads (After Pop All)'
          description='Get All Leads (After Pop All)'
          data={getLeads_AfterPopLeads}
          executionTime={getLeads_AfterPopLeads_executionTime}
       />
       <Test_Render
          label='Organ.popOrgan'
          description='Clear Organs'
          data={clear}
          executionTime={clear_executionTime}
       />
    </Test_Section>
 )
}