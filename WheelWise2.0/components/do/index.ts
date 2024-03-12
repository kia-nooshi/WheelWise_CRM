import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs'
import { UserType } from '@prisma/client'
import { twJoin, twMerge } from 'tailwind-merge'

export type ReturnData<T> = {
   data: T | null
   success: boolean
   message: string
}

async function returnHandeler<T>(
   operation: () => Promise<T>,
   successMessage: string,
   errorMessage: string,
   functionName: string
): Promise<ReturnData<T>> {
   try {
      const data = await operation()
      if (!data) throw new Error(errorMessage)
      const message = `${functionName} → ${successMessage}`
      return { data, success: true, message }
   } catch (error) {
      const message = `${functionName} → ${error instanceof Error ? error.message : errorMessage}`
      return { data: null, success: false, message }
   }
}

// --------------------
// UOLD
// --------------------s

export const Util = {
   Other: {
      twJoin,
      twMerge,
      returnHandeler,
   },
   Clerk: {
      getClerkId: async () => {
         return Util.Other.returnHandeler(
            async () => {
               const { userId } = auth()
               if (!userId) throw new Error('Failed to retrieve Clerk user ID')
               return userId
            },
            'Clerk user ID successfully retrieved',
            'Failed to retrieve Clerk user ID',
            'getClerkID'
         )
      },
   },
   DataBase: {
      Organ: {
         pushOrgan: async () => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.organ.create({ data: {} })
               },
               'Organ successfully pushed',
               'Failed to push organ',
               '(U)pushOrgan'
            )
         },
         popOrgan: async ({ organId }: { organId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.organ.delete({ where: { id: organId } })
               },
               'Organ successfully popped',
               'Failed to pop organ',
               '(U)popOrgan'
            )
         },
         getOrgan: async ({ organId }: { organId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.organ.findUnique({ where: { id: organId } })
               },
               'Organ successfully retrieved',
               'Failed to retrieve organ',
               '(U)getOrgan'
            )
         },
         popOrgans: async () => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.organ.deleteMany({})
               },
               'All organs successfully popped',
               'Failed to pop all organs',
               '(U)popOrgans'
            )
         },
         getOrgans: async () => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.organ.findMany()
               },
               'Organs successfully retrieved',
               'Failed to retrieve organs',
               '(U)getOrgans'
            )
         },
      },

      User: {
         pushUser: async ({
            organId,
            clerkId,
            type,
         }: {
            organId: string
            clerkId: string
            type: UserType
         }) => {
            return Util.Other.returnHandeler(
               async () => {
                  // make data ready
                  const data = {
                     organ: { connect: { id: organId } },
                     clerkId: clerkId,
                     type: type,
                  }

                  return await prisma.user.create({ data })
               },
               'User successfully pushed',
               'Failed to push user',
               '(U)pushUser'
            )
         },
      },

      Lead: {
         pushLead: async ({
            organId,
            firstName,
            lastName,
            phone,
            email,
         }: {
            organId: string
            firstName: string
            lastName: string
            phone: string
            email: string
         }) => {
            return Util.Other.returnHandeler(
               async () => {
                  // make data ready
                  const data = {
                     organ: { connect: { id: organId } },
                     firstName: firstName,
                     lastName: lastName,
                     ...(phone && { phone }),
                     ...(email && { email }),
                  }

                  return await prisma.lead.create({ data })
               },
               'Lead & chat successfully pushed',
               'Failed to push Lead & chat successfully',
               '(U)pushLead'
            )
         },
         popLead: async ({ leadId }: { leadId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.lead.delete({ where: { id: leadId } })
               },
               'Lead successfully popped',
               'Failed to pop lead',
               '(U)popLead'
            )
         },
         getLead: async ({ leadId }: { leadId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.lead.findUnique({ where: { id: leadId } })
               },
               'Lead found',
               'Lead not found',
               '(U)getLead'
            )
         },
         getLeads: async ({ organId }: { organId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.lead.findMany({ where: { organId } })
               },
               'Leads retrieved successfully',
               'Failed to retrieve leads',
               '(U)getLeads'
            )
         },
         popLeads: async ({ organId }: { organId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  const deleteResult = await prisma.lead.deleteMany({ where: { organId } })
                  return deleteResult
               },
               'Leads successfully popped',
               'Failed to pop leads',
               '(U)popLeads'
            )
         },
      },

      Chat: {
         pushChat: async ({ leadId }: { leadId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  // make data ready
                  const data = {
                     lead: { connect: { id: leadId } },
                  }

                  return await prisma.chat.create({ data })
               },
               'Chat successfully created',
               'Failed to create chat',
               '(U)pushChat'
            )
         },
         pushThreadId: async ({ chatId, threadId }: { chatId: string; threadId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  if (!threadId) throw new Error('threadId is required')

                  // make data ready
                  const data = {
                     where: { id: chatId },
                     data: { threadId },
                  }

                  return await prisma.chat.update(data)
               },
               'Thread ID successfully pushed to chat',
               'Failed to push thread ID to chat',
               '(U)pushThreadId'
            )
         },
         popChat: async ({ chatId }: { chatId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.chat.delete({
                     where: { id: chatId },
                  })
               },
               'Chat successfully deleted',
               'Failed to delete chat',
               '(U)popChat'
            )
         },
      },

      Message: {
         pushMessage: async ({
            chatId,
            content,
            fromLead,
         }: {
            chatId: string
            content: string
            fromLead: boolean
         }) => {
            return Util.Other.returnHandeler(
               async () => {
                  // make data ready
                  const data = {
                     chat: { connect: { id: chatId } },
                     content,
                     fromLead,
                  }

                  return await prisma.message.create({ data })
               },
               'Message successfully pushed',
               'Failed to push message',
               '(U)pushMessage'
            )
         },
         popMessage: async ({ messageId }: { messageId: string }) => {
            return Util.Other.returnHandeler(
               async () => {
                  return await prisma.message.delete({
                     where: { id: messageId },
                  })
               },
               'Message successfully deleted',
               'Failed to delete message',
               '(U)popMessage'
            )
         },
      },
   },
}

// --------------------
// Helper
// --------------------

const Helper = {
   Chat: {
      getAiResponse: async ({
         chatId,
         message,
         threadId,
      }: {
         chatId: string
         message: string
         threadId: string | null
      }) => {
         return Util.Other.returnHandeler(
            async () => {
               // fetch api
               if (!process.env.CHATGPT_API)
                  throw new Error('CHATGPT_API URL is not defined in .env')

               const res = await fetch(process.env.CHATGPT_API, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     message,
                     threadId,
                  }),
               })
               if (!res.ok) throw new Error('Make.com API error')
               const api = await res.json()

               // pushThreadId
               if (!threadId) {
                  const UpdateTreadId = await Util.DataBase.Chat.pushThreadId({
                     chatId,
                     threadId: api.threadId,
                  })
                  console.log(UpdateTreadId.message)
                  if (!UpdateTreadId.success) throw new Error(UpdateTreadId.message)
               }

               // pushMessage
               return await Util.DataBase.Message.pushMessage({
                  chatId: chatId,
                  content: api.respond,
                  fromLead: false,
               })
            },
            'successfully get AiResponse',
            'Failed to get AiResponse',
            '(H)getAiResponse'
         )
      },
   },
}

async function SSSS({
   organId,
   firstName,
   lastName,
   phone,
   email,
}: {
   organId: string
   firstName: string
   lastName: string
   phone: string
   email: string
}) {
   return Util.Other.returnHandeler(
      async () => {
         const Lead = await Util.DataBase.Lead.pushLead({
            organId,
            firstName,
            lastName,
            phone,
            email,
         })

         if (!Lead.data) throw new Error(Lead.message)

         const Chat = await Util.DataBase.Chat.pushChat({ leadId: Lead.data.id })

         if (!Chat.data) throw new Error(Chat.message)

         const Message = await Util.DataBase.Message.pushMessage({
            chatId: Chat.data.id,
            content: 'sss',
            fromLead: true,
         })

         if (!Message.data) throw new Error(Message.message)

         const AiResponse = await Helper.Chat.getAiResponse({
            chatId: Chat.data.id,
            message: Message.data.content,
            threadId: Chat.data.threadId,
         })

         return { Chat, Lead, Message, AiResponse }
      },
      'Lead successfully pushed',
      'Failed to push lead',
      'pushLead'
   )
}

export const Lead = { SSSS }

// --------------------
// Do
// --------------------

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
}*/
