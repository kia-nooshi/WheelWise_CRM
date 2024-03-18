// ----------------------------------------
// Util
// ----------------------------------------

import { twJoin as tj, twMerge as tm } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export const Util = {
  cn: (...inputs: ClassValue[]) => {
    return tm(clsx(inputs))
  },
  tj,
  tm,
}

// ----------------------------------------
// Handeler
// ----------------------------------------

// ! shouldnt export
export type ReturnData<T> = {
  data: T | null
  success: boolean
  message: string
}

export const Handler = {
  tryCatch: async <T>(
    operation: () => Promise<T>,
    successMessage: string,
    errorMessage: string,
    functionName: string
  ): Promise<ReturnData<T>> => {
    try {
      const data = await operation()
      if (!data) throw new Error(errorMessage)
      const message = `${functionName} → ${successMessage}`
      return { data, success: true, message }
    } catch (error) {
      const message = `${functionName} → ${error instanceof Error ? error.message : errorMessage}`
      return { data: null, success: false, message }
    }
  },
}

// ----------------------------------------
// Auth
// ----------------------------------------

import { auth } from '@clerk/nextjs'

export const Auth = {
  Clerk: {
    getClerkId: async () => {
      return Handler.tryCatch(
        async () => {
          const { userId } = auth()
          if (!userId) throw new Error('Failed to retrieve Clerk user ID')
          return userId
        },
        'Success',
        'Failed',
        '(Auth) getClerkID'
      )
    },
  },
}

// ----------------------------------------
// DataBase
// ----------------------------------------

import prisma from '@/prisma/client'
import { UserType } from '@prisma/client'

export const DataBase = {
  Organ: {
    pushOrgan: async () => {
      return Handler.tryCatch(
        async () => {
          return await prisma.organ.create({ data: {} })
        },
        'Successed',
        'Failed',
        '(DataBase) pushOrgan'
      )
    },
    popOrgan: async ({ organId }: { organId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.organ.delete({ where: { id: organId } })
        },
        'Successed',
        'Failed',
        '(DataBase) popOrgan'
      )
    },
    getOrgan: async ({ organId }: { organId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.organ.findUnique({ where: { id: organId } })
        },
        'Successed',
        'Failed',
        '(DataBase) getOrgan'
      )
    },
    popOrgans: async () => {
      return Handler.tryCatch(
        async () => {
          return await prisma.organ.deleteMany({})
        },
        'Successed',
        'Failed',
        '(DataBase) popOrgans'
      )
    },
    getOrgans: async () => {
      return Handler.tryCatch(
        async () => {
          return await prisma.organ.findMany()
        },
        'Successed',
        'Failed',
        '(DataBase) getOrgans'
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
      return Handler.tryCatch(
        async () => {
          return await prisma.user.create({
            data: {
              organ: { connect: { id: organId } },
              clerkId,
              type,
            },
          })
        },
        'Successed',
        'Failed',
        '(DataBase) pushUser'
      )
    },
    getUser: async ({ clerkId }: { clerkId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.user.findUnique({ where: { clerkId } })
        },
        'Successed',
        'Failed',
        '(DataBase) getUser'
      )
    },
  },

  /*
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
      return Handler.tryCatch(
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
      return Handler.tryCatch(
        async () => {
          return await prisma.lead.delete({ where: { id: leadId } })
        },
        'Lead successfully popped',
        'Failed to pop lead',
        '(U)popLead'
      )
    },
    getLead: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.lead.findUnique({ where: { id: leadId } })
        },
        'Lead found',
        'Lead not found',
        '(U)getLead'
      )
    },
    getLeads: async ({ organId }: { organId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.lead.findMany({ where: { organId } })
        },
        'Leads retrieved successfully',
        'Failed to retrieve leads',
        '(U)getLeads'
      )
    },
    popLeads: async ({ organId }: { organId: string }) => {
      return Handler.tryCatch(
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
      return Handler.tryCatch(
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
      return Handler.tryCatch(
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
      return Handler.tryCatch(
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
    getChat: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.chat.findUnique({
            where: { leadId },
            include: {
              messages: true,
            },
          })
        },
        'Chat successfully retrieved',
        'Failed to retrieve chat',
        '(U)getChat'
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
      return Handler.tryCatch(
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
      return Handler.tryCatch(
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
  */
}

// --------------------
// Helper
// --------------------
/*
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
      return Handler.tryCatch(
        async () => {
          // fetch api
          if (!process.env.CHATGPT_API) throw new Error('CHATGPT_API URL is not defined in .env')

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

// --------------------
// Do
// --------------------

export const Do = {
  User: {
    /* Fast Version
      Onboarding: async () => {
         return Handler.tryCatch(
            async () => {
               const { userId } = auth()

               if (!userId) throw new Error('sss')

               const User = await Util.DataBase.User.getUser({ clerkId: userId })

               if (User.data) return User

               const NewUser = await prisma.organ.create({
                  data: {
                     users: {
                        create: {
                           clerkId: userId,
                           type: 'ADMIN',
                        },
                     },
                  },
                  include: {
                     users: true,
                  },
               })

               return NewUser
            },
            'Message successfully pushed',
            'Failed to push message',
            '(U)pushMessage'
         )
      },

    Onboarding: async () => {
      return Handler.tryCatch(
        async () => {
          console.log('❌ Onboarding')
          const ClerkId = await Util.Clerk.getClerkId()

          if (!ClerkId.data) throw new Error(ClerkId.message)
          const User = await Util.DataBase.User.getUser({ clerkId: ClerkId.data })

          if (User.data) return User

          const NewOrgan = await Util.DataBase.Organ.pushOrgan()

          if (!NewOrgan.data) throw new Error(NewOrgan.message)

          const NewUser = await Util.DataBase.User.pushUser({
            clerkId: ClerkId.data,
            organId: NewOrgan.data?.id,
            type: 'ADMIN',
          })

          return NewUser
        },
        'Message successfully pushed',
        'Failed to push message',
        '(U)pushMessage'
      )
    },
  },
  Lead: {
    getLead: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          console.log('❌ GetLead')
          const Lead = await Util.DataBase.Lead.getLead({
            leadId,
          })

          if (!Lead.data) throw new Error(Lead.message)

          return Lead.data
        },
        'Leads successfully retrived',
        'Failed to retrive leads',
        'getLeads'
      )
    },
    getLeads: async () => {
      return Handler.tryCatch(
        async () => {
          console.log('🧪 GetLeadss')
          const ClerkId = await Util.Clerk.getClerkId()
          if (!ClerkId.data) throw new Error(ClerkId.message)

          const User = await Util.DataBase.User.getUser({ clerkId: ClerkId.data })
          if (!User.data) throw new Error(User.message)

          const Leads = await Util.DataBase.Lead.getLeads({ organId: User.data.organId })

          if (!Leads.data) throw new Error(Leads.message)

          return Leads.data
        },
        'Leads successfully retrived',
        'Failed to retrive leads',
        'getLeads'
      )
    },
    pushLeadsApi: async ({
      organId,
      firstName,
      lastName,
      phone,
      email,
      message,
    }: {
      organId: string
      firstName: string
      lastName: string
      phone: string
      email: string
      message: string
    }) => {
      return Handler.tryCatch(
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
            content: message,
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
        'getLeadsApi'
      )
    },
  },
  Chat: {
    getChat: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          console.log('🧪 nooooooo')
          const Chat = await Util.DataBase.Chat.getChat({ leadId: leadId })

          return Chat.data
        },
        'Leads successfully retrived',
        'Failed to retrive leads',
        'getLeads'
      )
    },
    pushChatApi: async ({
      chatId,
      content,
      fromLead,
      threadId,
    }: {
      chatId: string
      content: string
      fromLead: boolean
      threadId: string
    }) => {
      return Handler.tryCatch(
        async () => {
          const Chat = await Util.DataBase.Message.pushMessage({
            chatId,
            content,
            fromLead,
          })

          const Reply = await Helper.Chat.getAiResponse({
            chatId,
            message: content,
            threadId,
          })
        },
        'Leads successfully retrived',
        'Failed to retrive leads',
        'getLeads'
      )
    },
  },
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
}*/
