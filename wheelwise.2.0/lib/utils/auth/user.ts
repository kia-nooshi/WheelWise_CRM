import prisma from '@/lib/server/prisma'

export const getUserByEmail = async (email: string) => {
   try {
      const user = await prisma.user.findUnique({ where: { email } })
   } catch {
      return null
   }
}

export const getUserById = async (id: string) => {
   try {
      const user = await prisma.user.findUnique({ where: { id } })
   } catch {
      return null
   }
}
