import React from 'react'
import { Util } from '@/components'
import Test_Render from '../comps/render'
import Test_Section from '../comps/section'
import timer from '../comps/timer'

export async function Test_4() {
   const { result: createdOrgan, executionTime: createOrgan_executionTime } = await timer(
      Util.DataBase.Organ.pushOrgan
   )

   if (!createdOrgan.data) return <>TEST 4 - FAILED FOR UNKNOWN REASON.</>

   const { result: pushedLead1, executionTime: pushLead1_executionTime } = await timer(() =>
      Util.DataBase.Lead.pushLead({
         organId: createdOrgan.data.id,
         firstName: 'John',
         lastName: 'Doe',
         email: 'lead1@gmail.com',
         phone: '111111111',
      })
   )

   const { result: pushedLead2, executionTime: pushLead2_executionTime } = await timer(() =>
      Util.DataBase.Lead.pushLead({
         organId: createdOrgan.data.id,
         firstName: 'Jane',
         lastName: 'Smith',
         email: 'lead2@gmail.com',
         phone: '222222222',
      })
   )

   const { result: pushedLead3, executionTime: pushLead3_executionTime } = await timer(() =>
      Util.DataBase.Lead.pushLead({
         organId: createdOrgan.data.id,
         firstName: 'Alice',
         lastName: 'Johnson',
         email: 'lead3@gmail.com',
         phone: '333333333',
      })
   )

   const { result: deletedOrgan, executionTime: deleteOrgan_executionTime } = await timer(() =>
      Util.DataBase.Organ.popOrgan({ organId: createdOrgan.data.id })
   )

   const { result: allLeads, executionTime: getAllLeads_executionTime } = await timer(() =>
      Util.DataBase.Lead.getLeads({ organId: createdOrgan.data.id })
   )
return (
      <Test_Section title='TEST #4 - Delete onCascade'>
         <Test_Render
            label='Organ.pushOrgan'
            description='Push Organ'
            data={createdOrgan}
            executionTime={createOrgan_executionTime}
         />
         <Test_Render
            label='Lead.pushLead (1)'
            description='Push Lead #1'
            data={pushedLead1}
            executionTime={pushLead1_executionTime}
         />
         <Test_Render
            label='Lead.pushLead (2)'
            description='Push Lead #2'
            data={pushedLead2}
            executionTime={pushLead2_executionTime}
         />
         <Test_Render
            label='Lead.pushLead (3)'
            description='Push Lead #3'
            data={pushedLead3}
            executionTime={pushLead3_executionTime}
         />
         <Test_Render
            label='Organ.popOrgan'
            description='Pop Organ (Cascade)'
            data={deletedOrgan}
            executionTime={deleteOrgan_executionTime}
         />
         <Test_Render
            label='Lead.getLeads'
            description='Get All Leads (After Deletion the Organ)'
            data={allLeads}
            executionTime={getAllLeads_executionTime}
         />
      </Test_Section>
   )
}