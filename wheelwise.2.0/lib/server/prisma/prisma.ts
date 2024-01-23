/**
 * This file initializes the Prisma Client for use with Next.js.
 * It follows best practices by ensuring a single instance of Prisma Client
 * is used throughout the application (singleton pattern).
 *
 * The Prisma Client is instantiated and exported for use in other parts
 * of the application. In non-production environments, the Prisma Client
 * instance is attached to the global object to prevent multiple instances
 * during hot reloading.
 */

import { PrismaClient } from '@prisma/client'

/**
 * Creates and returns a new instance of PrismaClient.
 * @returns {PrismaClient} An instance of PrismaClient.
 */
const prismaClientSingleton = () => {
   return new PrismaClient()
}

// Extending the global NodeJS namespace to include prisma.
declare global {
   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Singleton pattern: Use existing prisma client if available, else create new.
const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

// In non-production environments, attach the prisma client to global object.
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
