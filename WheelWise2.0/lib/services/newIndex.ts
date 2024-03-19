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
        'Successed',
        'Failed',
        '(DataBase) pushLead'
      )
    },
    popLead: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.lead.delete({ where: { id: leadId } })
        },
        'Successed',
        'Failed',
        '(DataBase) popLead'
      )
    },
    getLead: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.lead.findUnique({ where: { id: leadId } })
        },
        'Successed',
        'Failed',
        '(DataBase) getLead'
      )
    },
    getLeads: async ({ organId }: { organId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.lead.findMany({ where: { organId } })
        },
        'Successed',
        'Failed',
        '(DataBase) getLeads'
      )
    },
    popLeads: async ({ organId }: { organId: string }) => {
      return Handler.tryCatch(
        async () => {
          const deleteResult = await prisma.lead.deleteMany({ where: { organId } })
          return deleteResult
        },
        'Successed',
        'Failed',
        '(DataBase) popLeads'
      )
    },
  },
  Chat: {
    pushChat: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.chat.create({
            data: {
              lead: { connect: { id: leadId } },
            },
          })
        },
        'Succeeded',
        'Failed',
        '(DataBase) pushChat'
      )
    },
    popChat: async ({ chatId }: { chatId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.chat.delete({
            where: { id: chatId },
          })
        },
        'Succeeded',
        'Failed',
        '(DataBase) popChat'
      )
    },
    getChat: async ({ chatId }: { chatId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.chat.findUnique({
            where: { id: chatId },
          })
        },
        'Succeeded',
        'Failed',
        '(DataBase) getChat'
      )
    },
    pushThreadId: async ({ chatId, threadId }: { chatId: string; threadId: string }) => {
      return Handler.tryCatch(
        async () => {
          if (!threadId) throw new Error('threadId is required')

          return await prisma.chat.update({
            where: { id: chatId },
            data: { threadId },
          })
        },
        'Succeeded',
        'Failed',
        '(DataBase) pushThreadId'
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
          return await prisma.message.create({
            data: {
              chat: { connect: { id: chatId } },
              content,
              fromLead,
            },
          })
        },
        'Succeeded',
        'Failed',
        '(DataBase) pushMessage'
      )
    },
    popMessage: async ({ messageId }: { messageId: string }) => {
      return Handler.tryCatch(
        async () => {
          return await prisma.message.delete({
            where: { id: messageId },
          })
        },
        'Succeeded',
        'Failed',
        '(DataBase)popMessage'
      )
    },
  },
}

// ----------------------------------------
// Service
// ----------------------------------------

import delay from 'delay'

export const Service = {
  onboarding: async () => {
    return Handler.tryCatch(
      async () => {
        //await delay(50000)

        // Make sure user logedin
        const ClerkId = await Auth.Clerk.getClerkId()
        if (!ClerkId.data) throw new Error(ClerkId.message)

        // If user Exist - return user
        const User = await DataBase.User.getUser({ clerkId: ClerkId.data })
        if (User.data) return User

        // If user NOT Exist - create Organ
        const NewOrgan = await DataBase.Organ.pushOrgan()
        if (!NewOrgan.data) throw new Error(NewOrgan.message)

        // If user NOT Exist - create User - return user
        const NewUser = await DataBase.User.pushUser({
          clerkId: ClerkId.data,
          organId: NewOrgan.data?.id,
          type: 'ADMIN',
        })
        return NewUser
      },
      'Successed',
      'Failed',
      '(Service) onboarding'
    )
  },
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
