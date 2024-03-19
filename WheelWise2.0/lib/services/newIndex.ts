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
import { revalidatePath } from 'next/cache'

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
          return await prisma.lead.findUnique({ where: { id: leadId }, include: { chat: true } })
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
            include: { messages: true },
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

const Helper = {
  Chat: {
    pushAiResponse: async ({
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
          // Sanitize message
          const sanitizedMessage = message
            .trim()
            .replace(/\s\s+/g, ' ')
            .replace(/(\r\n|\n|\r)/gm, '')

          // Fetch ChatGPT API for response
          if (!process.env.CHATGPT_API) throw new Error('CHATGPT_API URL is not defined in .env')

          const res = await fetch(process.env.CHATGPT_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: sanitizedMessage,
              threadId,
            }),
          })
          if (!res.ok) throw new Error('ChatGPT - OpenAI servers are overloaded')
          const api = await res.json()

          // if ThreadId NOT exist - push ThreadId from ChatGPT
          if (!threadId) {
            const UpdateTreadId = await DataBase.Chat.pushThreadId({
              chatId,
              threadId: api.threadId,
            })
            if (!UpdateTreadId.success) throw new Error(UpdateTreadId.message)
          }

          // Sanitize API response
          const sanitizedApiRespond = api.respond
            .trim()
            .replace(/\s\s+/g, ' ')
            .replace(/(\r\n|\n|\r)/gm, '')

          // save ChatGPT response in database
          return await DataBase.Message.pushMessage({
            chatId: chatId,
            content: sanitizedApiRespond,
            fromLead: false,
          })
        },
        'Successed',
        'Failed',
        '(Helper) pushAiResponse'
      )
    },
  },
}

// ----------------------------------------
// Service
// ----------------------------------------

export const Service = {
  onboarding: async () => {
    return Handler.tryCatch(
      async () => {
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
  API: {
    pushLead: async ({
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
          // Sanitize message
          const sanitizedMessage = message
            .trim()
            .replace(/\s\s+/g, ' ')
            .replace(/(\r\n|\n|\r)/gm, '')

          // push new Lead to Organ
          const lead = await DataBase.Lead.pushLead({
            organId,
            firstName,
            lastName,
            phone,
            email,
          })
          if (!lead.data) throw new Error(lead.message)

          // push new Chat to Lead
          const chat = await DataBase.Chat.pushChat({ leadId: lead.data.id })
          if (!chat.data) throw new Error(chat.message)

          // push new Message to Chat
          const Message = await DataBase.Message.pushMessage({
            chatId: chat.data.id,
            content: sanitizedMessage,
            fromLead: true,
          })
          if (!Message.data) throw new Error(Message.message)

          // push new AiMessage to Chat
          const AiResponse = await Helper.Chat.pushAiResponse({
            chatId: chat.data.id,
            message: Message.data.content,
            threadId: chat.data.threadId,
          })

          return { lead, chat, Message, AiResponse }
        },
        'Successed',
        'Failed',
        '(Service) API.pushLead'
      )
    },
    pushChat: async ({
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
          // Sanitize message
          const sanitizedMessage = content
            .trim()
            .replace(/\s\s+/g, ' ')
            .replace(/(\r\n|\n|\r)/gm, '')

          // Push Message to Chat
          const Message = await DataBase.Message.pushMessage({
            chatId,
            content: sanitizedMessage,
            fromLead,
          })
          if (!Message.data) throw new Error(Message.message)

          // push new AiMessage to Chat
          const AiResponse = await Helper.Chat.pushAiResponse({
            chatId,
            message: sanitizedMessage,
            threadId,
          })

          return { Message, AiResponse }
        },
        'Successed',
        'Failed',
        '(Service) API.pushChat'
      )
    },
  },
  Lead: {
    getLeads: async () => {
      return Handler.tryCatch(
        async () => {
          // Make sure user logedin
          const ClerkId = await Auth.Clerk.getClerkId()
          if (!ClerkId.data) throw new Error(ClerkId.message)

          // Get Logedin User
          const User = await DataBase.User.getUser({ clerkId: ClerkId.data })
          if (!User.data) throw new Error(User.message)

          // Get Logedin User - Leads
          const Leads = await DataBase.Lead.getLeads({ organId: User.data.organId })
          if (!Leads.data) throw new Error(Leads.message)
          return Leads.data
        },
        'Successed',
        'Failed',
        '(Service) getLeads'
      )
    },
  },
}

/*

// --------------------
// Do
// --------------------

export const Do = {
  User: {

  Lead: {
    
   
  },
  Chat: {
    getChat: async ({ leadId }: { leadId: string }) => {
      return Handler.tryCatch(
        async () => {
          console.log('🧪 nooooooo')
          // ! NO LEAD ID ANYMORE - ChatId
          const Chat = await Util.DataBase.Chat.getChat({ leadId: leadId })

          return Chat.data
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
