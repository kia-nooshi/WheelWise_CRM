/**
 * User Service
 * This file contains functions to retrieve user data from the database using Prisma Client.
 * These functions are used within a Next.js application context.
 */

// Prisma Client Import
import { prisma } from '@/lib/server/'

/**
 * Retrieves a user from the database based on their email address.
 *
 * @param {string} email - The email address of the user to be retrieved.
 * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found or an error occurs.
 */

const getUserByEmail = async (email: string) => {
   try {
      const user = await prisma.user.findUnique({ where: { email } })
      return user
   } catch (error) {
      return null
   }
}

/**
 * Retrieves a user from the database based on their unique ID.
 *
 * @param {string} id - The unique identifier of the user to be retrieved.
 * @returns {Promise<Object|null>} A promise that resolves with the user object if found, or null if not found or an error occurs.
 */

const getUserById = async (id: string) => {
   try {
      const user = await prisma.user.findUnique({ where: { id } })
      return user
   } catch (error) {
      return null
   }
}

export { getUserByEmail, getUserById }
