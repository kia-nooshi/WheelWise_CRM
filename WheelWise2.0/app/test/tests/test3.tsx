import { TEST } from '@/lib'
import Test_Render from '../comps/render'
import Test_Section from '../comps/section'
import timer from '../comps/timer'

export async function Test_3() {
  // Step 1: Create Organ 1
  const { result: createOrgan1, executionTime: createOrgan1_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )

  // Step 2: Create User 1 and add to Organ 1
  const { result: createUser1, executionTime: createUser1_executionTime } = await timer(() =>
    TEST.DataBase.User.pushUser({
      organId: createOrgan1.data.id,
      clerkId: 'clerk1',
      type: 'USER',
    })
  )

  // Step 3: Attempt to create User 2 and add to an Organ that does not exist (expect to fail)
  const { result: createUser2, executionTime: createUser2_executionTime } = await timer(() =>
    TEST.DataBase.User.pushUser({
      organId: 'NonExistentOrganId',
      clerkId: 'clerk2',
      type: 'ADMIN',
    })
  )

  // Additional step: Create User 3 with specific Organ ID
  const { result: createUser3, executionTime: createUser3_executionTime } = await timer(() =>
    TEST.DataBase.User.pushUser({
      organId: '65f8e06224f370e186588257',
      clerkId: 'clerk3',
      type: 'ADMIN',
    })
  )

  // Step 4: Get User 1 using Clerk ID
  const { result: getUser1, executionTime: getUser1_executionTime } = await timer(() =>
    TEST.DataBase.User.getUser({
      clerkId: 'clerk1',
    })
  )

  // Step 5: Attempt to get a User with an ID that does not exist (expect to fail)
  const { result: getUserInvalid, executionTime: getUserInvalid_executionTime } = await timer(() =>
    TEST.DataBase.User.getUser({
      clerkId: 'NonExistentClerkId',
    })
  )

  // Step 6: Pop Organ 1
  const { result: popOrgan1, executionTime: popOrgan1_executionTime } = await timer(() =>
    TEST.DataBase.Organ.popOrgan({ organId: createOrgan1.data.id })
  )

  return (
    <Test_Section title='TEST - User Series'>
      <Test_Render
        description='Create Organ #1'
        data={createOrgan1}
        executionTime={createOrgan1_executionTime}
      />
      <Test_Render
        description='Create User #1 and Add to Organ #1'
        data={createUser1}
        executionTime={createUser1_executionTime}
      />
      <Test_Render
        description='Attempt to Create User #2 and Add to Non-Existent Organ (Expect to Fail)'
        data={createUser2}
        executionTime={createUser2_executionTime}
      />
      <Test_Render
        description='Attempt to Create User #3 with Non-Existent Organ ID (Expect to Fail)'
        data={createUser3}
        executionTime={createUser3_executionTime}
      />
      <Test_Render
        description='Get User #1 using Clerk ID'
        data={getUser1}
        executionTime={getUser1_executionTime}
      />
      <Test_Render
        description='Attempt to Get a User with an ID that does not exist (Expect to Fail)'
        data={getUserInvalid}
        executionTime={getUserInvalid_executionTime}
      />
      <Test_Render
        description='Pop Organ #1'
        data={popOrgan1}
        executionTime={popOrgan1_executionTime}
      />
    </Test_Section>
  )
}
