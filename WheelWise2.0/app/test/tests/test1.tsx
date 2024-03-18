import React from 'react'
import Test_Section from '../comps/section'
import Test_Render from '../comps/render'
import { Util } from '@/lib'
import timer from '../comps/timer'

export async function Test_1() {
  const { result: getClerkId, executionTime: getClerkId_executionTime } = await timer(
    Util.Clerk.getClerkId
  )

  return (
    <Test_Section title='TEST #1 - Clerk Functionality'>
      <Test_Render
        label='Clerk.getClerkId'
        description='Retrieve Clerk ID'
        data={getClerkId}
        executionTime={getClerkId_executionTime}
      />
    </Test_Section>
  )
}
