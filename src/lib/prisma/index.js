import { PrismaClient } from '@prisma/client'

export const prisma = globalThis.prisma || new PrismaClient()

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma
