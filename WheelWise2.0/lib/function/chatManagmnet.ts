import prisma from '@/prisma/client'

const Chat = {
   /**
    * Create a chat message
    */
   messageCreate: async ({
      conversationId,
      content,
      fromLead,
   }: {
      conversationId: string
      content: string
      fromLead: boolean
   }) => {
      try {
         const message = await prisma.message.create({
            data: {
               conversationId,
               content,
               fromLead,
            },
         })
         return { data: message }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'ChatMessageCreate → Unknown error',
         }
      }
   },
   /**
    * Update thread id of conversation
    */
   threadIdUpdate: async ({
      convId,
      threadId,
   }: {
      convId: string
      threadId: string | null
   }) => {
      try {
         const tid = await prisma.conversation.update({
            where: { id: convId },
            data: { threadId },
         })

         if (!tid) throw new Error('threadIdUpdate → Faild with prisma')

         return { data: tid }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'ChatMessageCreate → Unknown error',
         }
      }
   },

   messageAiCreate: async ({
      convId,
      message,
      threadId,
   }: {
      convId: string
      message: string
      threadId: string | null
   }) => {
      try {
         // Call ChatGPT Api using Make - and ger responed
         const apiUrl =
            'https://hook.us1.make.com/6pd9m39lt001ywmjcg5qyew0av1364ed'
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

         const data: { respond: string; threadId: string } =
            await response.json()

         console.log('ssssssssss')
         console.log(data.respond)

         if (!response.ok)
            throw new Error('AiRespondCreate → Make.com API error')

         if (!threadId) {
            const tid = await Chat.threadIdUpdate({
               convId: convId,
               threadId: data.threadId,
            })

            if (!tid.data) throw new Error(tid.error)
         }

         const aiMessage = await Chat.messageCreate({
            conversationId: convId,
            content: data.respond,
            fromLead: false,
         })

         return { data: aiMessage }
      } catch (error) {
         return {
            data: null,
            error:
               error instanceof Error
                  ? error.message
                  : 'AiRespondCreate → Unknown error',
         }
      }
   },

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
