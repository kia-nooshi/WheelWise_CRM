import { TEST } from '@/lib'
import Test_Render from '../comps/render'
import Test_Section from '../comps/section'
import timer from '../comps/timer'

export async function Test_5() {
  // Step 0: Clean
  await TEST.DataBase.Organ.popOrgans()

  // Step 1: Create Organ
  const { result: createOrgan, executionTime: createOrgan_executionTime } = await timer(
    TEST.DataBase.Organ.pushOrgan
  )

  // Step 2: Push lead to organ
  const { result: pushLead, executionTime: pushLead_executionTime } = await timer(() =>
    TEST.DataBase.Lead.pushLead({
      organId: createOrgan.data.id,
      firstName: 'Lead Name',
      lastName: 'Last Name',
      phone: '1234567890',
      email: 'lead@example.com',
    })
  )

  // Step 3: Push chat to lead
  const { result: pushChat, executionTime: pushChat_executionTime } = await timer(() =>
    TEST.DataBase.Chat.pushChat({ leadId: pushLead.data.id })
  )

  // Step 3.1: Try to push chat again (Expect to fail)
  const { result: pushChatAgain, executionTime: pushChatAgain_executionTime } = await timer(() =>
    TEST.DataBase.Chat.pushChat({ leadId: pushLead.data.id })
  )

  // Step 4: Push chat to lead that does not exist (Expect to fail)
  const { result: pushChatNonExistentLead, executionTime: pushChatNonExistentLead_executionTime } =
    await timer(() => TEST.DataBase.Chat.pushChat({ leadId: 'NonExistentLeadId' }))

  // Step 5: Pop the chat
  const { result: popChat, executionTime: popChat_executionTime } = await timer(() =>
    TEST.DataBase.Chat.popChat({ chatId: pushChat.data.id })
  )

  // Step 6: Try to pop the chat again (Expect to fail)
  const { result: popChatAgain, executionTime: popChatAgain_executionTime } = await timer(() =>
    TEST.DataBase.Chat.popChat({ chatId: pushChat.data.id })
  )

  // Step 7: Again push a chat
  const { result: pushChatAgainSuccess, executionTime: pushChatAgainSuccess_executionTime } =
    await timer(() => TEST.DataBase.Chat.pushChat({ leadId: pushLead.data.id }))

  // Step 8: Get a chat
  const { result: getChat, executionTime: getChat_executionTime } = await timer(() =>
    TEST.DataBase.Chat.getChat({ chatId: pushChatAgainSuccess.data.id })
  )

  // Step 9: Try to get a chat that does not exist (Expect to fail)
  const { result: getChatNonExistent, executionTime: getChatNonExistent_executionTime } =
    await timer(() => TEST.DataBase.Chat.getChat({ chatId: 'NonExistentChatId' }))

  // Step 10: Push message to the chat
  const { result: pushMessage, executionTime: pushMessage_executionTime } = await timer(() =>
    TEST.DataBase.Message.pushMessage({
      chatId: getChat.data.id,
      content: 'Hello, this is a test message.',
      fromLead: true,
    })
  )

  // Step 11: Try to push message to the chat that does not exist (Expect to fail)
  const {
    result: pushMessageNonExistentChat,
    executionTime: pushMessageNonExistentChat_executionTime,
  } = await timer(() =>
    TEST.DataBase.Message.pushMessage({
      chatId: 'NonExistentChatId',
      content: 'This should not succeed.',
      fromLead: false,
    })
  )

  // Step 12: Get a chat again to see messages
  const { result: getChatFinal, executionTime: getChatFinal_executionTime } = await timer(() =>
    TEST.DataBase.Chat.getChat({ chatId: getChat.data.id })
  )

  // Step 0: Clean
  await TEST.DataBase.Organ.popOrgans()

  return (
    <Test_Section title='TEST - Chat and Message Series'>
      <Test_Render
        description='Create Organ'
        data={createOrgan}
        executionTime={createOrgan_executionTime}
      />
      <Test_Render
        description='Push Lead to Organ'
        data={pushLead}
        executionTime={pushLead_executionTime}
      />
      <Test_Render
        description='Push Chat to Lead'
        data={pushChat}
        executionTime={pushChat_executionTime}
      />
      <Test_Render
        description='Try to Push Chat Again (Expect to Fail)'
        data={pushChatAgain}
        executionTime={pushChatAgain_executionTime}
      />
      <Test_Render
        description='Push Chat to Lead That Does Not Exist (Expect to Fail)'
        data={pushChatNonExistentLead}
        executionTime={pushChatNonExistentLead_executionTime}
      />
      <Test_Render
        description='Pop the Chat'
        data={popChat}
        executionTime={popChat_executionTime}
      />
      <Test_Render
        description='Try to Pop the Chat Again (Expect to Fail)'
        data={popChatAgain}
        executionTime={popChatAgain_executionTime}
      />
      <Test_Render
        description='Again Push a Chat'
        data={pushChatAgainSuccess}
        executionTime={pushChatAgainSuccess_executionTime}
      />
      <Test_Render description='Get a Chat' data={getChat} executionTime={getChat_executionTime} />
      <Test_Render
        description='Try to Get a Chat That Does Not Exist (Expect to Fail)'
        data={getChatNonExistent}
        executionTime={getChatNonExistent_executionTime}
      />
      <Test_Render
        description='Push Message to the Chat'
        data={pushMessage}
        executionTime={pushMessage_executionTime}
      />
      <Test_Render
        description='Try to Push Message to the Chat That Does Not Exist (Expect to Fail)'
        data={pushMessageNonExistentChat}
        executionTime={pushMessageNonExistentChat_executionTime}
      />
      <Test_Render
        description='Get a Chat Again to See Messages'
        data={getChatFinal}
        executionTime={getChatFinal_executionTime}
      />
    </Test_Section>
  )
}
