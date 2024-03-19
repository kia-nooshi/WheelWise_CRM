import React from 'react'
import Test_Section from '../comps/section'
import Test_Render from '../comps/render'
import { TEST, Util } from '@/lib'
import timer from '../comps/timer'

export async function Test_1() {
  // Step 0: Clean
  await TEST.DataBase.Organ.popOrgans()

  // Step 1 - Clerk ID
  const { result, executionTime: getClerkId_executionTime } = await timer(
    TEST.Auth.Clerk.getClerkId
  )

  return (
    <Test_Section title='TEST #1 - Clerk Functionality'>
      <Test_Render
        description='Retrieve Clerk ID'
        data={result}
        executionTime={getClerkId_executionTime}
      />
    </Test_Section>
  )
}
