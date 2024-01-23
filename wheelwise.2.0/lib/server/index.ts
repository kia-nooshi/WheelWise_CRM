import { default as Login } from '@/lib/server/auth/login'
import { default as Register } from '@/lib/server/auth/register'
import { default as prisma } from '@/lib/server/prisma/prisma'

export { Login, Register, prisma }
