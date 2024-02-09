import prisma from '@/prisma/client'

// Defines types for User and Organization using Prisma's type inference
type User = ReturnType<typeof prisma.user.create> extends Promise<infer R>
   ? R
   : never
type Organization = ReturnType<
   typeof prisma.organization.create
> extends Promise<infer R>
   ? R
   : never

/**
 * Fetches a user by their external ID
 * @returns {user | orginzation}
 */

export function getUserByExternalID(externalId: string) {
   return prisma.user.findUnique({
      where: { externalId },
   })
}

/**
 * Fetches a user by their ID
 */
export function getUserByID(id: string) {
   return prisma.user.findUnique({
      where: { id },
   })
}

/**
 * Creates a new user with the specified data, including their organization.
 */
export async function createUser(data: {
   externalId: string
   organizationId: string
}): Promise<User & { organization: { id: string } }> {
   return prisma.user.create({
      data,
      include: { organization: true },
   })
}

// Organization-related functions

/**
 * Retrieves an organization by its ID.
 */
export async function getOrganizationById(organizationId: string) {
   return prisma.organization.findUnique({
      where: { id: organizationId },
   })
}

/**
 * Creates a new organization with no initial data.
 */
export async function createOrganization() {
   return prisma.organization.create({
      data: {},
   })
}
