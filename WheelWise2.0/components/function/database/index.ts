import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs'

// Helper Function

type ReturnData<T> = {
   data: T | null
   success: boolean
   message: string
}

async function handleFunction<T>(
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

// ----------------------
// Clerk Management
// ----------------------
async function getClerkId(): Promise<ReturnData<string>> {
   return handleFunction(
      async () => {
         const { userId: data } = await auth()
         if (!data) throw new Error('Failed to retrieve Clerk user ID')
         return data
      },
      'Clerk user ID successfully retrieved',
      'Failed to retrieve Clerk user ID',
      'getClerkID'
   )
}

export const Clerk = { getClerkId }

// ----------------------
// Organ Management
// ----------------------
interface OrganSchema {
   id: string
}

async function pushOrgan(): Promise<ReturnData<OrganSchema>> {
   return handleFunction(
      async () => {
         const data = await prisma.organ.create({ data: {} })
         return data
      },
      'Organ successfully pushed',
      'Failed to push organ',
      'pushOrgan'
   )
}

async function popOrgan({ id }: OrganSchema): Promise<ReturnData<OrganSchema>> {
   return handleFunction(
      async () => {
         const organ = await prisma.organ.delete({ where: { id } })
         return organ
      },
      'Organ successfully popped',
      'Failed to pop organ',
      'popOrgan'
   )
}

async function getOrgans(): Promise<ReturnData<OrganSchema[]>> {
   return handleFunction(
      async () => {
         const organs = await prisma.organ.findMany()
         return organs
      },
      'Organs successfully retrieved',
      'Failed to retrieve organs',
      'getOrgans'
   )
}

async function popOrgans(): Promise<ReturnData<any>> {
   return handleFunction(
      async () => {
         const organs = await prisma.organ.deleteMany()
         return organs
      },
      'All organs successfully deleted',
      'Failed to delete organs',
      'popOrgans'
   )
}

export const Organ = { pushOrgan, popOrgan, getOrgans, popOrgans }

// ----------------------
// Lead Management
// ----------------------
interface LeadSchema {
   id: string
   firstName: string
   lastName: string
   phone: string | null
   email: string | null
}

async function pushLead(lead: LeadSchema): Promise<ReturnData<LeadSchema>> {
   return handleFunction(
      async () => {
         const newData = {
            organ: { connect: { id: lead.id } },
            firstName: lead.firstName,
            lastName: lead.lastName,
            chat: { create: {} },
            ...(lead.phone && { phone: lead.phone }),
            ...(lead.email && { email: lead.email }),
         }
         return await prisma.lead.create({ data: newData, include: { chat: true } })
      },
      'Lead successfully pushed',
      'Failed to push lead',
      'pushLead'
   )
}

async function getLead({ id }: Pick<LeadSchema, 'id'>): Promise<ReturnData<LeadSchema | null>> {
   return handleFunction(
      () => prisma.lead.findUnique({ where: { id } }),
      'Lead found',
      'Lead not found',
      'getLead'
   )
}

async function getLeads({ id }: Pick<LeadSchema, 'id'>): Promise<ReturnData<LeadSchema[]>> {
   return handleFunction(
      () => prisma.lead.findMany({ where: { organId: id } }),
      'Leads retrieved successfully',
      'Failed to retrieve leads',
      'getLeads'
   )
}

async function popLead({ id }: Pick<LeadSchema, 'id'>): Promise<ReturnData<LeadSchema>> {
   return handleFunction(
      () => prisma.lead.delete({ where: { id } }),
      'Lead successfully popped',
      'Failed to pop lead',
      'popLead'
   )
}

async function popLeads({ id }: Pick<LeadSchema, 'id'>): Promise<ReturnData<any>> {
   return handleFunction(
      async () => {
         const deleteResult = await prisma.lead.deleteMany({ where: { organId: id } })
         return deleteResult
      },
      'Leads successfully popped',
      'Failed to pop leads',
      'popLeads'
   )
}

export const Lead = { pushLead, popLead, getLead, getLeads, popLeads }
