import prisma from '@/prisma/client'

interface ApiResponse<T> {
   data: T | null
   success: boolean
   message: string
}

type MessageType = any
type ConversationType = any

interface CommonProps {
   conversationId: string
   content?: string
   fromLead?: boolean
   threadId?: string | null
}

interface PushMessageProps extends Pick<CommonProps, 'conversationId' | 'content' | 'fromLead'> {}
interface PushThreadIdProps extends Pick<CommonProps, 'conversationId' | 'threadId'> {}

// ------------------------
// UTIL - HELPER
// ------------------------
function createApiResponse<T>(data: T | null, success: boolean, message: string): ApiResponse<T> {
   return { data, success, message }
}

function handleApiError(e: unknown): string {
   return `⛔ ${e instanceof Error ? e.message : 'Unknown error'}`
}

async function pushMessage({
   conversationId,
   content,
   fromLead,
}: PushMessageProps): Promise<ApiResponse<MessageType>> {
   try {
      const data = await prisma.message.create({
         data: {
            conversationId,
            content,
            fromLead,
         },
      })

      if (!data) throw new Error('Failed to create message')

      return createApiResponse(data, true, '🆗 messageCreate → Message successfully created')
   } catch (e) {
      return createApiResponse(null, false, handleApiError(e))
   }
}

async function pushThreadId({
   conversationId,
   threadId,
}: {
   conversationId: string
   threadId: string | null
}): Promise<ApiResponse<ConversationType>> {
   try {
      const data = await prisma.conversation.update({
         where: { id: conversationId },
         data: { threadId },
      })

      if (!data) throw new Error('Failed to update thread ID')

      return {
         data,
         success: true,
         message: '🆗 threadIdUpdate → Thread ID successfully updated',
      }
   } catch (e) {
      return {
         data: null,
         success: false,
         message: `⛔ threadIdUpdate → ${e instanceof Error ? e.message : 'Unknown error'}`,
      }
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
}): Promise<ApiResponse<MessageType>> {
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

export default Chat
