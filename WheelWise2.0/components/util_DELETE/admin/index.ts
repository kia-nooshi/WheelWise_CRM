/*

import { Util } from '@/components'
import prisma from '@/prisma/client'
import { error } from 'console'

// ----------------------
// Organ Management
// ----------------------
interface OrganSchema {
   id: string
}

async function pushOrgan() {
   return Util.Other.returnHandeler(
      async () => {
         const data = await prisma.organ.create({ data: {} })
         return data
      },
      'Organ successfully pushed',
      'Failed to push organ',
      'pushOrgan'
   )
}

async function popOrgan({ id }: OrganSchema) {
   return Util.Other.returnHandeler(
      async () => {
         const organ = await prisma.organ.delete({ where: { id } })
         return organ
      },
      'Organ successfully popped',
      'Failed to pop organ',
      'popOrgan'
   )
}

async function getOrgans() {
   return Util.Other.returnHandeler(
      async () => {
         const organs = await prisma.organ.findMany()
         return organs
      },
      'Organs successfully retrieved',
      'Failed to retrieve organs',
      'getOrgans'
   )
}

async function popOrgans() {
   return Util.Other.returnHandeler(
      async () => {
         const organs = await prisma.organ.deleteMany()
         return organs
      },
      'All organs successfully deleted',
      'Failed to delete organs',
      'popOrgans'
   )
}

const Organ = { pushOrgan, popOrgan, getOrgans, popOrgans }

// ----------------------
// Organ Management
// ----------------------

async function pushAdmin() {
   return Util.Other.returnHandeler(
      async () => {
         const { data: clerkId } = await Util.Clerk.getClerkId()

         if (!clerkId) throw new Error('Failed to retrieve Clerk ID')

         const newOrgan = await prisma.organ.create({
            data: {},
         })

         const admin = await prisma.user.create({
            data: {
               clerkId,
               organ: { connect: { id: newOrgan.id } },
               type: 'ADMIN',
            },
         })

         return { admin, organ: newOrgan }
      },
      'Admin and organization successfully created',
      'Failed to create admin or organization',
      'pushAdmin'
   )
}

async function getUser({ clerkId }: { clerkId: string }) {
   return Util.Other.returnHandeler(
      async () => {
         const user = await prisma.user.findUnique({
            where: { clerkId },
            include: { organ: true },
         })

         if (!user) throw new Error('User not found')

         return user
      },
      'User successfully retrieved',
      'Failed to retrieve user',
      'getUser'
   )
}

const User = { pushAdmin }

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

async function pushLead(lead: LeadSchema) {
   return Util.Other.returnHandeler(
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

async function getLead({ id }: Pick<LeadSchema, 'id'>) {
   return Util.Other.returnHandeler(
      () => prisma.lead.findUnique({ where: { id } }),
      'Lead found',
      'Lead not found',
      'getLead'
   )
}

async function getLeads({ organId }: { organId: string }) {
   return Util.Other.returnHandeler(
      () => prisma.lead.findMany({ where: { organId } }),
      'Leads retrieved successfully',
      'Failed to retrieve leads',
      'getLeads'
   )
}

async function popLead({ id }: Pick<LeadSchema, 'id'>) {
   return Util.Other.returnHandeler(
      () => prisma.lead.delete({ where: { id } }),
      'Lead successfully popped',
      'Failed to pop lead',
      'popLead'
   )
}

async function popLeads({ id }: Pick<LeadSchema, 'id'>) {
   return Util.Other.returnHandeler(
      async () => {
         const deleteResult = await prisma.lead.deleteMany({ where: { organId: id } })
         return deleteResult
      },
      'Leads successfully popped',
      'Failed to pop leads',
      'popLeads'
   )
}

const Lead = { pushLead, popLead, getLead, getLeads, popLeads }

const DataBase = { Organ, Lead, User }
export default DataBase
*/
// ------------------------------
// ------------------------------
// TEST TRANSFER LATER
// ------------------------------
// ------------------------------
