import { TEST } from '@/lib'
import Test_Render from '../comps/render'
import Test_Section from '../comps/section'
import timer from '../comps/timer'

export async function Test_2() {
  const { result: pushOrgan_1, executionTime: pushOrgan_1_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )
  const { result: pushOrgan_2, executionTime: pushOrgan_2_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )
  const { result: pushOrgan_3, executionTime: pushOrgan_3_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )
  const { result: getOrgans_1, executionTime: getOrgans_1_executionTime } = await timer(
    TEST.DataBase.Organ.getOrgans
  )

  if (!pushOrgan_1.data || !pushOrgan_2.data) return <>TEST 2 - FAILED FOR UNKNOWN REASON.</>

  const { result: popOrgan_1, executionTime: popOrgan_1_executionTime } = await timer(() =>
    TEST.DataBase.Organ.popOrgan({ organId: pushOrgan_1.data.id })
  )
  const { result: getOrgans_2, executionTime: getOrgans_2_executionTime } = await timer(
    TEST.DataBase.Organ.getOrgans
  )
  const { result: popOrgans_1, executionTime: popOrgans_1_executionTime } = await timer(
    TEST.DataBase.Organ.popOrgans
  )
  const { result: getOrgans_3, executionTime: getOrgans_3_executionTime } = await timer(
    TEST.DataBase.Organ.getOrgans
  )
  return (
    <Test_Section title='TEST #2 - Organ Functionality'>
      <Test_Render
        description='Push Organ #1'
        data={pushOrgan_1}
        executionTime={pushOrgan_1_executionTime}
      />
      <Test_Render
        description='Push Organ #2'
        data={pushOrgan_2}
        executionTime={pushOrgan_2_executionTime}
      />
      <Test_Render
        description='Push Organ #3'
        data={pushOrgan_3}
        executionTime={pushOrgan_3_executionTime}
      />
      <Test_Render
        description='Get All Organs #1 #2 #3'
        data={getOrgans_1}
        executionTime={getOrgans_1_executionTime}
      />
      <Test_Render
        description='Pop Organ #1'
        data={popOrgan_1}
        executionTime={popOrgan_1_executionTime}
      />
      <Test_Render
        description='Get All Organs #2 #3'
        data={getOrgans_2}
        executionTime={getOrgans_2_executionTime}
      />
      <Test_Render
        description='Pop All Organs'
        data={popOrgans_1}
        executionTime={popOrgans_1_executionTime}
      />
      <Test_Render
        description='Get All Organs #2 #3'
        data={getOrgans_3}
        executionTime={getOrgans_3_executionTime}
      />
    </Test_Section>
  )
}
