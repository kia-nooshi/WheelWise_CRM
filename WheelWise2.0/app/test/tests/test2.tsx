import { TEST } from '@/lib'
import Test_Render from '../comps/render'
import Test_Section from '../comps/section'
import timer from '../comps/timer'

export async function Test_2() {
  // Create Organs
  const { result: createOrgan1, executionTime: createOrgan1_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )
  const { result: createOrgan2, executionTime: createOrgan2_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )
  const { result: createOrgan3, executionTime: createOrgan3_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )

  // Get all organs after creation
  const {
    result: getAllOrgansAfterCreation,
    executionTime: getAllOrgansAfterCreation_executionTime,
  } = await timer(TEST.DataBase.Organ.getOrgans)

  // Pop Organ 3
  const { result: popOrgan3, executionTime: popOrgan3_executionTime } = await timer(() =>
    TEST.DataBase.Organ.popOrgan({ organId: createOrgan3.data.id })
  )

  // Attempt to pop an Organ that does not exist (expect to fail)
  const { result: popInvalidOrgan, executionTime: popInvalidOrgan_executionTime } = await timer(
    () => TEST.DataBase.Organ.popOrgan({ organId: 'Invalid_OrganID' })
  )

  // Get all organs after popping Organ 3 and attempting invalid pop
  const {
    result: getAllOrgansAfterPopping,
    executionTime: getAllOrgansAfterPopping_executionTime,
  } = await timer(TEST.DataBase.Organ.getOrgans)

  // Get Organ 2
  const { result: getOrgan2, executionTime: getOrgan2_executionTime } = await timer(() =>
    TEST.DataBase.Organ.getOrgan({ organId: createOrgan2.data.id })
  )

  // Attempt to get Organ 3 (expect to fail)
  const { result: getOrgan3, executionTime: getOrgan3_executionTime } = await timer(() =>
    TEST.DataBase.Organ.getOrgan({ organId: createOrgan3.data.id })
  )

  // Pop all organs
  const { result: popAllOrgans, executionTime: popAllOrgans_executionTime } = await timer(
    TEST.DataBase.Organ.popOrgans
  )

  // Get all organs after popping all
  const {
    result: getAllOrgansAfterPoppingAll,
    executionTime: getAllOrgansAfterPoppingAll_executionTime,
  } = await timer(TEST.DataBase.Organ.getOrgans)

  return (
    <Test_Section title='TEST - Modified Organ Functionality'>
      {/* Create Organs */}
      <Test_Render
        description='Create Organ #1'
        data={createOrgan1}
        executionTime={createOrgan1_executionTime}
      />
      <Test_Render
        description='Create Organ #2'
        data={createOrgan2}
        executionTime={createOrgan2_executionTime}
      />
      <Test_Render
        description='Create Organ #3'
        data={createOrgan3}
        executionTime={createOrgan3_executionTime}
      />
      {/* Get all organs after creation */}
      <Test_Render
        description='Get All Organs After Creation'
        data={getAllOrgansAfterCreation}
        executionTime={getAllOrgansAfterCreation_executionTime}
      />
      {/* Pop Organ 3 */}
      <Test_Render
        description='Pop Organ #3'
        data={popOrgan3}
        executionTime={popOrgan3_executionTime}
      />
      {/* Attempt to pop an Organ that does not exist (expect to fail) */}
      <Test_Render
        description='Pop Invalid Organ (Expect to Fail)'
        data={popInvalidOrgan}
        executionTime={popInvalidOrgan_executionTime}
      />
      {/* Get all organs after popping */}
      <Test_Render
        description='Get All Organs After Popping Organ #3 and Invalid Attempt'
        data={getAllOrgansAfterPopping}
        executionTime={getAllOrgansAfterPopping_executionTime}
      />
      {/* Get Organ 2 */}
      <Test_Render
        description='Get Organ #2'
        data={getOrgan2}
        executionTime={getOrgan2_executionTime}
      />
      {/* Attempt to get Organ 3 (expect to fail) */}
      <Test_Render
        description='Get Organ #3 (Expect to Fail)'
        data={getOrgan3}
        executionTime={getOrgan3_executionTime}
      />
      {/* Pop all organs */}
      <Test_Render
        description='Pop All Organs'
        data={popAllOrgans}
        executionTime={popAllOrgans_executionTime}
      />
      {/* Get all organs after popping all */}
      <Test_Render
        description='Get All Organs After Popping All'
        data={getAllOrgansAfterPoppingAll}
        executionTime={getAllOrgansAfterPoppingAll_executionTime}
      />
    </Test_Section>
  )
}
