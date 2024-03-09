import { Do } from '@/components'
import prisma from '@/prisma/client'

interface CommonProps {
   id: string
   messageId: string
   chatId: string
   content: string
   fromLead: boolean
   threadId: string | null
}

interface ReturnData<T> {
   data: T | null
   success: boolean
   message: string
}

interface PushMessageProps extends Pick<CommonProps, 'id' | 'content' | 'fromLead'> {}
interface PopMessageProps extends Pick<CommonProps, 'id'> {}
interface PushChatProps extends Pick<CommonProps, 'id' | 'threadId'> {}
interface PopChatProps extends Pick<CommonProps, 'id'> {}

// ------------------------
// UTIL - HELPER
// ------------------------

async function pushMessage({
   id,
   content,
   fromLead,
}: PushMessageProps): Promise<ReturnData<PushMessageProps>> {
   try {
      const data = await prisma.message.create({
         data: {
            content,
            fromLead,
            chat: { connect: { id } },
         },
      })

      if (!data) throw new Error('Failed to push message')

      return Do.Util.ReturnData(data, true, 'Message successfully pushed', '🆗 pushMessage')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ pushMessage')
   }
}

async function popMessage({ id }: PopMessageProps): Promise<ReturnData<PopMessageProps>> {
   try {
      const data = await prisma.message.delete({
         where: { id },
      })

      if (!data) throw new Error('Failed to pop message')

      return Do.Util.ReturnData(data, true, 'Message successfully poped', '🆗 popMessage')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ popMessage')
   }
}

async function pushChat({ id, threadId }: PushChatProps): Promise<ReturnData<PushChatProps>> {
   try {
      const chatData: any = {
         lead: { connect: { id } },
      }

      if (threadId) {
         chatData.threadId = threadId
      }

      const data = await prisma.chat.create({
         data: chatData,
      })

      if (!data) throw new Error('Failed to push chat')

      return Do.Util.ReturnData(data, true, 'Chat successfully pushed', '🆗 pushChat')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ pushChat')
   }
}

async function popChat({ id }: PopChatProps): Promise<ReturnData<PopChatProps>> {
   try {
      const data = await prisma.chat.delete({
         where: { id },
      })

      if (!data) throw new Error('Failed to pop chat')

      return Do.Util.ReturnData(data, true, 'Chat successfully popped', '🆗 popChat')
   } catch (e) {
      return Do.Util.ReturnData(null, false, e, '⛔ popChat')
   }
}

async function getAiResponse({
   conversationId,
   message,
   threadId,
}: {
   conversationId: string
   message: string
   threadId: string | null
}): Promise<ReturnData<MessageType>> {
   try {
      const apiUrl = process.env.CHATGPT_API
      if (!apiUrl) throw new Error('CHATGPT_API URL is not defined in .env')

      const response = await fetch(apiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            message,
            threadId,
         }),
      })

      if (!response.ok) throw new Error('Make.com API error')

      const data = await response.json()

      if (!threadId && data.threadId) {
         const tid = await pushThreadId({
            conversationId,
            threadId: data.threadId,
         })

         if (!tid.success) throw new Error(tid.message)
      }

      const aiMessage = await push({
         conversationId,
         content: data.respond,
         fromLead: false,
      })

      if (!aiMessage.success) throw new Error(aiMessage.message)

      return {
         data: aiMessage.data,
         success: true,
         message: '🆗 messageAiCreate → AI message successfully created',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ messageAiCreate → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
   }
}

/*
const Chat = {
   sendGHL: async ({
      message,
      phone,
      ogId,
   }: {
      message: string
      phone: string
      ogId: string | null
   }) => {
      const apiUrl =
         'https://services.leadconnectorhq.com/hooks/uNyicEbw5vTcA79v8VKv/webhook-trigger/325f755d-cba4-426a-a1e7-e12332157afa'
      const response = await fetch(apiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            message,
            phone,
            ogId,
         }),
      })

      return null
   },
}
*/

const Chat = { pushChat, pushMessage, popMessage, popChat }
export default Chat
